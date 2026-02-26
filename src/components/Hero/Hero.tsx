'use client'

import styles from './Hero.module.css'

export default function Hero() {
  const handleScrollToMenu = () => {
    const menuElement = document.getElementById('menu')
    if (menuElement) {
      const shouldReduceMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches
      menuElement.scrollIntoView({
        behavior: shouldReduceMotion ? 'auto' : 'smooth',
      })
    }
  }

  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <span className={styles.badge}>Cafézin</span>

        <h1 className={styles.title}>
          Café artesanal com experiência moderna
        </h1>

        <p className={styles.subtitle}>
          Descubra bebidas especiais, doces frescos e um ambiente pensado
          para quem ama café.
        </p>

        <button className={styles.cta} onClick={handleScrollToMenu}>
          Ver Cardápio
        </button>
      </div>
    </section>
  )
}
