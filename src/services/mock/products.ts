import type { Product } from '@/types/product'

export const products: Product[] = [
  {
    slug: 'espresso-tradicional',
    title: 'Espresso Tradicional',
    shortDescription: 'Café curto, intenso e encorpado.',
    description:
      'Extração clássica com grãos selecionados, ideal para quem gosta de sabor marcante e crema aveludada.',
    price: 8.5,
    image: '/images/products/espresso-tradicional.png',
    category: 'cafe',
  },
  {
    slug: 'cappuccino-cremoso',
    title: 'Cappuccino Cremoso',
    shortDescription: 'Equilíbrio perfeito entre café, leite e espuma.',
    description:
      'Preparado com espresso duplo, leite vaporizado e toque de canela para uma experiência cremosa e aromática.',
    price: 14.9,
    image: '/images/products/cappuccino-cremoso.png',
    category: 'cafe',
  },
  {
    slug: 'latte-baunilha',
    title: 'Latte Baunilha',
    shortDescription: 'Suave, aromático e levemente adocicado.',
    description:
      'Combinação de espresso com leite vaporizado e xarope natural de baunilha, perfeito para qualquer hora do dia.',
    price: 16.5,
    image: '/images/products/latte-baunilha.png',
    category: 'cafe',
  },
  {
    slug: 'mocha-chocolate',
    title: 'Mocha Chocolate',
    shortDescription: 'Café com chocolate para um sabor irresistível.',
    description:
      'Mistura de espresso, leite cremoso e chocolate meio amargo finalizada com leve camada de espuma.',
    price: 17.9,
    image: '/images/products/mocha-chocolate.png',
    category: 'cafe',
  },
  {
    slug: 'coado-artesanal',
    title: 'Coado Artesanal',
    shortDescription: 'Extração lenta com notas sensoriais destacadas.',
    description:
      'Café filtrado no método artesanal, com perfil equilibrado, acidez delicada e finalização limpa.',
    price: 12,
    image: '/images/products/coado-artesanal.png',
    category: 'cafe',
  },
  {
    slug: 'flat-white',
    title: 'Flat White',
    shortDescription: 'Espresso intenso com leite microespumado.',
    description:
      'Bebida equilibrada com textura aveludada e sabor marcante de café, ideal para quem prefere menos espuma.',
    price: 15.5,
    image: '/images/products/flat-white.png',
    category: 'cafe',
  },
  {
    slug: 'macchiato-caramelo',
    title: 'Macchiato Caramelo',
    shortDescription: 'Camadas de café, leite e toque de caramelo.',
    description:
      'Combinação aromática com espresso, leite vaporizado e finalização de caramelo, perfeita para uma pausa doce.',
    price: 18.9,
    image: '/images/products/macchiato-caramelo.png',
    category: 'cafe',
  },
  {
    slug: 'cold-brew-citrico',
    title: 'Cold Brew Citrico',
    shortDescription: 'Extração a frio, suave e refrescante.',
    description:
      'Café extraído por longas horas em água fria, servido gelado com notas cítricas e baixa acidez.',
    price: 16,
    image: '/images/products/cold-brew-citrico.png',
    category: 'cafe',
  },
]

export async function getProducts(): Promise<Product[]> {
  return products
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const product = products.find(item => item.slug === slug)
  return product ?? null
}
