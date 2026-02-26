import { render, screen } from '@testing-library/react'
import ProductCard from './ProductCard'

const product = {
  slug: 'espresso-tradicional',
  title: 'Espresso Tradicional',
  shortDescription: 'Café curto, intenso e encorpado.',
  description: 'Descrição completa',
  price: 8.5,
  image: '/images/products/espresso-tradicional.png',
  category: 'cafe' as const,
}

describe('ProductCard', () => {
  it('renderiza o título', () => {
    render(<ProductCard product={product} />)

    expect(screen.getByRole('heading', { name: product.title })).toBeInTheDocument()
  })

  it('renderiza a descrição', () => {
    render(<ProductCard product={product} />)

    expect(screen.getByText(product.shortDescription)).toBeInTheDocument()
  })

  it('renderiza o preço formatado', () => {
    render(<ProductCard product={product} />)

    expect(screen.getByText(/R\$\s*8,50/)).toBeInTheDocument()
  })

  it('aponta o link para o slug do produto', () => {
    render(<ProductCard product={product} />)

    expect(screen.getByRole('link')).toHaveAttribute('href', '/products/espresso-tradicional')
  })
})
