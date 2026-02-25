import type { Product } from '@/types/product'

export const products: Product[] = [
  {
    slug: 'espresso-tradicional',
    title: 'Espresso Tradicional',
    shortDescription: 'Café curto, intenso e encorpado.',
    description:
      'Extração clássica com grãos selecionados, ideal para quem gosta de sabor marcante e crema aveludada.',
    price: 8.5,
    image: '/images/products/espresso-tradicional.svg',
    category: 'cafe',
  },
  {
    slug: 'cappuccino-cremoso',
    title: 'Cappuccino Cremoso',
    shortDescription: 'Equilíbrio perfeito entre café, leite e espuma.',
    description:
      'Preparado com espresso duplo, leite vaporizado e toque de canela para uma experiência cremosa e aromática.',
    price: 14.9,
    image: '/images/products/cappuccino-cremoso.svg',
    category: 'cafe',
  },
  {
    slug: 'latte-baunilha',
    title: 'Latte Baunilha',
    shortDescription: 'Suave, aromático e levemente adocicado.',
    description:
      'Combinação de espresso com leite vaporizado e xarope natural de baunilha, perfeito para qualquer hora do dia.',
    price: 16.5,
    image: '/images/products/latte-baunilha.svg',
    category: 'cafe',
  },
  {
    slug: 'mocha-chocolate',
    title: 'Mocha Chocolate',
    shortDescription: 'Café com chocolate para um sabor irresistível.',
    description:
      'Mistura de espresso, leite cremoso e chocolate meio amargo finalizada com leve camada de espuma.',
    price: 17.9,
    image: '/images/products/mocha-chocolate.svg',
    category: 'cafe',
  },
  {
    slug: 'coado-artesanal',
    title: 'Coado Artesanal',
    shortDescription: 'Extração lenta com notas sensoriais destacadas.',
    description:
      'Café filtrado no método artesanal, com perfil equilibrado, acidez delicada e finalização limpa.',
    price: 12,
    image: '/images/products/coado-artesanal.svg',
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
