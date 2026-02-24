import { products } from '@/services/mock/products'
import ProductCard from '@/components/ProductCard'
import styles from './page.module.css'

export default function HomePage() {
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