import { afterEach, describe, expect, it, vi } from "vitest";
import { trackEvent, whatsappEventFromLink } from "@/lib/analytics";

type G = { window?: { gtag?: (...args: unknown[]) => void } };
const g = globalThis as unknown as G;

afterEach(() => {
  delete g.window;
});

describe("trackEvent", () => {
  it("envía el evento a gtag con sus parámetros", () => {
    const gtag = vi.fn();
    g.window = { gtag };
    trackEvent("whatsapp_click", { location: "header" });
    expect(gtag).toHaveBeenCalledWith("event", "whatsapp_click", { location: "header" });
  });

  it("no falla si gtag no está cargado (p. ej. bloqueador de anuncios)", () => {
    g.window = {};
    expect(() => trackEvent("contact_form_submit")).not.toThrow();
  });

  it("no falla en el servidor (sin window)", () => {
    expect(() => trackEvent("contact_form_submit")).not.toThrow();
  });
});

describe("whatsappEventFromLink", () => {
  it("convierte un enlace de WhatsApp en su evento con ubicación y producto", () => {
    expect(
      whatsappEventFromLink({
        href: "https://wa.me/8094772885?text=hola",
        dataset: { waLocation: "product_card", waProduct: "jabon-neutro" },
      }),
    ).toEqual({ name: "whatsapp_click", params: { location: "product_card", product: "jabon-neutro" } });
  });

  it("sin producto, solo manda la ubicación", () => {
    expect(
      whatsappEventFromLink({ href: "https://wa.me/8094772885", dataset: { waLocation: "footer" } }),
    ).toEqual({ name: "whatsapp_click", params: { location: "footer" } });
  });

  it("si al enlace le falta la ubicación, la marca como 'unknown'", () => {
    expect(whatsappEventFromLink({ href: "https://wa.me/1", dataset: {} })?.params.location).toBe("unknown");
  });

  it("ignora los enlaces que no son de WhatsApp", () => {
    expect(whatsappEventFromLink({ href: "https://homecleanrd.com/products", dataset: {} })).toBeNull();
  });
});
