
import { categories, products } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ProductsPage() {
  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Nuestro Catálogo</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Soluciones de limpieza de alta calidad para cada necesidad de tu hogar o negocio en República Dominicana.
          </p>
        </div>

        {/* Categorías Rápidas */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8">Explorar por Categoría</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {categories.map((cat) => (
              <Link 
                key={cat.slug} 
                href={`/products/category/${cat.slug}`}
                className="group p-8 border rounded-2xl bg-white hover:bg-primary hover:text-white transition-all shadow-sm"
              >
                <h3 className="text-xl font-bold mb-2">{cat.name}</h3>
                <p className="text-sm opacity-80 group-hover:opacity-100">{cat.description}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Todos los Productos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product.slug} className="group border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all">
              <Link href={`/products/${product.slug}`} className="block relative h-72 w-full bg-gray-50">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain p-8 group-hover:scale-105 transition-transform"
                />
              </Link>
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-2">{product.name}</h3>
                <p className="text-muted-foreground mb-6 line-clamp-2">{product.shortDescription}</p>
                <Button asChild className="w-full">
                  <Link href={`/products/${product.slug}`}>Ver Detalles</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
