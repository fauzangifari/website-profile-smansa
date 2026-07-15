import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { JsonLd, breadcrumbSchema } from "@/lib/seo/json-ld";
import { cn } from "@/lib/utils";

type BreadcrumbItem = {
  label: string;
  href?: string;
};

type PageTemplateProps = {
  title: string;
  eyebrow?: string;
  description?: string;
  backgroundImage?: string;
  backgroundAlt?: string;
  breadcrumbs?: BreadcrumbItem[];
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  variant?: "default" | "glass";
  /**
   * Content surface. "card" (default) wraps children in the standard white
   * bordered card. "bare" drops the card so content sits directly on the page
   * background — useful for pages that provide their own section surfaces.
   */
  contentSurface?: "card" | "bare";
  /**
   * Hero banner size. "default" is the tall fixed-height banner. "compact"
   * lets the banner hug the title block so the title sits at the top with the
   * cover image only as a background band (used by the berita/posts detail).
   */
  heroSize?: "default" | "compact";
};

export function PageTemplate({
  title,
  eyebrow,
  description,
  backgroundImage = "/images/hero/background-hero.jpg",
  backgroundAlt = "SMA Negeri 1 Samarinda",
  breadcrumbs,
  children,
  className,
  contentClassName,
  variant = "default",
  contentSurface = "card",
  heroSize = "default",
}: PageTemplateProps) {
  const isGlass = variant === "glass";
  const showCard = !isGlass && contentSurface === "card";
  const isCompactHero = heroSize === "compact";
  // Guard against empty-string sources (e.g. API items without a cover):
  // an empty `src` triggers a browser refetch warning and renders no banner.
  const heroImage = backgroundImage || "/images/hero/background-hero.jpg";

  return (
    <main
      className={cn(
        "min-h-screen overflow-hidden",
        isGlass
          ? "relative bg-neutral-50"
          : "bg-[linear-gradient(180deg,#f8fafc_0%,#eef6ff_48%,#ffffff_100%)]",
        className,
      )}
    >
      {isGlass && (
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <div className="absolute left-[-10%] top-[10%] h-[40%] w-[40%] rounded-full bg-brand-primary-soft/20 blur-[120px] luxury-orbit" />
          <div className="absolute right-[-10%] bottom-[10%] h-[35%] w-[35%] rounded-full bg-brand-accent/10 blur-[100px] luxury-orbit-reverse" />
        </div>
      )}

      <section
        className={cn(
          "relative overflow-hidden",
          isCompactHero
            ? ""
            : "h-[50svh] min-h-[440px] max-h-[560px] md:min-h-[460px]",
        )}
      >
        <div className="absolute inset-0">
          <Image
            src={heroImage}
            alt={backgroundAlt}
            fill
            preload
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-white/25 backdrop-blur-[5px]" />
          <div className="section-grid-accent absolute inset-0 opacity-20" />
        </div>

        <Container
          className={cn(
            "relative z-10 flex items-start pb-8 pt-28 md:pb-10 md:pt-32",
            !isCompactHero && "h-full",
          )}
        >
          <div className="w-full max-w-3xl rounded-lg border border-white/70 bg-white/82 p-5 shadow-lg shadow-neutral-900/10 backdrop-blur-2xl md:p-7 lg:p-8">
            {breadcrumbs?.length ? (
              <nav aria-label="Breadcrumb" className="mb-4">
                <JsonLd data={breadcrumbSchema(breadcrumbs)} />
                <ol className="flex flex-wrap items-center gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-neutral-600">
                  {breadcrumbs.map((item, index) => {
                    const isLast = index === breadcrumbs.length - 1;

                    return (
                      <li key={`${item.label}-${index}`} className="flex items-center gap-2">
                        {item.href && !isLast ? (
                          <Link
                            href={item.href}
                            className="transition hover:text-brand-primary"
                          >
                            {item.label}
                          </Link>
                        ) : (
                          <span className={isLast ? "text-brand-primary" : undefined}>
                            {item.label}
                          </span>
                        )}
                        {!isLast ? <span aria-hidden="true">/</span> : null}
                      </li>
                    );
                  })}
                </ol>
              </nav>
            ) : null}

            {eyebrow ? (
              <Badge variant="glass" className="mb-4">
                {eyebrow}
              </Badge>
            ) : null}

            <h1 className="max-w-2xl text-lg font-extrabold leading-tight text-neutral-900 break-words md:text-xl lg:text-3xl">
              {title}
            </h1>
            {description ? (
              <p className="mt-4 max-w-2xl text-sm leading-7 text-neutral-700 md:text-base md:leading-8">
                {description}
              </p>
            ) : null}
          </div>
        </Container>
      </section>

      <section className="relative pb-[var(--section-padding-y)] pt-8 md:pt-10">
        <Container
          className={cn(
            "relative z-10 rounded-lg transition-all duration-500",
            showCard
              ? "border border-neutral-200/70 bg-white p-5 shadow-md shadow-neutral-900/5 md:p-8 lg:p-10"
              : "p-0",
            contentClassName,
          )}
        >
          {children}
        </Container>
      </section>
    </main>
  );
}
