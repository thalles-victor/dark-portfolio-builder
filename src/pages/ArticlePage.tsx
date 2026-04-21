import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, Share2 } from "lucide-react";
import Navbar from "@/components/portfolio/Navbar";
import MarkdownRenderer from "@/components/portfolio/MarkdownRenderer";
import { Button } from "@/components/ui/button";
import { articles, getArticleBySlug } from "@/data/articles";
import { toast } from "@/hooks/use-toast";

const ArticlePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? getArticleBySlug(slug) : undefined;

  useEffect(() => {
    if (article) {
      document.title = `${article.title} — Thalles Víctor`;
      const setMeta = (name: string, content: string) => {
        let tag = document.querySelector(`meta[name="${name}"]`);
        if (!tag) {
          tag = document.createElement("meta");
          tag.setAttribute("name", name);
          document.head.appendChild(tag);
        }
        tag.setAttribute("content", content);
      };
      setMeta("description", article.excerpt);
    }
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [article]);

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title: article?.title, url });
        return;
      } catch {
        // fallback
      }
    }
    await navigator.clipboard.writeText(url);
    toast({ title: "Link copiado!", description: "Compartilhe com quem quiser." });
  };

  if (!article) {
    return (
      <main className="min-h-screen bg-background text-foreground">
        <Navbar />
        <section className="container py-32 text-center">
          <p className="font-mono text-sm text-primary mb-3">// 404</p>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">Artigo não encontrado</h1>
          <p className="text-muted-foreground mb-8">
            O artigo que você procura não existe ou foi movido.
          </p>
          <Button asChild>
            <Link to="/#artigos">
              <ArrowLeft className="mr-2" size={16} /> Voltar para artigos
            </Link>
          </Button>
        </section>
      </main>
    );
  }

  const related = articles.filter((a) => a.slug !== article.slug).slice(0, 3);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />

      <article className="pt-28 pb-16">
        <div className="container max-w-3xl">
          <Link
            to="/#artigos"
            className="inline-flex items-center gap-2 font-mono text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft size={14} /> voltar para artigos
          </Link>

          <header className="mb-10">
            <span className="inline-block px-2.5 py-1 text-[11px] font-mono rounded-full bg-primary/10 border border-primary/30 text-primary mb-5">
              {article.category}
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6 leading-[1.15]">
              {article.title}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              {article.excerpt}
            </p>

            <div className="flex flex-wrap items-center gap-4 font-mono text-xs text-muted-foreground pt-5 border-t border-border">
              <span className="inline-flex items-center gap-1.5">
                <Calendar size={12} /> {article.date}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock size={12} /> {article.readTime} de leitura
              </span>
              <button
                onClick={handleShare}
                className="ml-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-border hover:border-primary/50 hover:text-primary transition-colors"
              >
                <Share2 size={12} /> compartilhar
              </button>
            </div>
          </header>

          <MarkdownRenderer content={article.content} />
        </div>
      </article>

      {related.length > 0 && (
        <section className="border-t border-border py-16 bg-card/30">
          <div className="container max-w-5xl">
            <p className="font-mono text-sm text-primary mb-3">// continue lendo</p>
            <h2 className="text-2xl sm:text-3xl font-bold mb-8 tracking-tight">
              Outros artigos
            </h2>
            <div className="grid md:grid-cols-3 gap-5">
              {related.map((a) => (
                <Link
                  key={a.slug}
                  to={`/artigos/${a.slug}`}
                  className="group card-gradient rounded-xl border border-border p-5 hover:border-primary/50 transition-all duration-300 hover:-translate-y-1"
                >
                  <span className="px-2 py-0.5 text-[10px] font-mono rounded-full bg-primary/10 border border-primary/30 text-primary">
                    {a.category}
                  </span>
                  <h3 className="font-bold text-base leading-snug mt-3 mb-2 group-hover:text-primary transition-colors">
                    {a.title}
                  </h3>
                  <p className="font-mono text-xs text-muted-foreground">
                    {a.date} · {a.readTime}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
};

export default ArticlePage;
