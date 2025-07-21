"use client";

import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Wind, PackageCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from '@/lib/utils';

interface Benefit {
  icon: LucideIcon;
  title: string;
  description: string;
}

const benefits: Benefit[] = [
  {
    icon: Sparkles,
    title: "Resultados Impecables",
    description: "Nuestras fórmulas avanzadas garantizan una limpieza profunda y un brillo que perdura.",
  },
  {
    icon: Wind,
    title: "Aromas que Enamoran",
    description: "Disfruta de una frescura inigualable con nuestra variedad de aromas que transforman tu hogar.",
  },
  {
    icon: PackageCheck,
    title: "Soluciones Completas",
    description: "Desde la cocina hasta el baño, tenemos el producto perfecto para cada una de tus necesidades.",
  },
];

export default function BenefitsSection() {
    const [visibleBenefits, setVisibleBenefits] = useState<Record<number, boolean>>({});
    const benefitRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const index = parseInt(entry.target.getAttribute('data-index') || '0', 10);
                        setVisibleBenefits((prev) => ({ ...prev, [index]: true }));
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.1,
            }
        );

        benefitRefs.current.forEach((ref) => {
            if (ref) {
                observer.observe(ref);
            }
        });

        return () => {
            benefitRefs.current.forEach((ref) => {
                if (ref) {
                    observer.unobserve(ref);
                }
            });
        };
    }, []);

  return (
    <section id="benefits" className="py-16 sm:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">
            ¿Por Qué Elegir Home Clean?
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground md:text-xl">
            Calidad, frescura y eficiencia en cada producto.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              ref={(el) => (benefitRefs.current[index] = el)}
              data-index={index}
              className={cn(
                  "transition-all duration-700 ease-out transform opacity-0 translate-y-5",
                  visibleBenefits[index] && "opacity-100 translate-y-0"
              )}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <Card className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
                <CardHeader className="items-center">
                  <div className="bg-primary/10 p-4 rounded-full">
                      <benefit.icon className="h-10 w-10 text-primary" />
                  </div>
                </CardHeader>
                <CardContent>
                  <CardTitle className="text-xl font-headline">{benefit.title}</CardTitle>
                  <p className="mt-2 text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
