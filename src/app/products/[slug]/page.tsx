
import { products, siteConfig } from "@/lib/data";
import { constructMetadata } from "@/lib/metadata";
import { ProductSchema } from "@/components/seo/JsonLd";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface PageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: PageProps) {
  const product = products.find(p => p.slug === params.slug);
  if (!product) return constructMetadata({ title: "Producto no encontrado", noIndex: true });
  
  return constructMetadata({
    title: `${product.name} - Calidad Superior en RD`,
    description: product.description,
    image: product.image,
  });
}

export default function ProductDetailPage({ params }: PageProps) {
  const product = products.find(p => p.slug === params.slug);
  if (!product) notFound();

  const whatsappMessage = encodeURIComponent(`¡Hola! Estoy interesado en el producto ${product.name} que vi en su web.`);
  const whatsappUrl = `https://wa.me/${siteConfig.whatsapp}?text=${whatsappMessage}`;

  return (
    <div className="pt-24 pb-16">
      <ProductSchema product={product} />
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-start mb-16">
          <div className="relative aspect-square rounded-2xl bg-gray-50 border p-8">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-contain"
              priority
            />
          </div>
          
          <div className="space-y-6">
            <h1 className="text-4xl font-bold text-primary">{product.name}</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {product.description}
            </p>
            
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Presentaciones Disponibles:</h3>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map(size => (
                  <Badge key={size} variant="secondary" className="text-md px-4 py-1">{size}</Badge>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Características Principales:</h3>
              <ul className="grid grid-cols-2 gap-2">
                {product.features.map(f => (
                  <li key={f} className="flex items-center gap-2 text-muted-foreground">
                    <span className="h-2 w-2 bg-green-500 rounded-full" /> {f}
                  </li>
                ))}
              </ul>
            </div>

            <Button asChild size="lg" className="w-full sm:w-auto bg-green-500 hover:bg-green-600 text-white">
              <Link href={whatsappUrl} target="_blank">
                Pedir por WhatsApp
              </Link>
            </Button>
          </div>
        </div>

        {/* FAQ del Producto */}
        <div className="max-w-2xl">
          <h2 className="text-2xl font-bold mb-6">Preguntas sobre {product.name}</h2>
          <Accordion type="single" collapsible className="w-full">
            {product.faqs.map((faq, index) => (
              <AccordionItem key={index} value={`pfaq-${index}`}>
                <AccordionTrigger>{faq.q}</AccordionTrigger>
                <AccordionContent>{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
}
