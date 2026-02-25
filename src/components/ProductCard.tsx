import Image from 'next/image'
import Link from 'next/link'
import { Product } from '@/types/product'
import styles from './ProductCard.module.css'

type Props = {
  product: Product
}

export default function ProductCard({ product }: Props) {
  return (
    <Link href={`/products/${product.slug}`}>
      <div className={styles.card}>
        <Image
          src={product.image}
          alt={product.title}
          width={400}
          height={300}
          className={styles.image}
        />

        <h3 className={styles.title}>{product.title}</h3>

        <p className={styles.description}>
          {product.shortDescription}
        </p>

        <strong className={styles.price}>
          R$ {product.price}
        </strong>
      </div>
    </Link>
  )
}
