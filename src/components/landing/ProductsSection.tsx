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
import { Button } from '@/components/ui/button';
import { products, siteConfig } from '@/lib/data';

// Única fuente de verdad: src/lib/data.ts. Así cada tarjeta enlaza a una ficha que existe.
export const homeProducts = products.map((p) => ({
    slug: p.slug,
    name: p.name,
    description: p.cardDescription,
    image: p.cardImage,
    sizes: p.sizes,
    features: p.features.slice(0, 2),
}));

export default function ProductsSection() {
    const [visibleProducts, setVisibleProducts] = useState<Record<number, boolean>>({});
    const productRefs = useRef<(HTMLDivElement | null)[]>([]);
    const whatsappNumber = siteConfig.whatsapp;

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
                    {homeProducts.map((product, index) => {
                        const message = encodeURIComponent(`¡Hola! Vengo desde su página web. Quiero ordenar ${product.name}.`);
                        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;
                        return (
                            <div
                                key={product.slug}
                                ref={(el) => { productRefs.current[index] = el; }}
                                data-index={index}
                                className={cn(
                                    "transition-all duration-700 ease-out transform opacity-0 translate-y-5 h-full flex flex-col",
                                    visibleProducts[index] && "opacity-100 translate-y-0"
                                )}
                                style={{ transitionDelay: `${index * 100}ms` }}
                            >
                                <div className="product-card-gradient h-full rounded-[20px] overflow-hidden shadow-lg transition-all duration-300 ease-in-out hover:-translate-y-2.5 hover:shadow-2xl flex flex-col flex-grow">
                                    <Link href={`/products/${product.slug}`} className="block">
                                        <div className="h-[200px] w-full overflow-hidden flex justify-center items-center">
                                            <Image
                                                src={product.image}
                                                alt={product.name}
                                                width={400}
                                                height={400}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    </Link>
                                    <div className="p-6 flex flex-col flex-grow">
                                        <Link href={`/products/${product.slug}`} className="block">
                                            <h3 className="text-xl font-headline font-semibold tracking-tight text-primary">{product.name}</h3>
                                            <p className="mt-2 h-12 text-sm text-muted-foreground">{product.description}</p>
                                        </Link>
                                        <div className="mt-auto pt-4 space-y-4">
                                            <div className="flex flex-wrap gap-2">
                                                {product.sizes.map((size) => (
                                                    <Badge key={size} variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">{size}</Badge>
                                                ))}
                                            </div>
                                            <div className="flex flex-wrap gap-2">
                                                {product.features.map((feature) => (
                                                    <Badge key={feature} variant="outline" className="bg-green-100 text-green-800 border-green-200">{feature}</Badge>

                                                ))}
                                            </div>
                                            <Button asChild className="bg-green-700 hover:bg-green-800 text-white w-full mt-4">
                                                <Link href={whatsappUrl} target="_blank">
                                                    <Image src="/images/wa.png" alt="WhatsApp" width={20} height={20} className="mr-2" />
                                                    Ordenar
                                                </Link>
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    );
}
