import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useLocation,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SiteHeader } from "../components/site/SiteHeader";
import { SiteFooter } from "../components/site/SiteFooter";
import { BrandIntro } from "../components/site/BrandIntro";
import { AskCompass } from "../components/site/AskCompass";
import { Mark } from "../components/site/Logo";

/**
 * Structured data for search engines — ProfessionalService covers
 * Organization and LocalBusiness. Only public business info here.
 */
const JSON_LD = JSON.stringify({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": "https://vulasolutions.co.za/#organization",
      name: "Vula Solutions",
      url: "https://vulasolutions.co.za/",
      slogan: "Open the door to a smarter, stronger business.",
      description:
        "Vula Solutions is a Business Transformation Partner for South African SMEs. Strategy, websites, AI, automation and SEO — every engagement starts with Compass™, our signature business discovery session.",
      image: "https://vulasolutions.co.za/og-image.png",
      email: "info@vulasolutions.co.za",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Midrand",
        addressRegion: "Gauteng",
        addressCountry: "ZA",
      },
      areaServed: { "@type": "Country", name: "South Africa" },
      sameAs: [
        "https://www.linkedin.com/company/vula-solutions/",
        "https://www.facebook.com/vulasolutions",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://vulasolutions.co.za/#website",
      url: "https://vulasolutions.co.za/",
      name: "Vula Solutions",
      inLanguage: "en-ZA",
      publisher: { "@id": "https://vulasolutions.co.za/#organization" },
    },
  ],
});

function NotFoundComponent() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-background px-4 py-20">
      <div className="max-w-md text-center">
        <Mark className="mx-auto h-14 w-auto" />
        <p className="font-display mt-8 text-7xl font-semibold tracking-tight text-foreground">404</p>
        <h1 className="mt-3 text-xl font-semibold text-foreground">This door leads nowhere.</h1>
        <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
          Vula means open — but the page you're looking for doesn't exist or has moved.
          Let's get you back to somewhere useful.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/"
            className="inline-flex h-11 items-center rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
          >
            Go home
          </Link>
          <Link
            to="/compass"
            className="inline-flex h-11 items-center rounded-full border border-border px-6 text-sm font-medium text-foreground transition hover:border-electric/40 hover:text-electric"
          >
            Discover Compass™
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Vula Solutions — Business Transformation Partner" },
      { name: "description", content: "We help small and medium businesses work smarter through strategy, websites, AI, automation and SEO. Start with Compass™." },
      { name: "author", content: "Vula Solutions" },
      { property: "og:title", content: "Vula Solutions" },
      { property: "og:description", content: "Open the door to a smarter, stronger business." },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Vula Solutions" },
      { property: "og:image", content: "https://vulasolutions.co.za/og-image.png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "Vula Solutions — open the door to a smarter, stronger business." },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "https://vulasolutions.co.za/og-image.png" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script dangerouslySetInnerHTML={{ __html: 'history.scrollRestoration="manual"' }} />
        {/* Only applies dark if user has explicitly chosen it — site always defaults to light */}
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{if(localStorage.getItem('vula-theme')==='dark')document.documentElement.classList.add('dark')}catch(e){}})()` }} />
        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-CE6WZP7QLT" />
        <script dangerouslySetInnerHTML={{ __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-CE6WZP7QLT');` }} />
        {/* Structured data for Google — Organization / LocalBusiness */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON_LD }} />
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const { pathname } = useLocation();
  const isInternal = pathname.startsWith("/sessions") || pathname.startsWith("/documents");

  return (
    <QueryClientProvider client={queryClient}>
      <ScrollToTop />
      <div className="flex min-h-dvh flex-col">
        <BrandIntro skip={isInternal} />
        <SiteHeader />
        <main className="flex-1">
          {/* Required: nested routes render here. */}
          <Outlet />
        </main>
        <SiteFooter />
        {!isInternal && <AskCompass />}
      </div>
    </QueryClientProvider>
  );
}
