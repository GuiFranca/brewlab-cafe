'use client'

import { useState } from 'react'
import styles from './page.module.css'

export default function ProfilePage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState({
    name: 'Guilherme',
    email: 'gui@email.com',
    city: 'Capivari',
    favoriteDrink: 'Espresso'
  })
  const [message, setMessage] = useState('')

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
  }

  function handleLoginToggle() {
    setIsAuthenticated(prev => !prev)
    setMessage('')
  }

  function handleSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setMessage('Alteracoes salvas com sucesso.')
  }

  return (
    <main>
      <h1 className={styles.title}>Perfil do Usuario</h1>
      <p className={styles.subtitle}>
        Conteudo personalizado em CSR com autenticacao simulada via estado local.
      </p>

      <button
        type="button"
        className={styles.authButton}
        onClick={handleLoginToggle}
      >
        {isAuthenticated ? 'Sair' : 'Entrar'}
      </button>

      <p className={styles.status}>
        Status: {isAuthenticated ? 'Autenticado' : 'Visitante'}
      </p>

      <form className={styles.form} onSubmit={handleSave}>
        <fieldset className={styles.fieldset} disabled={!isAuthenticated}>
          <legend>Dados do Usuario</legend>

          <label htmlFor="name">Nome</label>
          <input
            id="name"
            name="name"
            value={user.name}
            onChange={handleChange}
            placeholder="Nome"
            autoComplete="name"
          />

          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            placeholder="Email"
            type="email"
            autoComplete="email"
          />

          <label htmlFor="city">Cidade</label>
          <input
            id="city"
            name="city"
            value={user.city}
            onChange={handleChange}
            placeholder="Cidade"
          />

          <label htmlFor="favoriteDrink">Bebida favorita</label>
          <input
            id="favoriteDrink"
            name="favoriteDrink"
            value={user.favoriteDrink}
            onChange={handleChange}
            placeholder="Bebida favorita"
          />
        </fieldset>

        <button
          type="submit"
          className={styles.saveButton}
          disabled={!isAuthenticated}
        >
          Salvar alteracoes
        </button>
      </form>

      {message && (
        <p role="status" aria-live="polite" className={styles.message}>
          {message}
        </p>
      )}
    </main>
  )
}
