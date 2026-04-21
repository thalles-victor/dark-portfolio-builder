import articleCover from "@/assets/article-cover.jpg";
import articleArchitecture from "@/assets/article-architecture.jpg";
import articleMetrics from "@/assets/article-metrics.jpg";
import articleK8s from "@/assets/article-k8s.jpg";
import articleDatacenter from "@/assets/article-datacenter.jpg";

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  cover?: string;
  content: string;
};

const nestjsRedisContent = `
![Workstation backend](${articleCover})

> "A diferença entre uma API que aguenta 1k req/s e uma que aguenta 1M req/s raramente está no código de negócio — está nas camadas ao redor dele."

Quando comecei a trabalhar com APIs de alta carga, achava que escalabilidade era sinônimo de "colocar mais máquinas". Demorei para entender que **arquitetura vem antes de infraestrutura**. Neste artigo compartilho como combino **NestJS**, **Redis** e **BullMQ** para construir APIs que escalam horizontalmente sem perder a sanidade.

## Por que NestJS?

NestJS traz uma estrutura opinativa inspirada no Angular, com **injeção de dependências**, **módulos** e **decorators** que facilitam manter um código grande organizado. Isso importa quando a base passa de 50k linhas.

- Modularização real desde o dia 1
- DI nativa, ótima para testes
- Ecossistema maduro (Microservices, GraphQL, WebSockets)
- Integração de primeira com TypeScript

## Camada de cache com Redis

Cache é a otimização mais barata e mais perigosa que existe. Bem feito, reduz latência de 200ms para 5ms. Mal feito, serve dados velhos para o usuário errado.

A regra que sigo:

1. **Identifique o que cachear** — endpoints idempotentes e leitura intensiva
2. **Defina chaves determinísticas** — \`user:{id}:profile\`
3. **Invalide em escrita** — nunca confie só em TTL
4. **Use stale-while-revalidate** quando possível

\`\`\`ts
@Injectable()
export class ProfileService {
  constructor(
    private readonly repo: ProfileRepository,
    @Inject(CACHE_MANAGER) private cache: Cache,
  ) {}

  async findById(id: string) {
    const key = \`user:\${id}:profile\`;
    const cached = await this.cache.get<Profile>(key);
    if (cached) return cached;

    const profile = await this.repo.findById(id);
    await this.cache.set(key, profile, 60_000); // 60s
    return profile;
  }

  async update(id: string, dto: UpdateProfileDto) {
    const profile = await this.repo.update(id, dto);
    await this.cache.del(\`user:\${id}:profile\`); // invalidate
    return profile;
  }
}
\`\`\`

### Cuidado com cache stampede

Quando milhares de requests chegam para a mesma chave expirada ao mesmo tempo, todas viram miss e batem no banco simultaneamente. Soluções: **lock distribuído** (\`SET key value NX PX 5000\`) ou **probabilistic early expiration**.

## Filas com BullMQ

Tudo que **não precisa ser síncrono não deve ser síncrono**. Envio de e-mail, processamento de imagem, webhook para terceiros — vai tudo para uma fila.

![Arquitetura NestJS + Redis + BullMQ](${articleArchitecture})

\`\`\`ts
@Processor('emails')
export class EmailProcessor {
  @Process('welcome')
  async handleWelcome(job: Job<{ userId: string }>) {
    const user = await this.users.findById(job.data.userId);
    await this.mailer.sendWelcome(user);
  }
}

// no controller
await this.emailQueue.add('welcome', { userId }, {
  attempts: 5,
  backoff: { type: 'exponential', delay: 2000 },
  removeOnComplete: 1000,
  removeOnFail: false,
});
\`\`\`

Pontos que mudam o jogo:

- **\`attempts\` + \`backoff\` exponencial** para resiliência
- **\`removeOnComplete\`** para não estourar a memória do Redis
- **Jobs idempotentes** — sempre. O mesmo job pode rodar duas vezes.

## Rate limiting que funciona

Use \`@nestjs/throttler\` com storage em Redis para limitar por usuário/IP de forma distribuída. Sem isso, cada réplica do seu pod conta separado e o limite efetivo vira N × limite.

| Estratégia | Quando usar |
| --- | --- |
| IP-based | APIs públicas, endpoints anônimos |
| User-based | APIs autenticadas |
| Sliding window | Burst control fino |
| Token bucket | Cobranças por uso |

## Observabilidade desde o início

Sem métricas você está pilotando no escuro. Eu sempre instrumento três coisas no dia 1:

- **Latência por endpoint** (p50, p95, p99)
- **Taxa de erro** (4xx vs 5xx)
- **Profundidade de fila** (BullMQ → Prometheus exporter)

![Dashboard de métricas](${articleMetrics})

## Conclusão

Construir API escalável não é sobre uma framework mágica. É sobre **decidir o que pode ser assíncrono**, **cachear com disciplina** e **medir tudo** desde o primeiro deploy. NestJS + Redis + BullMQ é uma combinação madura que cobre 90% dos casos sem te empurrar para complexidade prematura.

Se curtiu, segue lá no [GitHub](https://github.com) e bora trocar ideia.
`;

const kubernetesContent = `
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

| Etapa | O que fazer |
| --- | --- |
| 1. Snapshot | Backup do etcd e dos PVs críticos |
| 2. Drain | Esvaziar 1 node por vez |
| 3. Apt upgrade | \`kubeadm upgrade\` no node drenado |
| 4. Validar | Smoke test na aplicação |
| 5. Repetir | Próximo node, sem pressa |

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
`;

export const articles: Article[] = [
  {
    slug: "construindo-apis-escalaveis-com-nestjs-e-redis",
    title: "Construindo APIs escaláveis com NestJS e Redis",
    excerpt:
      "Como projetar camadas de cache, filas com BullMQ e rate limiting para APIs que precisam suportar milhões de requisições.",
    category: "Backend",
    date: "12 Mar 2026",
    readTime: "8 min",
    cover: articleCover,
    content: nestjsRedisContent,
  },
  {
    slug: "kubernetes-autogerenciado-do-zero",
    title: "Kubernetes autogerenciado: o que aprendi montando clusters do zero",
    excerpt:
      "Decisões, armadilhas e ganhos reais ao operar Kubernetes sem usar EKS ou GKE — e quando vale a pena.",
    category: "DevOps",
    date: "28 Fev 2026",
    readTime: "12 min",
    cover: articleK8s,
    content: kubernetesContent,
  },
  {
    slug: "go-vs-nodejs-stack-certa",
    title: "Go vs Node.js: escolhendo a stack certa para cada serviço",
    excerpt:
      "Critérios práticos baseados em experiência real para decidir entre Go e Node.js em microsserviços.",
    category: "Arquitetura",
    date: "10 Fev 2026",
    readTime: "6 min",
    cover: articleCover,
    content: `# Go vs Node.js\n\nEm breve — conteúdo completo deste artigo.`,
  },
  {
    slug: "observabilidade-grafana-loki-prometheus",
    title: "Observabilidade com Grafana, Loki e Prometheus",
    excerpt:
      "Stack completa de observabilidade para sistemas distribuídos — métricas, logs e traces sem dor de cabeça.",
    category: "Observabilidade",
    date: "22 Jan 2026",
    readTime: "10 min",
    cover: articleCover,
    content: `# Observabilidade\n\nEm breve — conteúdo completo deste artigo.`,
  },
  {
    slug: "rbac-bem-feito-padroes-controle-acesso",
    title: "RBAC bem feito: padrões para controle de acesso em APIs REST",
    excerpt:
      "Da modelagem de permissões à implementação com guards e decorators em NestJS.",
    category: "Segurança",
    date: "05 Jan 2026",
    readTime: "7 min",
    cover: articleCover,
    content: `# RBAC bem feito\n\nEm breve — conteúdo completo deste artigo.`,
  },
  {
    slug: "ci-cd-pragmatico-github-actions-docker",
    title: "CI/CD pragmático com GitHub Actions e Docker",
    excerpt:
      "Pipelines simples, rápidos e reproduzíveis para entregar software com confiança várias vezes ao dia.",
    category: "DevOps",
    date: "18 Dez 2025",
    readTime: "9 min",
    cover: articleCover,
    content: `# CI/CD pragmático\n\nEm breve — conteúdo completo deste artigo.`,
  },
];

export const getArticleBySlug = (slug: string) =>
  articles.find((a) => a.slug === slug);
