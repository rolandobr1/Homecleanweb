
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HeroSection() {

  return (
    <section 
      id="home" 
      className="relative min-h-[600px] w-full pt-20"
    >
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/cuabaenhabitat.png')" }}
        >
            <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative flex h-full min-h-[calc(600px-5rem)] flex-col items-center justify-center text-center text-white px-4">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl font-headline animate-slide-in-down">
            Tu Hogar, Impecablemente Limpio
            </h1>
            <p className="mt-4 max-w-[700px] text-lg text-gray-200 md:text-xl animate-slide-in-up">
            Descubre la magia de nuestros productos de limpieza, diseñados para brindarte resultados extraordinarios y un frescor duradero.
            </p>
            <div className="mt-8">
            <Link href="/products" passHref>
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    Ver Nuestros Productos
                </Button>
            </Link>
            </div>
        </div>
    </section>
  );
}
