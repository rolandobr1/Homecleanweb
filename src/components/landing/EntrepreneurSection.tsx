"use client";

import React, { useEffect, useRef, useState } from 'react';
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { cn } from '@/lib/utils';

export default function EntrepreneurSection() {
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
        <section id="emprende" className="py-16 sm:py-24 bg-white">
            <div 
                ref={sectionRef}
                className={cn(
                    "container mx-auto px-4 md:px-6 transition-all duration-700 ease-out transform opacity-0 translate-y-5",
                    isVisible && "opacity-100 translate-y-0"
                )}
            >
                <div className="grid md:grid-cols-2 gap-12 items-center bg-gray-50 p-8 md:p-12 rounded-2xl shadow-sm">
                    <div className="order-2 md:order-1">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline text-primary">
                            ¡Emprende con Nosotros!
                        </h2>
                        <p className="mt-4 text-muted-foreground md:text-lg">
                            ¿Buscas una oportunidad de negocio? Conviértete en distribuidor de los productos Home Clean y genera ingresos con artículos de alta demanda y calidad comprobada. Te ofrecemos todo el apoyo que necesitas para empezar.
                        </p>
                        <div className="mt-8">
                            <Button asChild size="lg">
                                <Link href="/emprende">
                                    Quiero ser Distribuidor <ArrowRight className="ml-2 h-5 w-5" />
                                </Link>
                            </Button>
                        </div>
                    </div>
                    <div className="order-1 md:order-2 rounded-lg overflow-hidden shadow-xl">
                        <Image
                            src="/images/emprende.jpg"
                            alt="Emprende con Home Clean"
                            width={600}
                            height={450}
                            className="w-full h-auto object-cover"
                            data-ai-hint="business opportunity handshake"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
