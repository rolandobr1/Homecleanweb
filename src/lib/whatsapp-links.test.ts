import { describe, expect, it, vi } from "vitest";
import { createElement, type ReactElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

vi.mock("next/navigation", async (orig) => ({
  ...(await orig<typeof import("next/navigation")>()),
  usePathname: () => "/",
}));

/** Todos los <a> que apuntan a WhatsApp, con sus atributos de medición. */
function waLinks(html: string) {
  return [...html.matchAll(/<a [^>]*href="https:\/\/wa\.me\/[^"]*"[^>]*>/g)].map((m) => ({
    tag: m[0],
    location: m[0].match(/data-wa-location="([^"]*)"/)?.[1],
    product: m[0].match(/data-wa-product="([^"]*)"/)?.[1],
  }));
}

const render = (el: ReactElement) => renderToStaticMarkup(el);

describe("enlaces de WhatsApp medibles", () => {
  it("header: escritorio y menú móvil", async () => {
    const Header = (await import("@/components/landing/Header")).default;
    const links = waLinks(render(createElement(Header)));
    expect(links.length).toBeGreaterThan(0);
    for (const l of links) expect(l.location).toBe("header");
  });

  it("footer", async () => {
    const Footer = (await import("@/components/landing/Footer")).default;
    const links = waLinks(render(createElement(Footer)));
    expect(links.length).toBe(1);
    expect(links[0].location).toBe("footer");
  });

  it("sección de contacto", async () => {
    const ContactSection = (await import("@/components/landing/ContactSection")).default;
    const links = waLinks(render(createElement(ContactSection)));
    expect(links.length).toBe(1);
    expect(links[0].location).toBe("contact");
  });

  it("tarjetas de producto de la home llevan el producto", async () => {
    const ProductsSection = (await import("@/components/landing/ProductsSection")).default;
    const { products } = await import("@/lib/data");
    const links = waLinks(render(createElement(ProductsSection)));
    expect(links.map((l) => l.product).sort()).toEqual(products.map((p) => p.slug).sort());
    for (const l of links) expect(l.location).toBe("product_card");
  });

  it("ficha de producto", async () => {
    const Page = (await import("@/app/products/[slug]/page")).default;
    const links = waLinks(render(await Page({ params: Promise.resolve({ slug: "jabon-neutro" }) })));
    expect(links).toEqual([expect.objectContaining({ location: "product_page", product: "jabon-neutro" })]);
  });

  it("CTA del blog", async () => {
    const Page = (await import("@/app/blog/[slug]/page")).default;
    const links = waLinks(render(await Page({ params: Promise.resolve({ slug: "beneficios-jabon-cuaba" }) })));
    expect(links.length).toBe(1);
    expect(links[0].location).toBe("blog_cta");
  });
});

describe("formularios", () => {
  it("el formulario de contacto mide el envío exitoso", async () => {
    const { readFileSync } = await import("node:fs");
    const src = readFileSync("src/components/landing/ContactForm.tsx", "utf8");
    const success = src.slice(src.indexOf("if (result.success)"));
    expect(success.slice(0, 300)).toContain('trackEvent("contact_form_submit")');
  });

  it("el registro de distribuidores mide el envío exitoso", async () => {
    const { readFileSync } = await import("node:fs");
    const src = readFileSync("src/components/emprende/RegistrationForm.tsx", "utf8");
    const success = src.slice(src.indexOf("if (result.success)"));
    expect(success.slice(0, 300)).toContain('trackEvent("distributor_signup")');
  });
});
