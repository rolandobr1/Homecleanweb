
import Link from "next/link";
import Image from "next/image";

const footerLinks = {
  products: [
    { label: "Jabón de Cuaba", href: "/products#jabon-de-cuaba" },
    { label: "Lavaplatos", href: "/products#lavaplatos-liquido" },
    { label: "Jabón Neutro", href: "/products#jabon-neutro" },
    { label: "Desinfectantes", href: "/products#desinfectante-frutos-rojos" },
  ],
  company: [
    { label: "Sobre Nosotros", href: "/#about" },
    { label: "Contacto", href: "/#contact" },
    { label: "Política de Privacidad", href: "#" },
  ],
};

export default function Footer() {
  const whatsappNumber = "8296919556";
  const message = encodeURIComponent("¡Hola! Vengo desde su página web y estoy interesado en sus productos.");
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link href="/">
              <Image 
                src="/images/logoweb.png" 
                alt="Home Clean Logo" 
                width={140} 
                height={40} 
              />
            </Link>
            <p className="mt-4 text-gray-300 text-sm">
              Limpieza y frescura para un hogar feliz.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-blue-400">Productos</h4>
            <ul className="space-y-2">
              {footerLinks.products.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-gray-300 hover:text-blue-400">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-blue-400">Empresa</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-gray-300 hover:text-blue-400">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-blue-400">Síguenos</h4>
            <div className="flex items-center gap-4">
               <Link href="https://web.facebook.com/profile.php?id=100063748722913" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <Image src="/images/face.png" alt="Facebook" width={24} height={24} className="hover:opacity-80" />
              </Link>
              <Link href="https://www.instagram.com/homeclean_rd/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <Image src="/images/ig.png" alt="Instagram" width={24} height={24} className="hover:opacity-80" />
              </Link>
              <Link href={whatsappUrl} target="_blank" aria-label="WhatsApp">
                <Image src="/images/wa.png" alt="WhatsApp" width={24} height={24} className="hover:opacity-80" />
              </Link>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Home Clean. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
