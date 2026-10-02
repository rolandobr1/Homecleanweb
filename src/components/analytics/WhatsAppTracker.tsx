"use client";

import { useEffect } from "react";
import { trackEvent, whatsappEventFromLink } from "@/lib/analytics";

/**
 * Un solo escuchador para toda la web: cualquier clic en un enlace https://wa.me/...
 * se envía a GA4 como "whatsapp_click", usando data-wa-location y data-wa-product del enlace.
 */
export default function WhatsAppTracker() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!link) return;
      const event = whatsappEventFromLink(link);
      if (event) trackEvent(event.name, event.params);
    };
    // capture: se registra aunque el enlace abra otra pestaña o detenga la propagación.
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return null;
}
