"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
    const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    };

  return (
    <section 
      id="home" 
      className="relative h-[90vh] min-h-[600px] w-full bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url(/cuabaenhabitat.png)" }}
    >
        <div className="absolute inset-0 bg-black/50 z-10" />
        <div className="relative z-20 flex h-full flex-col items-center justify-center text-center text-white px-4">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl font-headline">
            Tu Hogar, Impecablemente Limpio
            </h1>
            <p className="mt-4 max-w-[700px] text-lg text-gray-200 md:text-xl">
            Descubre la magia de nuestros productos de limpieza, diseñados para brindarte resultados extraordinarios y un frescor duradero.
            </p>
            <div className="mt-8">
            <Link href="#benefits" onClick={(e) => handleScrollTo(e, '#benefits')} passHref>
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    Descubre los Beneficios
                </Button>
            </Link>
            </div>
        </div>
    </section>
  );
}
