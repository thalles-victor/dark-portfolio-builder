import { Code2, Server, GitBranch, Cloud } from "lucide-react";

const highlights = [
  {
    icon: Code2,
    title: "APIs robustas",
    desc: "REST e GraphQL com autenticação, RBAC e observabilidade.",
  },
  {
    icon: Server,
    title: "Sistemas distribuídos",
    desc: "Microsserviços com Kafka, filas e cache em Redis.",
  },
  {
    icon: GitBranch,
    title: "DevOps end-to-end",
    desc: "CI/CD, Docker, Kubernetes e proxy reverso com SSL.",
  },
  {
    icon: Cloud,
    title: "Cloud ready",
    desc: "AWS e DigitalOcean, gerenciado ou autogerenciado.",
  },
];

const About = () => {
  return (
    <section id="sobre" className="py-24 relative">
      <div className="container">
        <div className="max-w-3xl mb-14">
          <p className="font-mono text-sm text-primary mb-3">// sobre</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 tracking-tight">
            Construo backends do <span className="text-gradient">protótipo à produção</span>.
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Atuo desde a criação de pequenos serviços hospedados em VPS até arquiteturas
            distribuídas em clusters Kubernetes na AWS e DigitalOcean. Sempre fui independente
            nos projetos de que participei — tomando decisões técnicas com responsabilidade,
            mas sempre disposto a compartilhar conhecimento e aprender quando necessário.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {highlights.map((h) => (
            <div
              key={h.title}
              className="group card-gradient rounded-xl border border-border p-6 hover:border-primary/50 transition-all duration-300 hover:shadow-[var(--shadow-glow)]"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <h.icon className="text-primary" size={20} />
              </div>
              <h3 className="font-semibold mb-2">{h.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{h.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
