import { describe, expect, it, vi } from "vitest";

// next/font solo funciona dentro del compilador de Next; aquí basta con un stub.
vi.mock("next/font/google", () => ({ Inter: () => ({ className: "", variable: "" }) }));
import type { Metadata } from "next";
import { constructMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/data";

const base = siteConfig.url;
const params = (slug: string) => ({ params: Promise.resolve({ slug }) });
const canonicalOf = (m: Metadata) => m.alternates?.canonical;

describe("constructMetadata", () => {
  it("arma el canonical con la ruta de la página", () => {
    expect(canonicalOf(constructMetadata({ path: "/products" }))).toBe(`${base}/products`);
  });

  it("sin ruta, el canonical es la home", () => {
    expect(canonicalOf(constructMetadata())).toBe(base);
  });

  it("og:url coincide con el canonical", () => {
    const m = constructMetadata({ path: "/blog" });
    expect(m.openGraph?.url).toBe(`${base}/blog`);
  });

  it("las páginas noIndex no declaran canonical", () => {
    expect(canonicalOf(constructMetadata({ title: "x", noIndex: true }))).toBeUndefined();
  });
});

describe("canonical de cada página", () => {
  it("el layout no impone canonical (si no, las páginas sin metadata heredan el de la home)", async () => {
    const { metadata } = await import("@/app/layout");
    expect(canonicalOf(metadata)).toBeUndefined();
  });

  it("home", async () => {
    const { metadata } = await import("@/app/page");
    expect(canonicalOf(metadata)).toBe(base);
  });

  it("/products", async () => {
    const { metadata } = await import("@/app/products/page");
    expect(canonicalOf(metadata)).toBe(`${base}/products`);
  });

  it("/blog", async () => {
    const { metadata } = await import("@/app/blog/page");
    expect(canonicalOf(metadata)).toBe(`${base}/blog`);
  });

  it("/emprende", async () => {
    const { metadata } = await import("@/app/emprende/page");
    expect(canonicalOf(metadata)).toBe(`${base}/emprende`);
  });

  it("ficha de producto", async () => {
    const { generateMetadata } = await import("@/app/products/[slug]/page");
    const m = await generateMetadata(params("jabon-de-cuaba"));
    expect(canonicalOf(m)).toBe(`${base}/products/jabon-de-cuaba`);
  });

  it("categoría", async () => {
    const { generateMetadata } = await import("@/app/products/category/[slug]/page");
    const m = await generateMetadata(params("jabones"));
    expect(canonicalOf(m)).toBe(`${base}/products/category/jabones`);
  });

  it("post del blog", async () => {
    const { generateMetadata } = await import("@/app/blog/[slug]/page");
    const m = await generateMetadata(params("beneficios-jabon-cuaba"));
    expect(canonicalOf(m)).toBe(`${base}/blog/beneficios-jabon-cuaba`);
  });
});
