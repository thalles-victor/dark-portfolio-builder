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

| Estratégia     | Quando usar                       |
| -------------- | --------------------------------- |
| IP-based       | APIs públicas, endpoints anônimos |
| User-based     | APIs autenticadas                 |
| Sliding window | Burst control fino                |
| Token bucket   | Cobranças por uso                 |

## Observabilidade desde o início

Sem métricas você está pilotando no escuro. Eu sempre instrumento três coisas no dia 1:

- **Latência por endpoint** (p50, p95, p99)
- **Taxa de erro** (4xx vs 5xx)
- **Profundidade de fila** (BullMQ → Prometheus exporter)

![Dashboard de métricas](${articleMetrics})

## Conclusão

Construir API escalável não é sobre uma framework mágica. É sobre **decidir o que pode ser assíncrono**, **cachear com disciplina** e **medir tudo** desde o primeiro deploy. NestJS + Redis + BullMQ é uma combinação madura que cobre 90% dos casos sem te empurrar para complexidade prematura.

Se curtiu, segue lá no [GitHub](https://github.com) e bora trocar ideia.
