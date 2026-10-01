import { afterEach, describe, expect, it, vi } from "vitest";

async function freshImport() {
  vi.resetModules();
  const data = await import("@/lib/data");
  const sitemap = (await import("@/app/sitemap")).default;
  const robots = (await import("@/app/robots")).default;
  return { siteConfig: data.siteConfig, sitemap, robots };
}

afterEach(() => {
  vi.unstubAllEnvs();
});

describe("URL del sitio", () => {
  it("usa NEXT_PUBLIC_SITE_URL cuando está definida", async () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://nuevo-dominio.com");
    const { siteConfig } = await freshImport();
    expect(siteConfig.url).toBe("https://nuevo-dominio.com");
  });

  it("usa la URL de Netlify si la variable no existe", async () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "");
    const { siteConfig } = await freshImport();
    expect(siteConfig.url).toBe("https://homecleanweb.netlify.app");
  });

  it("quita la barra final de la variable", async () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://ejemplo.com/");
    const { siteConfig } = await freshImport();
    expect(siteConfig.url).toBe("https://ejemplo.com");
  });

  it("el sitemap y el robots usan la URL configurada", async () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "");
    const { sitemap, robots } = await freshImport();
    for (const entry of sitemap()) {
      expect(entry.url.startsWith("https://homecleanweb.netlify.app")).toBe(true);
    }
    expect(robots().sitemap).toBe("https://homecleanweb.netlify.app/sitemap.xml");
  });
});
