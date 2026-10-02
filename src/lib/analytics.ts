// Eventos de conversión para Google Analytics 4 (gtag se carga en app/layout.tsx).
// Nunca enviar datos personales (nombre, correo, teléfono) en los parámetros.

export type AnalyticsEvent = "whatsapp_click" | "contact_form_submit" | "distributor_signup";
type Params = Record<string, string>;

type GtagWindow = { gtag?: (command: "event", name: string, params?: Params) => void };

export function trackEvent(name: AnalyticsEvent, params?: Params): void {
  const w = (globalThis as { window?: GtagWindow }).window;
  // Si Analytics no cargó (bloqueador, red lenta, servidor), no se mide pero la página sigue funcionando.
  w?.gtag?.("event", name, params);
}

type LinkLike = { href: string; dataset: { waLocation?: string; waProduct?: string } };

/** Si el enlace es de WhatsApp, devuelve el evento a enviar; si no, null. */
export function whatsappEventFromLink(link: LinkLike): { name: "whatsapp_click"; params: Params } | null {
  if (!link.href.startsWith("https://wa.me/")) return null;
  const params: Params = { location: link.dataset.waLocation || "unknown" };
  if (link.dataset.waProduct) params.product = link.dataset.waProduct;
  return { name: "whatsapp_click", params };
}
