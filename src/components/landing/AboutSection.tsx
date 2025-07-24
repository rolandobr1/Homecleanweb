"use client";

import React, { useEffect, useRef, useState } from 'react';
import Image from "next/image";
import { cn } from '@/lib/utils';

export default function AboutSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section id="about" className="py-16 sm:py-24 bg-gradient-to-b from-primary/90 to-primary text-primary-foreground">
      <div
        ref={sectionRef}
        className={cn(
          "container mx-auto px-4 md:px-6 transition-all duration-700 ease-out transform opacity-0 translate-y-5",
          isVisible && "opacity-100 translate-y-0"
        )}
      >
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline text-white">
              Sobre Home Clean
            </h2>
            <p className="mt-4 text-primary-foreground/80 md:text-lg">
              En Home Clean, nacimos de la pasión por crear ambientes limpios, frescos y saludables para cada hogar. Con años de experiencia en el mercado, hemos perfeccionado nuestras fórmulas para ofrecerte productos de la más alta calidad que no solo limpian, sino que cuidan de tu familia y tu espacio.
            </p>
            <p className="mt-4 text-primary-foreground/80 md:text-lg">
              Nuestra misión es simple: hacer que la limpieza sea una tarea más fácil, efectiva y placentera. Creemos en la innovación constante y en el poder de los ingredientes de primera, combinando ciencia y naturaleza para lograr resultados impecables.
            </p>
          </div>
          <div className="rounded-lg overflow-hidden shadow-xl">
            <Image
              src="/images/todos.jpg"
              alt="Equipo de Home Clean"
              width={600}
              height={450}
              className="w-full h-auto object-cover"
              data-ai-hint="company team"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
