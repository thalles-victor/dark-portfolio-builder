const groups = [
  {
    label: "Linguagens & Runtimes",
    items: ["Node.js", "Go", "TypeScript"],
  },
  {
    label: "Frameworks Backend",
    items: ["NestJS", "Express", "Next.js", "Fiber", "Gin", "Mux"],
  },
  {
    label: "Bancos de Dados",
    items: ["PostgreSQL", "MongoDB", "Redis", "Drizzle", "TypeORM", "SQL/NoSQL"],
  },
  {
    label: "Infraestrutura & DevOps",
    items: ["Docker", "Kubernetes", "AWS", "Nginx", "CI/CD", "SSL/TLS", "Linux"],
  },
  {
    label: "Observabilidade",
    items: ["Grafana", "Loki", "Stack Grafana"],
  },
  {
    label: "APIs & Segurança",
    items: ["REST", "GraphQL", "Swagger", "JWT", "RBAC", "OAuth (Google, Facebook, Discord)", "Rate Limiter"],
  },
];

const Stacks = () => {
  return (
    <section id="stacks" className="py-24 relative">
      <div className="container">
        <div className="max-w-3xl mb-14">
          <p className="font-mono text-sm text-primary mb-3">// stacks</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 tracking-tight">
            Ferramentas do <span className="text-gradient">dia a dia</span>.
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Tecnologias que utilizo em projetos públicos e privados, escolhidas com
            base em maturidade, performance e adequação ao problema.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {groups.map((g) => (
            <div
              key={g.label}
              className="card-gradient rounded-xl border border-border p-6 hover:border-primary/40 transition-colors"
            >
              <h3 className="font-mono text-xs text-accent uppercase tracking-wider mb-4">
                {g.label}
              </h3>
              <div className="flex flex-wrap gap-2">
                {g.items.map((item) => (
                  <span
                    key={item}
                    className="px-2.5 py-1 text-xs font-mono rounded-md bg-secondary border border-border text-foreground/90 hover:border-primary/50 hover:text-primary transition-colors"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stacks;
