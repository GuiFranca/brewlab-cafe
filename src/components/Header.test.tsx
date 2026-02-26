import { render, screen } from '@testing-library/react'
import Header from './Header'

describe('Header', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('renderiza link Login quando nao esta autenticado', async () => {
    render(<Header />)

    expect(screen.getByRole('link', { name: /home/i })).toHaveAttribute('href', '/')
    expect(screen.getByRole('link', { name: /login/i })).toHaveAttribute('href', '/profile')
  })

  it('renderiza link Perfil quando esta autenticado', async () => {
    const expiresAt = Date.now() + 60_000
    localStorage.setItem(
      'cafezin_auth',
      JSON.stringify({ email: 'gui@email.com', expiresAt })
    )

    render(<Header />)

    expect(await screen.findByRole('link', { name: /perfil/i })).toHaveAttribute('href', '/profile')
  })
})
