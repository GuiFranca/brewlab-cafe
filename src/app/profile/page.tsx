'use client'

import { useState } from 'react'

export default function ProfilePage() {
  const [user, setUser] = useState({
    name: 'Guilherme',
    email: 'gui@email.com',
    city: 'Capivari',
    favoriteDrink: 'Espresso'
  })

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
  }

  return (
    <main style={{ padding: 32, maxWidth: 600 }}>
      <h1>Perfil do Usuário</h1>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <input
          name="name"
          value={user.name}
          onChange={handleChange}
          placeholder="Nome"
        />

        <input
          name="email"
          value={user.email}
          onChange={handleChange}
          placeholder="Email"
        />

        <input
          name="city"
          value={user.city}
          onChange={handleChange}
          placeholder="Cidade"
        />

        <input
          name="favoriteDrink"
          value={user.favoriteDrink}
          onChange={handleChange}
          placeholder="Bebida favorita"
        />

        <button onClick={() => alert('Alterações salvas!')}>Salvar alterações</button>
      </div>
    </main>
  )
}
