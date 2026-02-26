import { getProducts } from '@/services/mock/products'
import ProductCard from '@/components/ProductCard'
import Hero from '@/components/Hero'
import styles from './page.module.css'

export default async function HomePage() {
  const products = await getProducts()

  return (
    <>
      <Hero />

      <main id="main-content" tabIndex={-1}>
        <section id="menu" aria-labelledby="menu-title">
          <h2 id="menu-title" className={styles.sectionTitle}>
            Cardápio
          </h2>

          <ul className={styles.grid}>
            {products.map(product => (
              <li key={product.slug} className={styles.item}>
                <ProductCard product={product} />
              </li>
            ))}
          </ul>
        </section>
      </main>
    </>
  )
}
