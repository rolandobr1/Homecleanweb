
import { blogPosts, siteConfig } from "@/lib/data";
import { constructMetadata } from "@/lib/metadata";
import { FAQSchema } from "@/components/seo/JsonLd";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const post = blogPosts.find(p => p.slug === slug);
  if (!post) return constructMetadata({ title: "Artículo no encontrado", noIndex: true });
  
  return constructMetadata({
    title: post.title,
    description: post.excerpt,
    image: post.image,
  });
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = blogPosts.find(p => p.slug === slug);
  if (!post) notFound();

  return (
    <article className="pt-24 pb-16">
      {post.faqs && <FAQSchema faqs={post.faqs.map(f => ({ question: f.q, answer: f.a }))} />}
      
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8 overflow-x-auto whitespace-nowrap">
          <Link href="/" className="hover:text-primary">Inicio</Link>
          <ChevronRight className="h-4 w-4" />
          <Link href="/blog" className="hover:text-primary">Blog</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-primary font-medium truncate">{post.title}</span>
        </nav>

        <header className="mb-12">
          <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
            {post.title}
          </h1>
          <div className="text-muted-foreground font-medium">Publicado el {post.date}</div>
        </header>

        <div className="relative aspect-video mb-12 rounded-2xl overflow-hidden border">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Post Content */}
        <div 
          className="prose prose-blue prose-lg max-w-none mb-16 
            prose-headings:font-bold prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
            prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
            prose-p:text-muted-foreground prose-p:leading-relaxed
            prose-li:text-muted-foreground
            prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:italic prose-blockquote:bg-blue-50 prose-blockquote:p-6 prose-blockquote:rounded-r-xl"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* FAQ Section for SEO */}
        {post.faqs && (
          <div className="border-t pt-12">
            <h2 className="text-2xl font-bold mb-8">Preguntas frecuentes del artículo</h2>
            <Accordion type="single" collapsible className="w-full">
              {post.faqs.map((faq, index) => (
                <AccordionItem key={index} value={`post-faq-${index}`}>
                  <AccordionTrigger className="text-left">{faq.q}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        )}

        {/* Sidebar/CTA Style */}
        <div className="mt-16 bg-primary/5 rounded-3xl p-8 border border-primary/10 text-center">
          <h3 className="text-2xl font-bold mb-4">¿Necesitas productos de calidad?</h3>
          <p className="text-muted-foreground mb-8">
            En HomeCleanRD tenemos todo lo que mencionamos en este artículo y más. 
            ¡Limpieza profesional al alcance de tu mano!
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              href="/products" 
              className="px-8 py-3 bg-primary text-white rounded-full font-bold hover:bg-primary/90 transition-all"
            >
              Ver Catálogo
            </Link>
            <Link 
              href={`https://wa.me/${siteConfig.whatsapp}`} 
              target="_blank"
              className="px-8 py-3 bg-green-500 text-white rounded-full font-bold hover:bg-green-600 transition-all flex items-center justify-center gap-2"
            >
              Consultar por WhatsApp
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
