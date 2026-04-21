import { Github, ArrowUpRight } from "lucide-react";

const projects = [
  {
    name: "Maik Bank Backend",
    description:
      "Sistema bancário completo onde usuários podem se registrar, fazer depósitos, saques e realizar transações. Inclui controle de acesso, filas e geração de PDFs.",
    repo: "https://github.com/thalles-victor/maik-bank-backend",
    stack: [
      "NestJS",
      "TypeScript",
      "Docker",
      "Nginx",
      "REST",
      "GraphQL",
      "Redis",
      "BullMQ",
      "Sequelize",
      "Postgres",
      "Swagger",
      "JWT",
      "RBAC",
      "PDFMake",
    ],
  },
  {
    name: "Gym Platform",
    description:
      "Plataforma de treino full stack baseada em arquitetura de microsserviços, com mensageria assíncrona via Apache Kafka e múltiplos serviços independentes.",
    repo: "https://github.com/thalles-victor/Web_Gym",
    stack: [
      "NestJS",
      "Next.js",
      "TypeScript",
      "Docker",
      "GraphQL",
      "Apollo Server",
      "Apache Kafka",
      "Prisma",
      "TypeORM",
      "Postgres",
      "Swagger",
    ],
  },
];

const Projects = () => {
  return (
    <section id="projetos" className="py-24 relative">
      <div className="container">
        <div className="max-w-3xl mb-14">
          <p className="font-mono text-sm text-primary mb-3">// projetos</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 tracking-tight">
            Projetos <span className="text-gradient">pessoais</span> em destaque.
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Onde exploro arquiteturas, aprendo novas tecnologias e materializo ideias.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-5">
          {projects.map((p) => (
            <article
              key={p.name}
              className="group card-gradient rounded-xl border border-border p-7 hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-elegant)] flex flex-col"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30 flex items-center justify-center">
                    <Github className="text-primary" size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{p.name}</h3>
                    <p className="font-mono text-xs text-muted-foreground">
                      open source
                    </p>
                  </div>
                </div>
                <a
                  href={p.repo}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                  aria-label={`Repositório de ${p.name}`}
                >
                  <ArrowUpRight size={18} />
                </a>
              </div>

              <p className="text-muted-foreground leading-relaxed mb-5 flex-1">
                {p.description}
              </p>

              <div className="flex flex-wrap gap-1.5">
                {p.stack.map((s) => (
                  <span
                    key={s}
                    className="px-2 py-0.5 text-[11px] font-mono rounded bg-secondary border border-border text-foreground/80"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
