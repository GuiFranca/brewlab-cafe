import styles from './Hero.module.css'

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <span className={styles.badge}>☕ BrewLab Café</span>

        <h1 className={styles.title}>
          Café artesanal com experiência moderna
        </h1>

        <p className={styles.subtitle}>
          Descubra bebidas especiais, doces frescos e um ambiente pensado
          para quem ama café e tecnologia.
        </p>

        <button className={styles.cta}>
          Ver Cardápio
        </button>
      </div>
    </section>
  )
}
