import { describe, expect, it } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import HeroSection from "@/components/landing/HeroSection";
import { blogPosts, categories, products } from "@/lib/data";

const heroHtml = () => renderToStaticMarkup(createElement(HeroSection));

describe("hero (LCP)", () => {
  it("no usa imágenes de fondo CSS (el navegador las descubre tarde)", () => {
    expect(heroHtml()).not.toMatch(/background-image/i);
  });

  it("renderiza una <img> por slide", () => {
    expect(heroHtml().match(/<img /g) ?? []).toHaveLength(3);
  });

  // fetchpriority/preload dependen del React que trae Next en el build; se verifican en el HTML compilado.
  it("solo el primer slide se carga de inmediato; los demás en diferido", () => {
    const imgs = heroHtml().match(/<img [^>]*>/g) ?? [];
    expect(imgs).toHaveLength(3);
    expect(imgs[0]).not.toMatch(/loading="lazy"/);
    expect(imgs[1]).toMatch(/loading="lazy"/);
    expect(imgs[2]).toMatch(/loading="lazy"/);
  });

  it("las imágenes ocupan todo el ancho (sizes=100vw)", () => {
    const imgs = heroHtml().match(/<img [^>]*>/g) ?? [];
    expect(imgs).toHaveLength(3);
    for (const img of imgs) expect(img).toMatch(/sizes="100vw"/);
  });
});

describe("blog (LCP)", () => {
  it("la primera imagen del listado no se carga en diferido", async () => {
    const BlogPage = (await import("@/app/blog/page")).default;
    const imgs = renderToStaticMarkup(createElement(BlogPage)).match(/<img [^>]*>/g) ?? [];
    expect(imgs.length).toBeGreaterThan(1);
    expect(imgs[0]).not.toMatch(/loading="lazy"/);
    expect(imgs[1]).toMatch(/loading="lazy"/);
  });
});

describe("rutas estáticas", () => {
  it("cada producto se genera al compilar", async () => {
    const { generateStaticParams } = await import("@/app/products/[slug]/page");
    expect(await generateStaticParams()).toEqual(products.map((p) => ({ slug: p.slug })));
  });

  it("cada categoría se genera al compilar", async () => {
    const { generateStaticParams } = await import("@/app/products/category/[slug]/page");
    expect(await generateStaticParams()).toEqual(categories.map((c) => ({ slug: c.slug })));
  });

  it("cada post del blog se genera al compilar", async () => {
    const { generateStaticParams } = await import("@/app/blog/[slug]/page");
    expect(await generateStaticParams()).toEqual(blogPosts.map((p) => ({ slug: p.slug })));
  });
});
