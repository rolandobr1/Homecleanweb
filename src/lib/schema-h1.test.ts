import { describe, expect, it } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { products, siteConfig } from "@/lib/data";
import { buildProductSchema } from "@/components/seo/JsonLd";
import HeroSection from "@/components/landing/HeroSection";

const cuaba = products.find((p) => p.slug === "jabon-de-cuaba")!;

describe("schema Product", () => {
  it("no declara offers sin precio (Google lo marca como error)", () => {
    expect(buildProductSchema(cuaba)).not.toHaveProperty("offers");
  });

  it("incluye url absoluta, imagen absoluta y categoría", () => {
    const schema = buildProductSchema(cuaba);
    expect(schema.url).toBe(`${siteConfig.url}/products/jabon-de-cuaba`);
    expect(schema.image).toBe(`${siteConfig.url}${cuaba.image}`);
    expect(schema.category).toBe("Jabones");
  });
});

describe("hero", () => {
  it("tiene un solo h1", () => {
    const html = renderToStaticMarkup(createElement(HeroSection));
    expect(html.match(/<h1[\s>]/g) ?? []).toHaveLength(1);
  });

  it("sigue mostrando los títulos de los tres slides", () => {
    const html = renderToStaticMarkup(createElement(HeroSection));
    expect(html).toContain("Tu Hogar, Impecablemente Limpio");
    expect(html).toContain("Poder Desengrasante que Cuida tus Manos");
    expect(html).toContain("Un Ambiente Fresco y Libre de Gérmenes");
  });
});
