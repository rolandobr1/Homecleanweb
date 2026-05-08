
export const siteConfig = {
  name: "HomeCleanRD",
  url: "https://homecleanrd.com",
  description: "Productos de limpieza de alta calidad en República Dominicana. Jabón de cuaba, desinfectantes y más para un hogar impecable.",
  phone: "829-691-9556",
  address: "Santo Domingo, República Dominicana",
  whatsapp: "8296919556",
  email: "contacto@homeclean.com"
};

export const categories = [
  {
    slug: "jabones",
    name: "Jabones",
    description: "Nuestra selección de jabones tradicionales y neutros para el cuidado de tu ropa y piel.",
    seoTitle: "Jabones de Limpieza en RD | Tradicionales y Neutros"
  },
  {
    slug: "desinfectantes",
    name: "Desinfectantes",
    description: "Elimina el 99.9% de los gérmenes con nuestros desinfectantes de fragancias duraderas.",
    seoTitle: "Desinfectantes con Fragancia en Santo Domingo | HomeCleanRD"
  },
  {
    slug: "cocina",
    name: "Cocina",
    description: "Productos especializados para arrancar la grasa y mantener tu cocina reluciente.",
    seoTitle: "Productos de Limpieza para Cocina en República Dominicana"
  }
];

export const products = [
  {
    slug: "jabon-de-cuaba",
    category: "jabones",
    name: "Jabón de Cuaba",
    shortDescription: "Tradición y poder de limpieza profunda.",
    description: "Nuestro Jabón de Cuaba es la solución tradicional y poderosa para una limpieza profunda en el hogar dominicano. Elaborado con aceite de pino, es ideal para manchas difíciles.",
    image: "/images/cuabapote.png",
    sizes: ["Galón", "Medio Galón"],
    features: ["Natural", "Multiuso", "Biodegradable"],
    faqs: [
      { q: "¿Para qué superficies sirve?", a: "Es ideal para ropa, pisos y superficies de cocina." },
      { q: "¿Es biodegradable?", a: "Sí, nuestra fórmula respeta el medio ambiente." }
    ]
  },
  {
    slug: "lavaplatos-liquido",
    category: "cocina",
    name: "Lavaplatos Fragancia Limón",
    shortDescription: "Arranca la grasa más difícil.",
    description: "Formulado para cortar la grasa persistente sin esfuerzo. Su espuma activa deja tus platos rechinando de limpios con un refrescante aroma cítrico.",
    image: "/images/lavaplatospote.png",
    sizes: ["1L", "500ml"],
    features: ["Ultra Desengrasante", "Antibacteriano", "Suave con las manos"],
    faqs: [
      { q: "¿Irrita las manos?", a: "No, tiene un pH balanceado para proteger tu piel." }
    ]
  },
  {
    slug: "desinfectante-lavanda",
    category: "desinfectantes",
    name: "Desinfectante Lavanda",
    shortDescription: "Limpieza profunda y aroma relajante.",
    description: "Crea un santuario de calma con el poder germicida de nuestro desinfectante de lavanda. Ideal para pisos, baños y superficies comunes.",
    image: "/images/lavandapote.png",
    sizes: ["Galón", "Medio Galón"],
    features: ["Germicida", "Aroma Duradero", "Relajante"],
    faqs: [
      { q: "¿Mata virus y bacterias?", a: "Sí, elimina el 99.9% de los gérmenes comunes." }
    ]
  }
];

export const blogPosts = [
  {
    slug: "como-desinfectar-correctamente",
    title: "Cómo desinfectar correctamente tu hogar en República Dominicana",
    excerpt: "Guía paso a paso para mantener tu casa libre de virus usando productos locales de alta calidad.",
    date: "2024-03-20",
    image: "https://picsum.photos/seed/blog1/800/600",
    content: "La limpieza profunda es vital... [contenido extenso optimizado para SEO]"
  },
  {
    slug: "beneficios-jabon-cuaba",
    title: "5 Beneficios del Jabón de Cuaba que no conocías",
    excerpt: "Descubre por qué este producto tradicional sigue siendo el rey de la limpieza en RD.",
    date: "2024-03-15",
    image: "https://picsum.photos/seed/blog2/800/600",
    content: "El jabón de cuaba es más que un simple jabón... [contenido extenso]"
  }
];

export const faqs = [
  {
    question: "¿Hacen entregas en Santo Domingo?",
    answer: "Sí, realizamos entregas en todo el Gran Santo Domingo y envíos al interior del país."
  },
  {
    question: "¿Venden productos al por mayor?",
    answer: "Contamos con precios especiales para distribuidores y negocios que deseen comprar al por mayor."
  },
  {
    question: "¿Cómo puedo ser distribuidor?",
    answer: "Puedes completar nuestro formulario en la sección 'Emprende' o escribirnos directamente por WhatsApp."
  }
];
