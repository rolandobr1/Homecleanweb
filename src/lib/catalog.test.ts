import { describe, expect, it } from "vitest";
import { categories, products } from "@/lib/data";
import { homeProducts } from "@/components/landing/ProductsSection";

const bySlug = (slug: string) => products.find((p) => p.slug === slug);

describe("catálogo", () => {
  it("cada producto de la home tiene su página en data.ts", () => {
    for (const p of homeProducts) {
      expect(bySlug(p.slug), p.slug).toBeDefined();
    }
  });

  it("la home muestra los 5 productos del catálogo", () => {
    expect(homeProducts.map((p) => p.slug).sort()).toEqual(products.map((p) => p.slug).sort());
  });

  it("incluye Jabón Neutro y Desinfectante Frutos Rojos", () => {
    expect(bySlug("jabon-neutro")?.category).toBe("jabones");
    expect(bySlug("desinfectante-frutos-rojos")?.category).toBe("desinfectantes");
  });

  it("las presentaciones son las acordadas", () => {
    expect(bySlug("jabon-de-cuaba")?.sizes).toEqual(["Galón", "Medio Galón"]);
    expect(bySlug("lavaplatos-liquido")?.sizes).toEqual(["Galón", "Medio Galón"]);
    expect(bySlug("jabon-neutro")?.sizes).toEqual(["Galón"]);
    expect(bySlug("desinfectante-frutos-rojos")?.sizes).toEqual(["Galón"]);
    expect(bySlug("desinfectante-lavanda")?.sizes).toEqual(["Galón"]);
  });

  it("todo producto pertenece a una categoría existente", () => {
    const slugs = categories.map((c) => c.slug);
    for (const p of products) expect(slugs, p.slug).toContain(p.category);
  });

  it("todo producto tiene imagen de ficha y de tarjeta", () => {
    for (const p of products) {
      expect(p.image, p.slug).toMatch(/^\/images\//);
      expect(p.cardImage, p.slug).toMatch(/^\/images\//);
    }
  });
});
