import { Mail, Github, Linkedin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const Contact = () => {
  return (
    <section id="contato" className="py-24 relative">
      <div className="container">
        <div className="relative card-gradient rounded-3xl border border-border overflow-hidden p-10 sm:p-16">
          {/* Glow */}
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-primary/20 rounded-full blur-[100px]" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-accent/15 rounded-full blur-[100px]" />

          <div className="relative max-w-3xl">
            <p className="font-mono text-sm text-primary mb-3">// contato</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 tracking-tight">
              Vamos construir <span className="text-gradient">algo juntos</span>?
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-10">
              Estou disponível para projetos freelance, consultoria de arquitetura
              e oportunidades full-time. Responda em até 24h.
            </p>

            <div className="flex flex-wrap gap-3 mb-10">
              <Button asChild variant="hero" size="lg">
                <a href="mailto:thalles.victor2012@gmail.com">
                  <Mail className="mr-1" size={18} />
                  enviar email
                </a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a
                  href="https://wa.me/5562995779378"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Phone className="mr-1" size={18} />
                  WhatsApp
                </a>
              </Button>
            </div>

            <div className="grid sm:grid-cols-3 gap-3">
              <a
                href="mailto:thalles.victor2012@gmail.com"
                className="flex items-center gap-3 p-4 rounded-lg border border-border hover:border-primary/50 transition-colors"
              >
                <Mail className="text-primary shrink-0" size={18} />
                <div className="min-w-0">
                  <p className="font-mono text-[11px] text-muted-foreground">email</p>
                  <p className="text-sm truncate">thalles.victor2012@gmail.com</p>
                </div>
              </a>
              <a
                href="https://github.com/thalles-victor"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 p-4 rounded-lg border border-border hover:border-primary/50 transition-colors"
              >
                <Github className="text-primary shrink-0" size={18} />
                <div className="min-w-0">
                  <p className="font-mono text-[11px] text-muted-foreground">github</p>
                  <p className="text-sm truncate">@thalles-victor</p>
                </div>
              </a>
              <a
                href="https://www.linkedin.com/in/thalles-v%C3%ADctor-130b672a8/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 p-4 rounded-lg border border-border hover:border-primary/50 transition-colors"
              >
                <Linkedin className="text-primary shrink-0" size={18} />
                <div className="min-w-0">
                  <p className="font-mono text-[11px] text-muted-foreground">linkedin</p>
                  <p className="text-sm truncate">Thalles Víctor</p>
                </div>
              </a>
            </div>
          </div>
        </div>

        <footer className="mt-16 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-muted-foreground">
          <p>© 2026 Thalles Víctor. Construído com Lovable.</p>
          <p className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            sistemas online
          </p>
        </footer>
      </div>
    </section>
  );
};

export default Contact;
