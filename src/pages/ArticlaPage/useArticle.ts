import { articles, getArticleBySlug } from "@/data/articles";
import { toast } from "@/hooks/use-toast";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export function useArticle() {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? getArticleBySlug(slug) : undefined;
  useEffect(() => {
    if (article) {
      document.title = `${article.title} — Thalles Víctor`;

      const setMeta = (name: string, content: string) => {
        let tag = document.querySelector<HTMLMetaElement>(
          `meta[name="${name}"]`,
        );

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
    toast({
      title: "Link copiado!",
      description: "Compartilhe com quem quiser.",
    });
  };

  const related = articles.filter((a) => a.slug !== article.slug).slice(0, 3);

  return {
    article,
    related,
    handleShare,
  };
}
