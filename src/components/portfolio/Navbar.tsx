import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const links = [
  { href: "#sobre", label: "sobre" },
  { href: "#stacks", label: "stacks" },
  { href: "#projetos", label: "projetos" },
  { href: "#experiencia", label: "experiência" },
  { href: "#artigos", label: "artigos" },
  { href: "#contato", label: "contato" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border"
          : "bg-transparent"
      }`}
    >
      <nav className="container flex items-center justify-between h-16">
        <a href="#top" className="font-mono text-sm font-semibold flex items-center gap-2">
          <span className="text-primary">~/</span>
          <span>thalles.dev</span>
          <span className="text-primary animate-blink">_</span>
        </a>

        <div className="hidden md:flex items-center gap-1 font-mono text-sm">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="px-3 py-2 text-muted-foreground hover:text-primary transition-colors rounded-md"
            >
              {l.label}
            </a>
          ))}
        </div>

        <Button
          asChild
          variant="hero"
          size="sm"
          className="hidden md:inline-flex"
        >
          <a href="#contato">contratar</a>
        </Button>

        <button
          className="md:hidden text-foreground p-2"
          onClick={() => setOpen(!open)}
          aria-label="menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-xl">
          <div className="container py-4 flex flex-col gap-1 font-mono">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="px-3 py-3 text-muted-foreground hover:text-primary transition-colors"
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
