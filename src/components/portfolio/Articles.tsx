import { Calendar, Clock, ArrowUpRight } from "lucide-react";

const articles = [
  {
    title: "Construindo APIs escaláveis com NestJS e Redis",
    excerpt:
      "Como projetar camadas de cache, filas com BullMQ e rate limiting para APIs que precisam suportar milhões de requisições.",
    category: "Backend",
    date: "12 Mar 2026",
    readTime: "8 min",
    url: "#",
  },
  {
    title: "Kubernetes autogerenciado: o que aprendi montando clusters do zero",
    excerpt:
      "Decisões, armadilhas e ganhos reais ao operar Kubernetes sem usar EKS ou GKE — e quando vale a pena.",
    category: "DevOps",
    date: "28 Fev 2026",
    readTime: "12 min",
    url: "#",
  },
  {
    title: "Go vs Node.js: escolhendo a stack certa para cada serviço",
    excerpt:
      "Critérios práticos baseados em experiência real para decidir entre Go e Node.js em microsserviços.",
    category: "Arquitetura",
    date: "10 Fev 2026",
    readTime: "6 min",
    url: "#",
  },
  {
    title: "Observabilidade com Grafana, Loki e Prometheus",
    excerpt:
      "Stack completa de observabilidade para sistemas distribuídos — métricas, logs e traces sem dor de cabeça.",
    category: "Observabilidade",
    date: "22 Jan 2026",
    readTime: "10 min",
    url: "#",
  },
  {
    title: "RBAC bem feito: padrões para controle de acesso em APIs REST",
    excerpt:
      "Da modelagem de permissões à implementação com guards e decorators em NestJS.",
    category: "Segurança",
    date: "05 Jan 2026",
    readTime: "7 min",
    url: "#",
  },
  {
    title: "CI/CD pragmático com GitHub Actions e Docker",
    excerpt:
      "Pipelines simples, rápidos e reproduzíveis para entregar software com confiança várias vezes ao dia.",
    category: "DevOps",
    date: "18 Dez 2025",
    readTime: "9 min",
    url: "#",
  },
];

const Articles = () => {
  return (
    <section id="artigos" className="py-24 relative">
      <div className="container">
        <div className="max-w-3xl mb-14">
          <p className="font-mono text-sm text-primary mb-3">// artigos</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 tracking-tight">
            Compartilhando <span className="text-gradient">conhecimento</span>.
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Reflexões e tutoriais sobre arquitetura, backend, DevOps e tudo mais que
            aprendo no caminho. Construir e ensinar caminham juntos.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {articles.map((a) => (
            <a
              key={a.title}
              href={a.url}
              className="group card-gradient rounded-xl border border-border p-6 hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-card)] flex flex-col"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="px-2.5 py-1 text-[11px] font-mono rounded-full bg-primary/10 border border-primary/30 text-primary">
                  {a.category}
                </span>
                <ArrowUpRight
                  size={18}
                  className="text-muted-foreground group-hover:text-primary group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all"
                />
              </div>

              <h3 className="font-bold text-lg leading-snug mb-3 group-hover:text-primary transition-colors">
                {a.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-5 flex-1">
                {a.excerpt}
              </p>

              <div className="flex items-center gap-4 font-mono text-xs text-muted-foreground pt-4 border-t border-border">
                <span className="inline-flex items-center gap-1.5">
                  <Calendar size={12} /> {a.date}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock size={12} /> {a.readTime}
                </span>
              </div>
            </a>
          ))}
        </div>

        <p className="font-mono text-xs text-muted-foreground/70 text-center mt-10">
          // artigos de exemplo — substitua pelos seus artigos reais
        </p>
      </div>
    </section>
  );
};

export default Articles;
