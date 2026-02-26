import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ProfilePage from './page'

describe('ProfilePage', () => {
  it('renderiza os inputs de perfil', () => {
    render(<ProfilePage />)

    expect(screen.getByLabelText('Nome')).toBeInTheDocument()
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
    expect(screen.getByLabelText('Cidade')).toBeInTheDocument()
    expect(screen.getByLabelText('Bebida favorita')).toBeInTheDocument()
  })

  it('altera estado ao digitar quando autenticado', async () => {
    const user = userEvent.setup()

    render(<ProfilePage />)

    await user.click(screen.getByRole('button', { name: 'Entrar' }))

    const nameInput = screen.getByLabelText('Nome')
    await user.clear(nameInput)
    await user.type(nameInput, 'Ana')

    expect(nameInput).toHaveValue('Ana')
  })
})
