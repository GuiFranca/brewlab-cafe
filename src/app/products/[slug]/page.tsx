import Image from 'next/image'
import { notFound } from 'next/navigation'
import { products } from '@/services/mock/products'
import { Product } from '@/types/product'

type Props = {
  params: Promise<{
    slug: string
  }>
}

// ISR — revalida a cada 60s
export const revalidate = 60

async function getProduct(slug: string): Promise<Product> {
  const product = products.find(p => p.slug === slug)

  if (!product) {
    notFound()
  }

  return product
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params
  const product = await getProduct(slug)

  return (
    <main style={{ padding: 32 }}>
      <h1>{product.title}</h1>

      <Image
        src={product.image}
        alt={product.title}
        width={400}
        height={300}
      />

      <p>{product.description}</p>

      <strong>R$ {product.price}</strong>
    </main>
  )
}
