import { getProducts } from '@/services/mock/products'
import ProductCard from '@/components/ProductCard'
import styles from './page.module.css'

export default async function HomePage() {
  const products = await getProducts()

  return (
    <main className={styles.container}>
      <h1>BrewLab Café</h1>

      <div className={styles.grid}>
        {products.map(product => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </main>
  )
}
