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
