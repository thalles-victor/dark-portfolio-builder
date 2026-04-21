import Navbar from "@/components/portfolio/Navbar";
import Hero from "@/components/portfolio/Hero";
import About from "@/components/portfolio/About";
import Stacks from "@/components/portfolio/Stacks";
import Projects from "@/components/portfolio/Projects";
import Experience from "@/components/portfolio/Experience";
import Articles from "@/components/portfolio/Articles";
import Contact from "@/components/portfolio/Contact";
import { useEffect } from "react";

const Index = () => {
  useEffect(() => {
    document.title = "Thalles Víctor — Backend Developer & DevOps";

    const setMeta = (name: string, content: string) => {
      let tag = document.querySelector(`meta[name="${name}"]`);
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute("name", name);
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", content);
    };

    setMeta(
      "description",
      "Portfólio de Thalles Víctor — desenvolvedor backend especializado em Node.js, Go, Kubernetes e DevOps. APIs robustas e infraestrutura escalável."
    );
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Hero />
      <About />
      <Stacks />
      <Projects />
      <Experience />
      <Articles />
      <Contact />
    </main>
  );
};

export default Index;
