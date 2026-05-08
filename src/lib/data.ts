
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
    excerpt: "Guía paso a paso para mantener tu casa libre de virus usando productos locales de alta calidad en el clima tropical de RD.",
    date: "2024-03-20",
    image: "https://picsum.photos/seed/blog1/800/600",
    content: `
      <h2>La importancia de la desinfección en el clima tropical</h2>
      <p>Vivir en la República Dominicana implica convivir con altos niveles de humedad y temperaturas cálidas durante todo el año. Estas condiciones son ideales para la proliferación de bacterias y hongos en el hogar. Por eso, una limpieza superficial no es suficiente; necesitamos una desinfección profunda.</p>

      <h3>Limpieza vs. Desinfección: Conoce la diferencia</h3>
      <p>Es un error común pensar que limpiar y desinfectar es lo mismo. La <strong>limpieza</strong> elimina la suciedad visible, pero la <strong>desinfección</strong> es lo que realmente mata a los gérmenes. En HomeCleanRD, nuestros desinfectantes están formulados para eliminar el 99.9% de virus y bacterias comunes en superficies.</p>

      <h3>Pasos para una desinfección efectiva</h3>
      <ol>
        <li><strong>Limpia primero:</strong> Elimina el polvo y la grasa con agua y jabón neutro.</li>
        <li><strong>Aplica el desinfectante:</strong> Usa nuestro Desinfectante de Lavanda o Frutos Rojos sobre la superficie.</li>
        <li><strong>Deja actuar:</strong> El secreto de una buena desinfección es dejar el producto actuar por al menos 2 a 5 minutos antes de secar.</li>
      </ol>

      <h2>Zonas críticas en el hogar dominicano</h2>
      <p>En Santo Domingo y otras ciudades del país, el polvo y la humedad suelen acumularse en áreas específicas. Presta especial atención a:</p>
      <ul>
        <li>Manubrios de puertas y gavetas.</li>
        <li>Interruptores de luz.</li>
        <li>Controles remotos y celulares.</li>
        <li>Mesetas de cocina después de cocinar carnes.</li>
      </ul>

      <blockquote>"Un hogar desinfectado es la primera línea de defensa para la salud de tu familia en RD."</blockquote>
    `,
    faqs: [
      { q: "¿Cada cuánto debo desinfectar los pisos?", a: "Se recomienda una desinfección profunda al menos 2 veces por semana, especialmente si hay niños o mascotas." },
      { q: "¿Los productos HomeClean son seguros para mascotas?", a: "Sí, una vez secos, nuestros productos no representan riesgo para tus animales de compañía." }
    ]
  },
  {
    slug: "beneficios-jabon-cuaba",
    title: "5 Beneficios del Jabón de Cuaba que no conocías",
    excerpt: "Descubre por qué este producto tradicional dominicano sigue siendo el rey de la limpieza profunda en Santo Domingo.",
    date: "2024-03-15",
    image: "https://picsum.photos/seed/blog2/800/600",
    content: `
      <h2>El Jabón de Cuaba: Un icono de la limpieza en RD</h2>
      <p>Desde nuestras abuelas hasta las generaciones actuales, el jabón de cuaba ha sido el aliado indispensable en el hogar dominicano. Pero, ¿sabes realmente por qué es tan efectivo? Aquí te revelamos sus secretos.</p>

      <h3>1. Poder Quitamanchas Insuperable</h3>
      <p>El jabón de cuaba tiene una capacidad única para penetrar las fibras de la ropa y desprender manchas de grasa, sangre o sudor que otros detergentes modernos no logran eliminar. Es ideal para cuellos de camisas y uniformes escolares.</p>

      <h3>2. Multiuso Real: De la ropa al piso</h3>
      <p>A diferencia de otros productos especializados que solo sirven para una cosa, el jabón de cuaba HomeClean se puede usar para fregar platos, limpiar pisos de cerámica e incluso lavar el baño, dejando ese aroma a pino tan característico.</p>

      <h3>3. Es Biodegradable</h3>
      <p>En HomeCleanRD nos preocupamos por nuestro medio ambiente. Nuestra fórmula de cuaba es biodegradable, lo que significa que no daña nuestras fuentes de agua ni suelos de nuestra isla.</p>

      <h3>4. pH Balanceado para Ropa Delicada</h3>
      <p>A pesar de su fuerza contra las manchas, es lo suficientemente suave para ser usado en ropa de bebés y lencería fina, evitando irritaciones en la piel sensible.</p>

      <h3>5. Economía Circular</h3>
      <p>Rinde mucho más que los detergentes líquidos convencionales. Con un solo galón de jabón de cuaba líquido HomeClean puedes cubrir múltiples necesidades de limpieza en tu casa, ahorrando dinero mensualmente.</p>

      <h2>Cómo sacarle el máximo provecho</h2>
      <p>Para manchas difíciles en la ropa, aplica un poco de jabón directamente, frota suavemente y deja reposar 10 minutos antes de meter a la lavadora. Verás la diferencia al instante.</p>
    `,
    faqs: [
      { q: "¿El jabón de cuaba sirve para fregar?", a: "Absolutamente, es excelente para eliminar la grasa pesada de ollas y calderos." },
      { q: "¿Es el mismo jabón de bola tradicional?", a: "Mantenemos la fórmula tradicional pero en una presentación líquida más práctica y concentrada." }
    ]
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
