import Link from "next/link";
import { Sparkles, Facebook, Instagram, MessageSquare } from "lucide-react";

const footerLinks = {
  products: [
    { label: "Jabón de Cuaba", href: "#products" },
    { label: "Lavaplatos", href: "#products" },
    { label: "Jabón Neutro", href: "#products" },
    { label: "Desinfectantes", href: "#products" },
  ],
  company: [
    { label: "Sobre Nosotros", href: "#about" },
    { label: "Contacto", href: "#contact" },
    { label: "Política de Privacidad", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-white border-t">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl">
              <Sparkles className="h-6 w-6 text-primary" />
              <span>Home Clean</span>
            </Link>
            <p className="mt-4 text-muted-foreground text-sm">
              Limpieza y frescura para un hogar feliz.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Productos</h4>
            <ul className="space-y-2">
              {footerLinks.products.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Empresa</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Síguenos</h4>
            <div className="flex items-center gap-4">
              <Link href="#" aria-label="Facebook">
                <Facebook className="h-6 w-6 text-muted-foreground hover:text-primary" />
              </Link>
              <Link href="#" aria-label="Instagram">
                <Instagram className="h-6 w-6 text-muted-foreground hover:text-primary" />
              </Link>
              <Link href="#" aria-label="WhatsApp">
                <MessageSquare className="h-6 w-6 text-muted-foreground hover:text-primary" />
              </Link>
            </div>
          </div>
        </div>
        <div className="border-t mt-8 pt-6 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Home Clean. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
