import ContactForm from "./ContactForm";
import { Phone, Mail } from "lucide-react";
import Link from 'next/link';

const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg 
      version="1.1" 
      id="Capa_1" 
      xmlns="http://www.w3.org/2000/svg" 
      xmlnsXlink="http://www.w3.org/1999/xlink" 
      x="0px" 
      y="0px" 
      viewBox="0 0 121.07 121.06"
	  style={{enableBackground:"new 0 0 121.07 121.06"}}
      xmlSpace="preserve"
      {...props}
    >
        <g fill="currentColor">
            <path d="M59.49,0.02c25.81-0.16,47.68,14.95,57.01,37.23c3.91,9.35,5.22,19.1,4.29,29.18c-2.39,25.91-21.88,47.77-47.37,53.21
                c-14.09,3.01-27.57,1.22-40.4-5.29c-1.01-0.51-1.88-0.59-2.94-0.33c-9.7,2.33-19.41,4.61-29.11,6.92
                c-1.01,0.24-0.98-0.08-0.75-0.92c2.55-9.37,5.04-18.75,7.6-28.12c0.23-0.85,0.14-1.51-0.28-2.27C2.1,79.68-0.56,69,0.1,57.68
                c1.06-18.27,8.82-33.23,23.1-44.73c6.53-5.26,13.92-8.86,22-11C50.22,0.61,55.35-0.14,59.49,0.02z M64.63,12.11
                c-12.62,0.06-20.66,2.22-28.18,6.47c-18.35,10.37-28,32.63-22.97,53.08c1.43,5.84,3.95,11.19,7.07,16.27
                c0.46,0.75,0.53,1.4,0.29,2.26c-1.24,4.43-2.38,8.89-3.6,13.33c-0.21,0.76-0.41,1.17,0.73,0.89c3.51-0.88,7.1-1.47,10.54-2.54
                c3.26-1.02,5.94-0.66,9.01,1.06c10.26,5.76,21.33,7.25,32.84,4.93c8.11-1.63,15.28-5.27,21.61-10.61
                c15.27-12.89,21.03-34.74,14.03-53.49C98.89,24.68,81.02,12.21,64.63,12.11z"/>
            <path d="M76.86,89.54c-4.61-0.08-8.82-1.77-13.08-3.28c-9.83-3.48-17.35-10.02-23.72-18.04c-3.09-3.89-6.06-7.88-8.13-12.44
                c-2.58-5.69-3.15-11.48-0.03-17.13c1.42-2.58,3.08-5.19,6.29-5.97c1.67-0.41,3.4-0.33,5.05,0.09c1.45,0.37,1.94,1.72,2.46,2.93
                c1.33,3.12,2.41,6.37,3.97,9.38c1.41,2.73,0.6,4.77-1.14,6.81c-0.74,0.86-1.46,1.74-2.24,2.56c-0.85,0.9-1.08,1.79-0.41,2.93
                c4.93,8.43,11.9,14.47,20.97,18.09c1.09,0.43,2.12,0.28,2.92-0.74c1.46-1.86,2.98-3.67,4.45-5.52c1.12-1.42,1.85-1.68,3.55-0.99
                c4.24,1.74,8.29,3.88,12.41,5.89c1.21,0.59,1.1,1.63,1.1,2.67c-0.01,5.51-2.86,9.08-7.69,11.34
                C81.43,89.14,79.21,89.61,76.86,89.54z"/>
        </g>
    </svg>
);


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
                <Link href="https://wa.me/18296919556" target="_blank" className="text-primary hover:underline">
                  (829) 691-9556
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
