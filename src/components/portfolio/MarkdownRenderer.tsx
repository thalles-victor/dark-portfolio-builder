import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface Props {
  content: string;
}

const MarkdownRenderer = ({ content }: Props) => {
  return (
    <div className="prose-article">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mt-12 mb-6 text-foreground">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mt-12 mb-5 text-foreground border-l-2 border-primary pl-4">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-xl sm:text-2xl font-semibold mt-8 mb-3 text-foreground">
              {children}
            </h3>
          ),
          p: ({ children }) => (
            <p className="text-base sm:text-lg leading-relaxed text-muted-foreground mb-5">
              {children}
            </p>
          ),
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline-offset-4 hover:underline font-medium"
            >
              {children}
            </a>
          ),
          ul: ({ children }) => (
            <ul className="list-disc pl-6 mb-5 space-y-2 text-muted-foreground marker:text-primary">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal pl-6 mb-5 space-y-2 text-muted-foreground marker:text-primary marker:font-mono">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="leading-relaxed text-base sm:text-lg">{children}</li>
          ),
          blockquote: ({ children }) => (
            <blockquote className="my-8 border-l-4 border-primary pl-6 py-2 italic text-foreground/90 bg-primary/5 rounded-r-lg">
              {children}
            </blockquote>
          ),
          img: ({ src, alt }) => (
            <figure className="my-10">
              <img
                src={src as string}
                alt={alt || ""}
                loading="lazy"
                className="w-full rounded-xl border border-border shadow-[var(--shadow-card)]"
              />
              {alt && (
                <figcaption className="font-mono text-xs text-muted-foreground/70 text-center mt-3">
                  // {alt}
                </figcaption>
              )}
            </figure>
          ),
          hr: () => <hr className="my-10 border-border" />,
          table: ({ children }) => (
            <div className="my-6 overflow-x-auto rounded-lg border border-border">
              <table className="w-full text-sm">{children}</table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-muted/40 text-foreground">{children}</thead>
          ),
          th: ({ children }) => (
            <th className="px-4 py-3 text-left font-mono text-xs uppercase tracking-wider">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="px-4 py-3 border-t border-border text-muted-foreground">
              {children}
            </td>
          ),
          code: ({ inline, className, children, ...props }: any) => {
            const match = /language-(\w+)/.exec(className || "");
            if (!inline && match) {
              return (
                <div className="my-6 rounded-xl overflow-hidden border border-border">
                  <div className="flex items-center justify-between px-4 py-2 bg-muted/40 border-b border-border">
                    <span className="font-mono text-xs text-muted-foreground">
                      {match[1]}
                    </span>
                    <div className="flex gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-destructive/60" />
                      <span className="w-2.5 h-2.5 rounded-full bg-primary/40" />
                      <span className="w-2.5 h-2.5 rounded-full bg-accent/60" />
                    </div>
                  </div>
                  <SyntaxHighlighter
                    language={match[1]}
                    style={oneDark}
                    customStyle={{
                      margin: 0,
                      padding: "1.25rem",
                      background: "hsl(var(--card))",
                      fontSize: "0.875rem",
                    }}
                    codeTagProps={{
                      style: { fontFamily: "var(--font-mono, monospace)" },
                    }}
                  >
                    {String(children).replace(/\n$/, "")}
                  </SyntaxHighlighter>
                </div>
              );
            }
            return (
              <code
                className="px-1.5 py-0.5 rounded bg-muted text-primary font-mono text-[0.9em] border border-border"
                {...props}
              >
                {children}
              </code>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;
