
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";

const products = [
  {
    id: "jabon-de-cuaba",
    name: "Jabón de Cuaba",
    description: "Nuestro Jabón de Cuaba es la solución tradicional y poderosa para una limpieza profunda. Elaborado con aceite de pino, es conocido por su capacidad para eliminar manchas difíciles en ropa, limpiar superficies y dejar un aroma a limpio inconfundible. Es un producto multiuso, biodegradable y un aliado indispensable en el hogar dominicano.",
    image: "/images/cuabapote.png",
    aiHint: "soap container",
  },
  {
    id: "lavaplatos-liquido",
    name: "Lavaplatos Fragancia Limón",
    description: "El Lavaplatos Home Clean con fragancia a limón está formulado para arrancar la grasa más persistente sin esfuerzo. Su poderosa espuma corta la suciedad y los residuos de comida, dejando tus platos, vasos y cubiertos rechinando de limpios y con un refrescante aroma cítrico. Es antibacterial y suave con tus manos.",
    image: "/images/lavaplatospote.png",
    aiHint: "dish soap bottle",
  },
  {
    id: "jabon-neutro",
    name: "Jabón Neutro",
    description: "La fórmula suave y de pH balanceado de nuestro Jabón Neutro lo hace ideal para el lavado de ropa delicada, prendas de bebé y para personas con piel sensible. Limpia eficazmente sin ser agresivo con los tejidos ni con la piel, preservando los colores y la suavidad de tu ropa. Es hipoalergénico y no deja residuos.",
    image: "/images/neutropote.png",
    aiHint: "soap bottle",
  },
  {
    id: "desinfectante-frutos-rojos",
    name: "Desinfectante Fragancia Frutos Rojos",
    description: "Transforma tu hogar en un espacio limpio y lleno de vida con nuestro Desinfectante de Frutos Rojos. Elimina el 99.9% de gérmenes y bacterias de pisos, baños y cocinas, mientras impregna cada rincón con una fragancia dulce y duradera a fresas, cerezas y frambuesas. Limpieza y aroma en un solo paso.",
    image: "/images/frutosrojospote.png",
    aiHint: "cleaning product",
  },
  {
    id: "desinfectante-lavanda",
    name: "Desinfectante Fragancia Lavanda",
    description: "Crea un santuario de calma y limpieza con el Desinfectante de Lavanda. Su poder germicida garantiza una desinfección completa de las superficies, eliminando virus y bacterias. El relajante y clásico aroma a lavanda ayuda a reducir el estrés y promueve un ambiente de tranquilidad y bienestar en tu hogar.",
    image: "/images/lavandapote.png",
    aiHint: "disinfectant bottle",
  },
];

export default function ProductsPage() {
  const whatsappNumber = "18296919556"; // Country code + number

  return (
    <div className="bg-white pt-20">
      <section className="container mx-auto py-16 sm:py-24 px-4 md:px-6">
        <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl font-headline">
                Nuestra Línea de Productos
            </h1>
            <p className="mt-4 max-w-3xl mx-auto text-muted-foreground md:text-xl">
                Soluciones de limpieza de alta calidad, diseñadas para cada necesidad de tu hogar. Descubre en detalle los beneficios y usos de cada uno de nuestros productos estrella.
            </p>
        </div>
        <div className="space-y-16">
          {products.map((product, index) => {
            const message = encodeURIComponent(`¡Hola! Quiero ordenar ${product.name}.`);
            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

            return (
              <div 
                key={product.name} 
                id={product.id}
                className={`flex flex-col md:flex-row items-center gap-8 md:gap-12 scroll-mt-24 ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
              >
                <div className="md:w-1/2 flex justify-center">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={500}
                    height={500}
                    className="rounded-lg shadow-2xl object-contain max-h-[400px]"
                    data-ai-hint={product.aiHint}
                  />
                </div>
                <div className="md:w-1/2">
                  <h3 className="text-3xl font-bold font-headline text-primary">{product.name}</h3>
                  <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
                    {product.description}
                  </p>
                  <div className="mt-6">
                    <Button asChild className="bg-green-500 hover:bg-green-600 text-white">
                      <Link href={whatsappUrl} target="_blank">
                        <MessageSquare className="mr-2 h-5 w-5" />
                        Ordenar por WhatsApp
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
