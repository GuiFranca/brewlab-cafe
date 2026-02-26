import { getProducts } from '@/services/mock/products'
import ProductCard from '@/components/ProductCard'
import Hero from '@/components/Hero'
import styles from './page.module.css'

export default async function HomePage() {
  const products = await getProducts()

  return (
    <>
      <Hero />

      <main>
        <div id="menu" className={styles.grid}>
          {products.map(product => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </main>
    </>
  )
}
