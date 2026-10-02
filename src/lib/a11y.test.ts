import { describe, expect, it } from "vitest";
import { readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

const root = path.resolve(__dirname, "../..");
const css = readFileSync(path.join(root, "src/app/globals.css"), "utf8");

/** Lee un token HSL ("212 71% 45%") del bloque :root de globals.css. */
function token(name: string): [number, number, number] {
  const rootBlock = css.slice(css.indexOf(":root"), css.indexOf(".dark"));
  const m = rootBlock.match(new RegExp(`--${name}:\\s*([\\d.]+)\\s+([\\d.]+)%\\s+([\\d.]+)%`));
  if (!m) throw new Error(`token --${name} no encontrado`);
  return [Number(m[1]), Number(m[2]), Number(m[3])];
}

function hslToRgb([h, s, l]: [number, number, number]): [number, number, number] {
  s /= 100; l /= 100;
  const k = (n: number) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return [f(0), f(8), f(4)];
}

const hex = (h: string): [number, number, number] =>
  [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16) / 255) as [number, number, number];

function luminance([r, g, b]: [number, number, number]) {
  const c = (v: number) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);
  return 0.2126 * c(r) + 0.7152 * c(g) + 0.0722 * c(b);
}

function contrast(a: [number, number, number], b: [number, number, number]) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

const WHITE = hex("ffffff");
const PAGE_BG = hslToRgb(token("background")); // #f0f8ff aprox.
const AA = 4.5;

describe("contraste (WCAG AA)", () => {
  it("el azul principal se lee sobre blanco y sobre el fondo de la página", () => {
    const primary = hslToRgb(token("primary"));
    expect(contrast(primary, WHITE)).toBeGreaterThanOrEqual(AA);
    expect(contrast(primary, PAGE_BG)).toBeGreaterThanOrEqual(AA);
  });

  it("el texto de los botones se lee sobre el azul principal", () => {
    expect(contrast(hslToRgb(token("primary-foreground")), hslToRgb(token("primary")))).toBeGreaterThanOrEqual(AA);
  });

  it("el texto gris secundario se lee sobre blanco y sobre el fondo", () => {
    const muted = hslToRgb(token("muted-foreground"));
    expect(contrast(muted, WHITE)).toBeGreaterThanOrEqual(AA);
    expect(contrast(muted, PAGE_BG)).toBeGreaterThanOrEqual(AA);
  });

  it("el texto gris se lee sobre los recuadros con fondo bg-primary/5", () => {
    const primary = hslToRgb(token("primary"));
    const tinted = primary.map((c, i) => 0.05 * c + 0.95 * PAGE_BG[i]) as [number, number, number];
    expect(contrast(hslToRgb(token("muted-foreground")), tinted)).toBeGreaterThanOrEqual(AA);
  });

  it("ningún botón con texto blanco usa bg-green-500 (2.3:1)", () => {
    const files: string[] = [];
    const walk = (dir: string) => {
      for (const f of readdirSync(dir)) {
        const p = path.join(dir, f);
        if (statSync(p).isDirectory()) walk(p);
        else if (p.endsWith(".tsx")) files.push(p);
      }
    };
    walk(path.join(root, "src"));
    const offenders = files.filter((f) =>
      readFileSync(f, "utf8")
        .split("\n")
        .some((line) => /bg-green-500/.test(line) && /text-white/.test(line)),
    );
    expect(offenders.map((f) => path.relative(root, f))).toEqual([]);
  });
});

/** Niveles de encabezado en orden de aparición. */
const headingLevels = (html: string) => [...html.matchAll(/<h([1-6])[\s>]/g)].map((m) => Number(m[1]));
const noSkips = (levels: number[]) => levels.every((lvl, i) => i === 0 || lvl <= levels[i - 1] + 1);

describe("orden de encabezados", () => {
  it("la ficha de producto no salta niveles (h1 → h3)", async () => {
    const Page = (await import("@/app/products/[slug]/page")).default;
    const html = renderToStaticMarkup(await Page({ params: Promise.resolve({ slug: "jabon-de-cuaba" }) }));
    expect(noSkips(headingLevels(html))).toBe(true);
  });

  it("los títulos del footer no saltan niveles después del contenido (h4 → h2)", async () => {
    const Footer = (await import("@/components/landing/Footer")).default;
    const levels = headingLevels(renderToStaticMarkup(createElement(Footer)));
    expect(levels.length).toBeGreaterThan(0);
    expect(Math.max(...levels)).toBeLessThanOrEqual(2);
  });

  it("la página de categoría no salta niveles", async () => {
    const Page = (await import("@/app/products/category/[slug]/page")).default;
    const html = renderToStaticMarkup(await Page({ params: Promise.resolve({ slug: "jabones" }) }));
    expect(noSkips(headingLevels(html))).toBe(true);
  });

  it("la página de emprende no salta niveles", async () => {
    const Page = (await import("@/app/emprende/page")).default;
    const html = renderToStaticMarkup(createElement(Page));
    expect(noSkips(headingLevels(html))).toBe(true);
  });
});
