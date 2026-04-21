import { ArrowUpRight } from "lucide-react";

const experiences = [
  {
    company: "Goodtrack",
    role: "Desenvolvedor Principal",
    url: "https://goodtrack.com.br/",
    description:
      "Liderei o desenvolvimento da plataforma de rastreamento e atribuição de vendas para campanhas de marketing digital. Implementei coleta de dados de conversão em tempo real e integrações com Meta Ads, Hotmart e Stripe, garantindo que cada venda fosse atribuída corretamente — permitindo aos anunciantes otimizar campanhas e aumentar o ROI.",
    tags: ["Liderança técnica", "Integrações", "Tempo real", "Stripe"],
  },
  {
    company: "EnglishOnboarding",
    role: "Arquiteto & Desenvolvedor Full Stack",
    url: "https://www.englishonboard.com",
    description:
      "Arquitetei o projeto e implementei todas as funcionalidades: autenticação, controle de acesso, métricas, gestão de assinaturas e integração com PagSeguro e PayPal. Também atuei em DevOps — pipelines CI/CD, deploys automatizados, containerização com Docker, proxy reverso com balanceamento de carga e gestão de SSL/TLS.",
    tags: ["Arquitetura", "Pagamentos", "DevOps", "CI/CD"],
  },
  {
    company: "Fire the Box",
    role: "Desenvolvedor Freelancer",
    url: "https://firethebox.com",
    description:
      "Atuei por 3 meses adicionando novos recursos, corrigindo problemas de segurança e construindo um sistema de controle de acesso usando React, Next.js, MongoDB e NextAuth.",
    tags: ["React", "Next.js", "Segurança", "MongoDB"],
  },
];

const Experience = () => {
  return (
    <section id="experiencia" className="py-24 relative">
      <div className="container">
        <div className="max-w-3xl mb-14">
          <p className="font-mono text-sm text-primary mb-3">// experiência</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 tracking-tight">
            Onde já <span className="text-gradient">entreguei valor</span>.
          </h2>
        </div>

        <div className="relative max-w-4xl">
          {/* Timeline line */}
          <div className="absolute left-4 sm:left-6 top-2 bottom-2 w-px bg-gradient-to-b from-primary via-border to-transparent" />

          <div className="space-y-8">
            {experiences.map((exp, i) => (
              <div key={exp.company} className="relative pl-12 sm:pl-16">
                {/* Dot */}
                <div className="absolute left-0 sm:left-2 top-2 w-9 h-9 rounded-full border border-primary/40 bg-background flex items-center justify-center">
                  <span className="w-2.5 h-2.5 rounded-full bg-primary glow-primary" />
                </div>

                <div className="card-gradient rounded-xl border border-border p-6 hover:border-primary/40 transition-colors">
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                    <div>
                      <h3 className="text-xl font-bold">{exp.company}</h3>
                      <p className="font-mono text-sm text-primary">{exp.role}</p>
                    </div>
                    <a
                      href={exp.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 font-mono text-xs text-muted-foreground hover:text-primary transition-colors"
                    >
                      visitar <ArrowUpRight size={14} />
                    </a>
                  </div>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {exp.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {exp.tags.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 text-[11px] font-mono rounded bg-secondary border border-border text-foreground/80"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
