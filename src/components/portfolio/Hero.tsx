import { Button } from "@/components/ui/button";
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";

const Hero = () => {
  return (
    <section id="top" className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 bg-grid opacity-30 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />

      {/* Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] -z-10" />

      <div className="container relative z-10 grid lg:grid-cols-[1.3fr_1fr] gap-12 items-center">
        <div className="animate-fade-up">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-card/50 backdrop-blur-sm mb-6 font-mono text-xs">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-muted-foreground">disponível para novos projetos</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-[1.05] tracking-tight mb-6">
            Backend dev que{" "}
            <span className="text-gradient">arquiteta sistemas</span>{" "}
            sob medida.
          </h1>

          <p className="text-lg text-muted-foreground max-w-xl mb-8 leading-relaxed">
            Sou <span className="text-foreground font-medium">Thalles Víctor</span>, desenvolvedor backend especializado em{" "}
            <span className="text-primary font-mono">Node.js</span>,{" "}
            <span className="text-primary font-mono">Go</span> e práticas de{" "}
            <span className="text-accent font-mono">DevOps</span>. Construo APIs robustas,
            pipelines confiáveis e infraestrutura escalável em Kubernetes.
          </p>

          <div className="flex flex-wrap gap-3 mb-8">
            <Button asChild variant="hero" size="lg">
              <a href="#projetos">
                ver projetos <ArrowRight className="ml-1" size={18} />
              </a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="#contato">entrar em contato</a>
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="https://github.com/thalles-victor"
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-lg border border-border hover:border-primary hover:text-primary transition-colors"
              aria-label="GitHub"
            >
              <Github size={18} />
            </a>
            <a
              href="https://www.linkedin.com/in/thalles-v%C3%ADctor-130b672a8/"
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-lg border border-border hover:border-primary hover:text-primary transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={18} />
            </a>
            <a
              href="mailto:thalles.victor2012@gmail.com"
              className="p-2.5 rounded-lg border border-border hover:border-primary hover:text-primary transition-colors"
              aria-label="Email"
            >
              <Mail size={18} />
            </a>
          </div>
        </div>

        {/* Terminal card */}
        <div className="animate-float">
          <div className="card-gradient rounded-xl border border-border shadow-[var(--shadow-card)] overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-secondary/50">
              <span className="w-3 h-3 rounded-full bg-destructive/70" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
              <span className="w-3 h-3 rounded-full bg-primary/70" />
              <span className="ml-2 font-mono text-xs text-muted-foreground">
                ~/thalles — zsh
              </span>
            </div>
            <div className="p-5 font-mono text-sm space-y-2">
              <div className="text-muted-foreground">
                <span className="text-primary">$</span> whoami
              </div>
              <div className="text-foreground">thalles_victor</div>

              <div className="text-muted-foreground pt-2">
                <span className="text-primary">$</span> cat stack.json
              </div>
              <div className="text-foreground/90 pl-2 text-xs leading-relaxed">
                <span className="text-accent">{"{"}</span>
                <div className="pl-4">
                  <span className="text-primary">"runtime"</span>:{" "}
                  <span className="text-foreground">"node, go"</span>,
                </div>
                <div className="pl-4">
                  <span className="text-primary">"infra"</span>:{" "}
                  <span className="text-foreground">"k8s, aws, docker"</span>,
                </div>
                <div className="pl-4">
                  <span className="text-primary">"db"</span>:{" "}
                  <span className="text-foreground">"postgres, redis, mongo"</span>,
                </div>
                <div className="pl-4">
                  <span className="text-primary">"focus"</span>:{" "}
                  <span className="text-foreground">"escalabilidade"</span>
                </div>
                <span className="text-accent">{"}"}</span>
              </div>

              <div className="text-muted-foreground pt-2">
                <span className="text-primary">$</span>{" "}
                <span className="animate-blink">_</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
