
import { blogPosts } from "@/lib/data";
import { constructMetadata } from "@/lib/metadata";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata = constructMetadata({
  title: "Blog de Limpieza y Desinfección en RD",
  description: "Consejos expertos sobre limpieza profunda, uso de jabón de cuaba y desinfección de hogares en República Dominicana.",
});

export default function BlogPage() {
  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog HomeCleanRD</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Aprende a mantener tu hogar impecable con nuestros consejos expertos adaptados al clima y necesidades de nuestro país.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {blogPosts.map((post) => (
            <article key={post.slug} className="group border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all">
              <Link href={`/blog/${post.slug}`} className="block relative h-64 w-full overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </Link>
              <div className="p-8">
                <div className="text-sm text-primary font-medium mb-3">{post.date}</div>
                <h2 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h2>
                <p className="text-muted-foreground mb-6 line-clamp-3">
                  {post.excerpt}
                </p>
                <Button asChild variant="outline">
                  <Link href={`/blog/${post.slug}`}>Leer Artículo Completo</Link>
                </Button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
