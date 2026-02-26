import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import HomePage from './page'
import { getProducts } from '@/services/mock/products'

vi.mock('@/services/mock/products', () => ({
  getProducts: vi.fn(),
}))

vi.mock('@/components/Hero', () => ({
  default: () => <div data-testid="hero">Hero</div>,
}))

vi.mock('@/components/ProductCard', () => ({
  default: ({ product }: { product: { title: string } }) => (
    <article data-testid="product-card">{product.title}</article>
  ),
}))

describe('HomePage', () => {
  it('renderiza hero e lista de produtos', async () => {
    vi.mocked(getProducts).mockResolvedValue([
      {
        slug: 'espresso-tradicional',
        title: 'Espresso Tradicional',
        shortDescription: 'Café curto',
        description: 'Descrição completa',
        price: 8.5,
        image: '/images/products/espresso-tradicional.png',
        category: 'cafe',
      },
      {
        slug: 'latte-baunilha',
        title: 'Latte Baunilha',
        shortDescription: 'Cremoso',
        description: 'Descrição completa',
        price: 14.9,
        image: '/images/products/latte-baunilha.png',
        category: 'bebida',
      },
    ])

    render(await HomePage())

    expect(getProducts).toHaveBeenCalledTimes(1)
    expect(screen.getByTestId('hero')).toBeInTheDocument()
    expect(screen.getAllByTestId('product-card')).toHaveLength(2)
    expect(screen.getByText('Espresso Tradicional')).toBeInTheDocument()
    expect(screen.getByText('Latte Baunilha')).toBeInTheDocument()
  })
})
