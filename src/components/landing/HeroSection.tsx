
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const slides = [
  {
    title: "Tu Hogar, Impecablemente Limpio",
    subtitle: "Descubre la magia de nuestros productos de limpieza, diseñados para brindarte resultados extraordinarios y un frescor duradero.",
    buttonText: "Ver Nuestros Productos",
    buttonLink: "/products",
    imageUrl: "/images/slide1.jpg",
    dataAiHint: "cleaning products",
  },
  {
    title: "Poder Desengrasante que Cuida tus Manos",
    subtitle: "Nuestro lavaplatos líquido elimina la grasa más difícil, dejando tu vajilla reluciente y tus manos suaves.",
    buttonText: "Descubre el Lavaplatos",
    buttonLink: "/products#lavaplatos-liquido",
    imageUrl: "/images/slide2.jpg",
    dataAiHint: "clean kitchen sink",
  },
  {
    title: "Un Ambiente Fresco y Libre de Gérmenes",
    subtitle: "Con nuestros desinfectantes, tu hogar no solo olerá increíble, sino que estará protegido y seguro para tu familia.",
    buttonText: "Explora Desinfectantes",
    buttonLink: "/products#desinfectante-frutos-rojos",
    imageUrl: "/images/slide3.jpg",
    dataAiHint: "clean living room",
  },
];

export default function HeroSection() {

  return (
    <section 
      id="home" 
      className="relative w-full pt-20"
    >
      <Carousel
        className="w-full"
        plugins={[
          Autoplay({
            delay: 5000,
            stopOnInteraction: true,
          }),
        ]}
        opts={{
          loop: true,
        }}
      >
        <CarouselContent>
          {slides.map((slide, index) => (
            <CarouselItem key={index}>
              <div 
                className="relative min-h-[600px] w-full"
              >
                <div 
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-500"
                  style={{ backgroundImage: `url('${slide.imageUrl}')` }}
                  data-ai-hint={slide.dataAiHint}
                >
                  <div className="absolute inset-0 bg-black/50" />
                </div>
                <div className="relative flex h-full min-h-[calc(600px-5rem)] flex-col items-center justify-center text-center text-white px-4">
                  <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl font-headline animate-slide-in-down">
                    {slide.title}
                  </h1>
                  <p className="mt-4 max-w-[700px] text-lg text-gray-200 md:text-xl animate-slide-in-up">
                    {slide.subtitle}
                  </p>
                  <div className="mt-8">
                    <Link href={slide.buttonLink} passHref>
                      <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                        {slide.buttonText}
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-white/20 hover:bg-white/30 border-none" />
        <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-white/20 hover:bg-white/30 border-none" />
      </Carousel>
    </section>
  );
}
