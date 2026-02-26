import { render, screen } from '@testing-library/react'
import Container from './Container'

describe('Container', () => {
  it('renderiza os children', () => {
    render(
      <Container>
        <p>Conteúdo interno</p>
      </Container>
    )

    expect(screen.getByText('Conteúdo interno')).toBeInTheDocument()
  })
})
