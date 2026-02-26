import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ProfilePage from './page'

describe('ProfilePage', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('renderiza o formulario de login para visitante', async () => {
    render(<ProfilePage />)

    expect(await screen.findByRole('button', { name: 'Entrar' })).toBeInTheDocument()
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
    expect(screen.getByLabelText('Senha')).toBeInTheDocument()
  })

  it('altera estado ao editar nome quando autenticado', async () => {
    const user = userEvent.setup()
    const expiresAt = Date.now() + 60_000

    localStorage.setItem(
      'cafezin_auth',
      JSON.stringify({ email: 'gui@email.com', expiresAt })
    )
    render(<ProfilePage />)

    await user.click(await screen.findByRole('button', { name: 'Editar perfil' }))

    const nameInput = screen.getByLabelText('Nome')
    await user.clear(nameInput)
    await user.type(nameInput, 'Ana')

    expect(nameInput).toHaveValue('Ana')
  })
})
