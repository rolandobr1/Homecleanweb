"use client";

import React, { useEffect, useRef, useState } from 'react';
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from '@/lib/utils';

const products = [
  {
    name: "Jabón de Cuaba",
    description: "Poderoso jabón tradicional para una limpieza profunda y efectiva en múltiples superficies.",
    image: "https://placehold.co/400x400.png",
    aiHint: "soap bar",
    sizes: ["Galón", "Medio Galón"],
    features: ["Natural", "Multiuso"],
  },
  {
    name: "Lavaplatos Líquido",
    description: "Arranca la grasa más difícil y deja tus platos rechinando de limpios con un fresco aroma.",
    image: "https://placehold.co/400x400.png",
    aiHint: "dish soap",
    sizes: ["1L", "500ml"],
    features: ["Desengrasante", "Antibacteriano"],
  },
  {
    name: "Jabón Neutro",
    description: "Fórmula suave y balanceada, ideal para el cuidado de la piel y la limpieza de prendas delicadas.",
    image: "https://placehold.co/400x400.png",
    aiHint: "liquid soap",
    sizes: ["Galón"],
    features: ["Hipoalergénico", "PH Neutro"],
  },
  {
    name: "Desinfectante Frutos Rojos",
    description: "Elimina el 99.9% de gérmenes y bacterias, dejando un aroma irresistible a frutos rojos.",
    image: "https://placehold.co/400x400.png",
    aiHint: "cleaning spray",
    sizes: ["Galón", "Medio Galón"],
    features: ["Antibacteriano", "Aroma Duradero"],
  },
  {
    name: "Desinfectante Lavanda",
    description: "Un ambiente de calma y limpieza con el poder desinfectante y el relajante aroma a lavanda.",
    image: "https://placehold.co/400x400.png",
    aiHint: "disinfectant spray",
    sizes: ["Galón", "Medio Galón"],
    features: ["Relajante", "Limpia y Desinfecta"],
  },
];

export default function ProductsSection() {
    const [visibleProducts, setVisibleProducts] = useState<Record<number, boolean>>({});
    const productRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const index = parseInt(entry.target.getAttribute('data-index') || '0', 10);
                        setVisibleProducts((prev) => ({ ...prev, [index]: true }));
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.1,
            }
        );

        productRefs.current.forEach((ref) => {
            if (ref) {
                observer.observe(ref);
            }
        });

        return () => {
            productRefs.current.forEach((ref) => {
                if (ref) {
                    observer.unobserve(ref);
                }
            });
        };
    }, []);

    return (
        <section id="products" className="py-16 sm:py-24 bg-white">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">
                        Nuestros Productos
                    </h2>
                    <p className="mt-4 max-w-2xl mx-auto text-muted-foreground md:text-xl">
                        Calidad premium para cada rincón de tu hogar.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {products.map((product, index) => (
                        <div
                            key={product.name}
                            ref={(el) => (productRefs.current[index] = el)}
                            data-index={index}
                            className={cn(
                                "transition-all duration-700 ease-out transform opacity-0 translate-y-5",
                                visibleProducts[index] && "opacity-100 translate-y-0"
                            )}
                            style={{ transitionDelay: `${index * 100}ms` }}
                        >
                            <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
                                <CardHeader className="p-0">
                                    <Image
                                        src={product.image}
                                        alt={product.name}
                                        width={400}
                                        height={400}
                                        className="w-full h-auto object-cover"
                                        data-ai-hint={product.aiHint}
                                    />
                                </CardHeader>
                                <CardContent className="p-6">
                                    <CardTitle className="text-xl font-headline">{product.name}</CardTitle>
                                    <CardDescription className="mt-2 h-12">{product.description}</CardDescription>
                                    <div className="mt-4 flex flex-wrap gap-2">
                                        {product.sizes.map((size) => (
                                            <Badge key={size} variant="secondary">{size}</Badge>
                                        ))}
                                    </div>
                                    <div className="mt-4 flex flex-wrap gap-2">
                                        {product.features.map((feature) => (
                                            <Badge key={feature} variant="outline" className="text-accent-foreground bg-accent/20 border-accent/50">{feature}</Badge>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
