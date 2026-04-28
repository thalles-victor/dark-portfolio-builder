![Datacenter](${articleDatacenter})

Quando uma empresa decide rodar **Kubernetes autogerenciado** em vez de usar EKS, GKE ou AKS, geralmente é por uma de três razões: **custo**, **soberania de dados** ou **controle profundo**. Eu já participei de migrações nas três frentes — e neste artigo conto o que aprendi com cada cicatriz.

## O que significa "autogerenciado"?

Significa que **você** instala, opera e atualiza o control plane. Não tem AWS te avisando quando o etcd está saturado. Não tem GCP fazendo backup do seu cluster automaticamente. Tudo é seu, inclusive o pager às 3 da manhã.

> Antes de migrar, pergunte: minha equipe tem disponibilidade real para operar isso por 3 anos? Se a resposta tem qualquer "talvez", **fique com o managed**.

## Quando vale a pena

- **Custo em escala** — acima de ~50 nodes o overhead do managed começa a pesar
- **Compliance** — setores regulados (saúde, finanças) que exigem on-premise
- **Hardware especializado** — GPUs caras, redes de baixa latência
- **Aprendizado profundo da equipe** — operar K8s do zero ensina muito

## Quando NÃO vale a pena

- Time de menos de 3 SREs dedicados
- Workloads que cabem em 5 a 10 máquinas
- Startup em fase de validação de produto

## A stack que uso

![Cluster Kubernetes](${articleK8s})

Para clusters bare-metal ou em provedores "burros" (Hetzner, OVH), minha receita é:

1. **kubeadm** para o bootstrap do control plane — boring is good
2. **Cilium** como CNI (eBPF, observabilidade nativa, sem kube-proxy)
3. **MetalLB** ou **kube-vip** para LoadBalancer em on-premise
4. **Longhorn** para storage replicado quando não há SAN
5. **cert-manager** + **Traefik** para ingress e TLS automático

\`\`\`yaml

# kubeadm-config.yaml — exemplo simplificado

apiVersion: kubeadm.k8s.io/v1beta3
kind: ClusterConfiguration
kubernetesVersion: v1.30.0
controlPlaneEndpoint: "k8s-api.internal:6443"
networking:
podSubnet: "10.244.0.0/16"
serviceSubnet: "10.96.0.0/12"
etcd:
local:
extraArgs:
quota-backend-bytes: "8589934592" # 8 GiB — não use o default!
\`\`\`

### Lição #1: etcd é o coração e a maior dor

Etcd é o que diferencia um cluster saudável de um cluster zumbi. A primeira vez que vi um etcd encher por causa de eventos não-rotacionados, perdi um sábado inteiro fazendo \`compact\` + \`defrag\`. Hoje:

- **Disco SSD dedicado** para etcd (NVMe se possível)
- **Snapshots automáticos** a cada 30 minutos com retenção de 7 dias
- **Quota maior que o default** de 2 GiB
- **3 ou 5 membros**, nunca 4 (split-brain)

## Upgrades sem chorar

Atualizar K8s autogerenciado é o teste real da sua maturidade. O processo que aplico:

| Etapa          | O que fazer                         |
| -------------- | ----------------------------------- |
| 1. Snapshot    | Backup do etcd e dos PVs críticos   |
| 2. Drain       | Esvaziar 1 node por vez             |
| 3. Apt upgrade | \`kubeadm upgrade\` no node drenado |
| 4. Validar     | Smoke test na aplicação             |
| 5. Repetir     | Próximo node, sem pressa            |

\`\`\`bash

# upgrade do primeiro control-plane

sudo apt-get update && sudo apt-get install -y kubeadm=1.30.1-1.1
sudo kubeadm upgrade plan
sudo kubeadm upgrade apply v1.30.1

# drain + upgrade dos workers

kubectl drain worker-01 --ignore-daemonsets --delete-emptydir-data
ssh worker-01 'sudo apt-get install -y kubelet=1.30.1-1.1 kubectl=1.30.1-1.1'
ssh worker-01 'sudo systemctl restart kubelet'
kubectl uncordon worker-01
\`\`\`

### Lição #2: nunca pule versões

K8s suporta **+/- 1 versão minor** entre componentes. Se você está em \`v1.27\` e quer ir pra \`v1.30\`, são **três upgrades sequenciais** (27→28→29→30). Pular dá problema garantido.

## Observabilidade: não é opcional

\`\`\`yaml

# valores mínimos do kube-prometheus-stack

prometheus:
prometheusSpec:
retention: 30d
storageSpec:
volumeClaimTemplate:
spec:
accessModes: ["ReadWriteOnce"]
resources:
requests:
storage: 100Gi

grafana:
adminPassword: "set-me-via-secret"
defaultDashboardsEnabled: true
\`\`\`

Os 3 dashboards que olho todo dia:

- **Cluster overview** — capacidade total vs alocada
- **etcd performance** — \`fsync\` p99, leader changes
- **API server latency** — qualquer p99 acima de 500ms é alarme

## Os ganhos reais

Depois de 18 meses operando 4 clusters próprios:

- **Custo 60% menor** vs EKS equivalente
- **Latência interna 3x melhor** com Cilium + bare-metal
- **Time muito mais sênior** em fundamentos de Linux, redes e storage
- **Zero vendor lock-in** — migração entre providers virou exercício

## Conclusão

Kubernetes autogerenciado **não é para todo mundo**, mas para quem tem o time e o caso de uso certo, é uma das decisões de infra que mais paga dividendos a longo prazo. A chave é encarar como produto interno: documentação, on-call rotation, runbooks e SLOs claros.

Se você está pensando em migrar, comece pelo **homologação**. Erre num cluster que não dói antes de errar no que dói. E principalmente: **não subestime o etcd**.
