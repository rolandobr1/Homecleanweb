import RegistrationForm from "@/components/emprende/RegistrationForm";
import Image from "next/image";

export default function EmprendePage() {
  return (
    <div className="bg-white pt-20">
      <section className="relative py-16 sm:py-24 px-4 md:px-6 flex items-center justify-center min-h-[50vh] bg-gray-50">
        <div className="absolute inset-0">
           <Image 
             src="/images/nosotros.png"
             alt="Fondo de emprendimiento"
             layout="fill"
             objectFit="cover"
             className="opacity-10"
             data-ai-hint="business team working"
           />
        </div>
        <div className="relative text-center z-10">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl font-headline text-primary">
                Forma Parte de Home Clean
            </h1>
            <p className="mt-4 max-w-3xl mx-auto text-muted-foreground md:text-xl">
                Completa el siguiente formulario para iniciar tu camino como distribuidor. ¡Estamos emocionados de tenerte en nuestro equipo!
            </p>
        </div>
      </section>

      <section className="py-16 sm:py-24 px-4 md:px-6">
        <div className="container mx-auto max-w-2xl">
            <div className="bg-white p-8 rounded-lg shadow-2xl border">
                <h3 className="text-2xl font-bold mb-6 font-headline text-center">Formulario de Registro</h3>
                <RegistrationForm />
            </div>
        </div>
      </section>
    </div>
  );
}
