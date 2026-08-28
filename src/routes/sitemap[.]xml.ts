import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

const BASE_URL = "https://vulasolutions.co.za";

interface SitemapEntry {
  path: string;
  changefreq?: "weekly" | "monthly";
  priority?: string;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries: SitemapEntry[] = [
          { path: "/", changefreq: "weekly", priority: "1.0" },
          { path: "/compass", changefreq: "monthly", priority: "0.9" },
          { path: "/solutions", changefreq: "monthly", priority: "0.8" },
          { path: "/solutions/launch", changefreq: "monthly", priority: "0.7" },
          { path: "/solutions/flow", changefreq: "monthly", priority: "0.7" },
          { path: "/solutions/accelerate", changefreq: "monthly", priority: "0.7" },
          { path: "/solutions/growth", changefreq: "monthly", priority: "0.7" },
          { path: "/solutions/partner", changefreq: "monthly", priority: "0.7" },
          { path: "/pricing", changefreq: "monthly", priority: "0.8" },
          { path: "/about", changefreq: "monthly", priority: "0.6" },
          { path: "/industries", changefreq: "monthly", priority: "0.6" },
          { path: "/resources", changefreq: "weekly", priority: "0.6" },
          { path: "/case-studies", changefreq: "monthly", priority: "0.6" },
          { path: "/contact", changefreq: "monthly", priority: "0.6" },
          { path: "/tools/ai-readiness-assessment", changefreq: "monthly", priority: "0.7" },
          { path: "/tools/business-discovery-checklist", changefreq: "monthly", priority: "0.7" },
          { path: "/tools/business-systems-audit", changefreq: "monthly", priority: "0.7" },
          { path: "/tools/business-tech-glossary", changefreq: "monthly", priority: "0.7" },
          { path: "/tools/cost-of-doing-nothing-calculator", changefreq: "monthly", priority: "0.7" },
          { path: "/tools/digital-transformation-roadmap", changefreq: "monthly", priority: "0.7" },
          { path: "/tools/meeting-agenda-templates", changefreq: "monthly", priority: "0.7" },
          { path: "/tools/popia-basics-checklist", changefreq: "monthly", priority: "0.7" },
          { path: "/tools/process-improvement-scorecard", changefreq: "monthly", priority: "0.7" },
          { path: "/tools/project-risk-checklist", changefreq: "monthly", priority: "0.7" },
          { path: "/tools/requirements-workshop-guide", changefreq: "monthly", priority: "0.7" },
          { path: "/tools/sme-pricing-guide", changefreq: "monthly", priority: "0.7" },
          { path: "/tools/software-buying-checklist", changefreq: "monthly", priority: "0.7" },
          { path: "/tools/vendor-evaluation-matrix", changefreq: "monthly", priority: "0.7" },
          { path: "/privacy" },
          { path: "/terms" },
          { path: "/cookies" },
        ];
        const urls = entries.map((e) =>
          [
            `  <url>`,
            `    <loc>${BASE_URL}${e.path}</loc>`,
            e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
            `  </url>`,
          ].filter(Boolean).join("\n"),
        );
        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");
        return new Response(xml, {
          headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" },
        });
      },
    },
  },
});