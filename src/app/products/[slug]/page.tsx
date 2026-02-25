import Image from 'next/image'
import { notFound } from 'next/navigation'
import { headers } from 'next/headers'
import { Product } from '@/types/product'
import styles from './page.module.css'

type Props = {
  params: Promise<{
    slug: string
  }>
}

// ISR — revalida a cada 60s
export const revalidate = 60

async function getProduct(slug: string): Promise<Product> {
  const headersList = await headers()
  const host = headersList.get('host')

  if (!host) {
    notFound()
  }

  const protocol =
    headersList.get('x-forwarded-proto') ??
    (host.includes('localhost') ? 'http' : 'https')

  const response = await fetch(`${protocol}://${host}/api/products/${slug}`, {
    next: { revalidate },
  })

  if (!response.ok) {
    notFound()
  }

  return response.json()
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params
  const product = await getProduct(slug)

  return (
    <main className={styles.container}>
      <div className={styles.image}>
        <Image
          src={product.image}
          alt={product.title}
          width={520}
          height={420}
          style={{ width: '100%', height: 'auto', maxWidth: '520px' }}
          priority
        />
      </div>

      <section className={styles.info}>
        <h1 className={styles.title}>{product.title}</h1>
        <p className={styles.description}>{product.description}</p>
        <p className={styles.price}>R$ {product.price.toFixed(2)}</p>
        <button type="button" className={styles.favoriteBtn}>
          Favoritar
        </button>
      </section>
    </main>
  )
}
