
import HeroSection from "@/components/landing/HeroSection";
import ProductsSection from "@/components/landing/ProductsSection";
import BenefitsSection from "@/components/landing/BenefitsSection";
import AboutSection from "@/components/landing/AboutSection";
import ContactSection from "@/components/landing/ContactSection";
import EntrepreneurSection from "@/components/landing/EntrepreneurSection";
import { FAQSchema } from "@/components/seo/JsonLd";
import { faqs, siteConfig } from "@/lib/data";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function Home() {
  return (
    <>
      <FAQSchema faqs={faqs} />
      <HeroSection />
      
      {/* Sección de Categorías Rápidas */}
      <section className="py-12 bg-gray-50 border-b">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-8">Soluciones Especializadas para tu Hogar en RD</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {["Jabones", "Desinfectantes", "Cuidado de Cocina"].map(cat => (
              <span key={cat} className="px-6 py-2 bg-white rounded-full shadow-sm border font-medium text-primary">
                {cat}
              </span>
            ))}
          </div>
        </div>
      </section>

      <ProductsSection />
      <BenefitsSection />
      <AboutSection />
      
      {/* Sección de FAQ para SEO */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-bold text-center mb-12">Preguntas Frecuentes sobre {siteConfig.name}</h2>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <EntrepreneurSection />
      <ContactSection />
    </>
  );
}
