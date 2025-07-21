import ContactForm from "./ContactForm";
import { Phone, Mail } from "lucide-react";
import Link from 'next/link';

const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    <path d="M14.05 16.95A8.91 8.91 0 0 1 12.12 22a2 2 0 0 1-2-2V12a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v.2a4.94 4.94 0 0 1-5.95 5.75Z" />
  </svg>
)

export default function ContactSection() {
  return (
    <section id="contact" className="py-16 sm:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">
            Contáctanos
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground md:text-xl">
            Estamos aquí para ayudarte con todas tus necesidades de limpieza.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-12">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold mb-6 font-headline">Envíanos un Mensaje</h3>
            <ContactForm />
          </div>
          <div className="flex flex-col justify-center space-y-6">
            <h3 className="text-2xl font-bold mb-2 font-headline">Información de Contacto</h3>
            <div className="flex items-start gap-4">
              <Phone className="h-6 w-6 text-primary mt-1" />
              <div>
                <h4 className="font-semibold">Teléfonos</h4>
                <p className="text-muted-foreground">(809) 555-1234 / (829) 555-5678</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
               <WhatsAppIcon className="h-6 w-6 text-primary mt-1" />
              <div>
                <h4 className="font-semibold">WhatsApp</h4>
                <Link href="https://wa.me/18095551234" target="_blank" className="text-primary hover:underline">
                  (809) 555-1234
                </Link>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Mail className="h-6 w-6 text-primary mt-1" />
              <div>
                <h4 className="font-semibold">Email</h4>
                <Link href="mailto:contacto@homeclean.com" className="text-primary hover:underline">
                    contacto@homeclean.com
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
