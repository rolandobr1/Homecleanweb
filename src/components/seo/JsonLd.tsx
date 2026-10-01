
import { categories, siteConfig } from "@/lib/data";

export function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": siteConfig.name,
    "image": `${siteConfig.url}/images/logoweb.png`,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Santo Domingo",
      "addressLocality": "Santo Domingo",
      "addressRegion": "DN",
      "addressCountry": "DO"
    },
    "telephone": siteConfig.phone,
    "url": siteConfig.url,
    "priceRange": "$",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "08:00",
        "closes": "18:00"
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

type ProductForSchema = {
  slug: string;
  name: string;
  description: string;
  image: string;
  category: string;
};

// Sin "offers": Google exige precio en la oferta y no publicamos precios en la web.
export function buildProductSchema(product: ProductForSchema) {
  const category = categories.find((c) => c.slug === product.category);
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "image": `${siteConfig.url}${product.image}`,
    "description": product.description,
    "url": `${siteConfig.url}/products/${product.slug}`,
    "category": category?.name ?? product.category,
    "brand": {
      "@type": "Brand",
      "name": siteConfig.name
    }
  };
}

export function ProductSchema({ product }: { product: ProductForSchema }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(buildProductSchema(product)) }}
    />
  );
}

export function FAQSchema({ faqs }: { faqs: { question: string, answer: string }[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
