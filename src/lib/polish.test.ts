import { describe, expect, it, vi } from "vitest";
import { readFileSync } from "node:fs";
import { createElement, type ReactElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

vi.mock("next/navigation", async (orig) => ({
  ...(await orig<typeof import("next/navigation")>()),
  usePathname: () => "/",
}));
vi.mock("next/font/google", () => ({ Inter: () => ({ className: "", variable: "" }) }));

const src = (p: string) => readFileSync(p, "utf8");
const render = (el: ReactElement) => renderToStaticMarkup(el);
const waHrefs = (html: string) => [...html.matchAll(/href="(https:\/\/wa\.me\/[^"?]*)/g)].map((m) => m[1]);

describe("WhatsApp con código de país (+1 República Dominicana)", () => {
  it("siteConfig.whatsapp incluye el 1", async () => {
    const { siteConfig } = await import("@/lib/data");
    expect(siteConfig.whatsapp).toBe("18094772885");
  });

  it("todos los enlaces wa.me del sitio usan el número internacional", async () => {
    const Header = (await import("@/components/landing/Header")).default;
    const Footer = (await import("@/components/landing/Footer")).default;
    const ContactSection = (await import("@/components/landing/ContactSection")).default;
    const ProductsSection = (await import("@/components/landing/ProductsSection")).default;
    const Product = (await import("@/app/products/[slug]/page")).default;
    const Post = (await import("@/app/blog/[slug]/page")).default;
    const hrefs = [
      ...waHrefs(render(createElement(Header))),
      ...waHrefs(render(createElement(Footer))),
      ...waHrefs(render(createElement(ContactSection))),
      ...waHrefs(render(createElement(ProductsSection))),
      ...waHrefs(render(await Product({ params: Promise.resolve({ slug: "jabon-neutro" }) }))),
      ...waHrefs(render(await Post({ params: Promise.resolve({ slug: "beneficios-jabon-cuaba" }) }))),
    ];
    expect(hrefs.length).toBeGreaterThan(5);
    for (const h of hrefs) expect(h).toBe("https://wa.me/18094772885");
  });
});

describe("apariciones al hacer scroll (solo CSS, sin JavaScript)", () => {
  const sections = [
    "src/components/landing/ProductsSection.tsx",
    "src/components/landing/BenefitsSection.tsx",
    "src/components/landing/AboutSection.tsx",
    "src/components/landing/EntrepreneurSection.tsx",
  ];

  it.each(sections)("%s es un componente de servidor: sin 'use client' ni IntersectionObserver", (file) => {
    const s = src(file);
    expect(s).not.toMatch(/^["']use client["']/m);
    expect(s).not.toContain("IntersectionObserver");
    expect(s).toContain("reveal");
  });

  it.each(sections)("%s se ve completo en el HTML (nada nace con opacity-0)", async (file) => {
    const mod = await import(`@/components/landing/${file.split("/").pop()!.replace(".tsx", "")}`);
    const html = render(createElement(mod.default));
    expect(html).not.toMatch(/class="[^"]*\bopacity-0\b/);
    expect(html).toContain('class="reveal');
  });

  it("la animación vive en CSS: solo donde hay scroll-driven animations y sin 'reducir movimiento'", () => {
    const css = src("src/app/globals.css");
    expect(css).toMatch(/@supports \(animation-timeline: view\(\)\)/);
    expect(css).toMatch(/@media \(prefers-reduced-motion: no-preference\)/);
    expect(css).toMatch(/\.reveal\s*\{[^}]*animation-timeline:\s*view\(\)/);
    expect(css).toMatch(/@keyframes reveal-in\s*\{\s*from\s*\{[^}]*opacity:\s*0[^}]*translateY\(8px\)/);
  });
});

describe("hero", () => {
  it("el título y el subtítulo no se animan (son lo primero que se lee)", () => {
    expect(src("src/components/landing/HeroSection.tsx")).not.toMatch(/animate-slide-in/);
  });

  it("las flechas del carrusel se ocultan en móvil", () => {
    const s = src("src/components/landing/HeroSection.tsx");
    expect(s).toMatch(/<CarouselPrevious className="hidden md:flex/);
    expect(s).toMatch(/<CarouselNext className="hidden md:flex/);
  });
});

describe("respuesta táctil", () => {
  it("los botones se hunden al presionarlos", () => {
    const s = src("src/components/ui/button.tsx");
    expect(s).toContain("active:scale-[0.97]");
    expect(s).not.toMatch(/"inline-flex[^"]*transition-colors /);
  });

  it("la tarjeta de producto anima solo transform y sombra, con subida sutil", () => {
    const s = src("src/components/landing/ProductsSection.tsx");
    expect(s).not.toContain("hover:-translate-y-2.5");
    expect(s).not.toContain("hover:shadow-2xl");
    expect(s).toContain("hover:-translate-y-1");
  });

  it("los efectos hover solo aplican con mouse", async () => {
    const config = (await import("../../tailwind.config")).default as { future?: { hoverOnlyWhenSupported?: boolean } };
    expect(config.future?.hoverOnlyWhenSupported).toBe(true);
  });

  it("sin destello gris al tocar y sin retraso de doble toque", () => {
    const css = src("src/app/globals.css");
    expect(css).toContain("-webkit-tap-highlight-color: transparent");
    expect(css).toMatch(/touch-action:\s*manipulation/);
  });

  it("los campos de formulario mantienen 16px (iPad no hace zoom)", () => {
    expect(src("src/components/ui/input.tsx")).not.toContain("md:text-sm");
    expect(src("src/components/ui/textarea.tsx")).not.toContain("md:text-sm");
  });
});

describe("detalles", () => {
  it("los chips de categoría de la home son enlaces", async () => {
    const s = src("src/app/page.tsx");
    for (const slug of ["jabones", "desinfectantes", "cocina"]) {
      expect(s).toContain(`/products/category/`);
      const { categories } = await import("@/lib/data");
      expect(categories.map((c) => c.slug)).toContain(slug);
    }
    expect(s).not.toMatch(/<span key=\{cat\}/);
  });

  it("la barra del navegador usa el azul del header", async () => {
    const { viewport } = await import("@/app/layout");
    expect(viewport.themeColor).toBe("#216dc4");
  });

  it("'Iniciar Sesión' ya no está en el header", async () => {
    const Header = (await import("@/components/landing/Header")).default;
    expect(render(createElement(Header))).not.toContain("Iniciar Sesión");
    expect(src("src/components/landing/Header.tsx")).not.toContain("Iniciar Sesión");
  });

  it("el footer tiene el enlace discreto 'Acceso equipo' junto al copyright", async () => {
    const Footer = (await import("@/components/landing/Footer")).default;
    const html = render(createElement(Footer));
    expect(html).toMatch(/<a[^>]*href="https:\/\/homecleanrd\.netlify\.app"[^>]*rel="nofollow[^"]*"[^>]*>Acceso equipo<\/a>/);
  });
});

describe("fotos de las tarjetas de producto", () => {
  it("el recuadro tiene la proporción de las fotos (5:4) en vez de una altura fija que las recorta", async () => {
    const ProductsSection = (await import("@/components/landing/ProductsSection")).default;
    const html = render(createElement(ProductsSection));
    expect(html).not.toContain("h-[200px]");
    const boxes = html.match(/<div class="[^"]*aspect-\[5\/4\][^"]*">\s*<img [^>]*>/g) ?? [];
    expect(boxes).toHaveLength(5);
    for (const b of boxes) {
      expect(b).toMatch(/data-nimg="fill"/);
      expect(b).toMatch(/sizes="\(min-width: 1024px\) 33vw, \(min-width: 768px\) 50vw, 100vw"/);
    }
  });
});

describe("LCP en celular", () => {
  it("la foto del primer slide pide prioridad alta; las demás no", () => {
    const s = src("src/components/landing/HeroSection.tsx");
    expect(s).toMatch(/fetchPriority=\{index === 0 \? "high" : undefined\}/);
  });

  it("el CSS va dentro del HTML (sin solicitud que bloquee el render)", async () => {
    const config = (await import("../../next.config")).default as { experimental?: { inlineCss?: boolean } };
    expect(config.experimental?.inlineCss).toBe(true);
  });

  it("gtag.js se carga cuando el navegador está libre, pero la cola de eventos existe desde el inicio", () => {
    const s = src("src/app/layout.tsx");
    expect(s).toMatch(/src="https:\/\/www\.googletagmanager\.com\/gtag\/js\?id=G-RLPF7FYX39"\s*strategy="lazyOnload"/);
    expect(s).toMatch(/id="google-analytics" strategy="afterInteractive"/);
  });

});
