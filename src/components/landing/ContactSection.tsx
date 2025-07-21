import ContactForm from "./ContactForm";
import { Phone, MessageSquare, Mail } from "lucide-react";
import Link from 'next/link';

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
              <MessageSquare className="h-6 w-6 text-primary mt-1" />
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
