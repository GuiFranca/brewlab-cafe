import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getProductBySlug, getProducts } from '@/services/mock/products'
import { formatCurrency } from '@/utils/format'
import styles from './page.module.css'

type Props = {
  params: Promise<{
    slug: string
  }>
}

// ISR: revalida a rota a cada 60 segundos.
export const revalidate = 60

export async function generateStaticParams() {
  const products = await getProducts()
  return products.map(product => ({ slug: product.slug }))
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params
  const product = await getProductBySlug(slug)

  if (!product) {
    notFound()
  }

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
        <p className={styles.price}>{formatCurrency(product.price)}</p>
        <button type="button" className={styles.favoriteBtn}>
          Favoritar
        </button>
      </section>
    </main>
  )
}
