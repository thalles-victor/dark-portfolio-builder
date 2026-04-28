import articleCover from "@/assets/article-cover.jpg";
import articleK8s from "@/assets/article-k8s.jpg";

import KubernetsArticleContent from "@/posts/kubernetes.md?raw";
import Redis from "@/posts/redis.md?raw";

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  cover?: string;
  content: string;
};

export const articles: Article[] = [
  {
    slug: "construindo-apis-escalaveis-com-nestjs-e-redis",
    title: "Construindo APIs escaláveis com NestJS e Redis",
    excerpt:
      "Como projetar camadas de cache, filas com BullMQ e rate limiting para APIs que precisam suportar milhões de requisições.",
    category: "Backend",
    date: "12 Mar 2026",
    readTime: "8 min",
    cover: articleCover,
    content: Redis,
  },
  {
    slug: "kubernetes-autogerenciado-do-zero",
    title: "Kubernetes autogerenciado: o que aprendi montando clusters do zero",
    excerpt:
      "Decisões, armadilhas e ganhos reais ao operar Kubernetes sem usar EKS ou GKE — e quando vale a pena.",
    category: "DevOps",
    date: "28 Fev 2026",
    readTime: "12 min",
    cover: articleK8s,
    content: KubernetsArticleContent,
  },
  {
    slug: "go-vs-nodejs-stack-certa",
    title: "Go vs Node.js: escolhendo a stack certa para cada serviço",
    excerpt:
      "Critérios práticos baseados em experiência real para decidir entre Go e Node.js em microsserviços.",
    category: "Arquitetura",
    date: "10 Fev 2026",
    readTime: "6 min",
    cover: articleCover,
    content: `# Go vs Node.js\n\nEm breve — conteúdo completo deste artigo.`,
  },
  {
    slug: "observabilidade-grafana-loki-prometheus",
    title: "Observabilidade com Grafana, Loki e Prometheus",
    excerpt:
      "Stack completa de observabilidade para sistemas distribuídos — métricas, logs e traces sem dor de cabeça.",
    category: "Observabilidade",
    date: "22 Jan 2026",
    readTime: "10 min",
    cover: articleCover,
    content: `# Observabilidade\n\nEm breve — conteúdo completo deste artigo.`,
  },
  {
    slug: "rbac-bem-feito-padroes-controle-acesso",
    title: "RBAC bem feito: padrões para controle de acesso em APIs REST",
    excerpt:
      "Da modelagem de permissões à implementação com guards e decorators em NestJS.",
    category: "Segurança",
    date: "05 Jan 2026",
    readTime: "7 min",
    cover: articleCover,
    content: `# RBAC bem feito\n\nEm breve — conteúdo completo deste artigo.`,
  },
  {
    slug: "ci-cd-pragmatico-github-actions-docker",
    title: "CI/CD pragmático com GitHub Actions e Docker",
    excerpt:
      "Pipelines simples, rápidos e reproduzíveis para entregar software com confiança várias vezes ao dia.",
    category: "DevOps",
    date: "18 Dez 2025",
    readTime: "9 min",
    cover: articleCover,
    content: `# CI/CD pragmático\n\nEm breve — conteúdo completo deste artigo.`,
  },
];

export const getArticleBySlug = (slug: string) =>
  articles.find((a) => a.slug === slug);
