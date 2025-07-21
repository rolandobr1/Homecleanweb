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
import Link from 'next/link';

const products = [
  {
    id: "jabon-de-cuaba",
    name: "Jabón de Cuaba",
    description: "Poderoso jabón tradicional para una limpieza profunda y efectiva en múltiples superficies.",
    image: "/images/cuaba.png",
    aiHint: "soap bar",
    sizes: ["Galón", "Medio Galón"],
    features: ["Natural", "Multiuso"],
  },
  {
    id: "lavaplatos-liquido",
    name: "Lavaplatos Líquido",
    description: "Arranca la grasa más difícil y deja tus platos rechinando de limpios con un fresco aroma.",
    image: "/images/lavaplatos.png",
    aiHint: "dish soap",
    sizes: ["1L", "500ml"],
    features: ["Desengrasante", "Antibacteriano"],
  },
  {
    id: "jabon-neutro",
    name: "Jabón Neutro",
    description: "Fórmula suave y balanceada, ideal para el cuidado de la piel y la limpieza de prendas delicadas.",
    image: "/images/neutrolava.png",
    aiHint: "liquid soap",
    sizes: ["Galón"],
    features: ["Hipoalergénico", "PH Neutro"],
  },
  {
    id: "desinfectante-frutos-rojos",
    name: "Desinfectante Frutos Rojos",
    description: "Elimina el 99.9% de gérmenes y bacterias, dejando un aroma irresistible a frutos rojos.",
    image: "/images/frutosrojos.png",
    aiHint: "cleaning spray",
    sizes: ["Galón", "Medio Galón"],
    features: ["Antibacteriano", "Aroma Duradero"],
  },
  {
    id: "desinfectante-lavanda",
    name: "Desinfectante Lavanda",
    description: "Un ambiente de calma y limpieza con el poder desinfectante y el relajante aroma a lavanda.",
    image: "/images/lavanda.png",
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
                        <Link key={product.id} href={`/products#${product.id}`} className="block h-full">
                            <div
                                ref={(el) => (productRefs.current[index] = el)}
                                data-index={index}
                                className={cn(
                                    "transition-all duration-700 ease-out transform opacity-0 translate-y-5 h-full",
                                    visibleProducts[index] && "opacity-100 translate-y-0"
                                )}
                                style={{ transitionDelay: `${index * 100}ms` }}
                            >
                                <div className="product-card-gradient h-full rounded-[20px] overflow-hidden shadow-lg transition-all duration-300 ease-in-out hover:-translate-y-2.5 hover:shadow-2xl flex flex-col">
                                    <div className="h-[200px] w-full overflow-hidden flex justify-center items-center">
                                        <Image
                                            src={product.image}
                                            alt={product.name}
                                            width={400}
                                            height={400}
                                            className="w-full h-full object-cover"
                                            data-ai-hint={product.aiHint}
                                        />
                                    </div>
                                    <div className="p-6 flex flex-col flex-grow">
                                        <h3 className="text-xl font-headline font-semibold tracking-tight text-primary">{product.name}</h3>
                                        <p className="mt-2 h-12 text-sm text-muted-foreground">{product.description}</p>
                                        <div className="mt-auto pt-4">
                                            <div className="flex flex-wrap gap-2">
                                                {product.sizes.map((size) => (
                                                    <Badge key={size} variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">{size}</Badge>
                                                ))}
                                            </div>
                                            <div className="mt-4 flex flex-wrap gap-2">
                                                {product.features.map((feature) => (
                                                    <Badge key={feature} variant="outline" className="bg-green-100 text-green-800 border-green-200">{feature}</Badge>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
