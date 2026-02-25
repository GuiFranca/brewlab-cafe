import Link from 'next/link'
import styles from './Header.module.css'

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        BrewLab Café
      </div>

      <nav className={styles.nav}>
        <Link href="/">Home</Link>
        <Link href="/profile">Profile</Link>
      </nav>
    </header>
  )
}
