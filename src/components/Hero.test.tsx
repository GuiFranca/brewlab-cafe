import { render, screen } from '@testing-library/react'
import Hero from './Hero'

describe('Hero', () => {
  it('exibe o texto principal', () => {
    render(<Hero />)

    expect(
      screen.getByRole('heading', {
        name: 'Café artesanal com experiência moderna',
      })
    ).toBeInTheDocument()
  })

  it('exibe o botão CTA', () => {
    render(<Hero />)

    expect(screen.getByRole('button', { name: 'Ver Cardápio' })).toBeInTheDocument()
  })
})
