import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import ProductPage, { generateStaticParams } from './page'
import { getProductBySlug, getProducts } from '@/services/mock/products'
import { notFound } from 'next/navigation'

vi.mock('@/services/mock/products', () => ({
  getProducts: vi.fn(),
  getProductBySlug: vi.fn(),
}))

vi.mock('next/navigation', () => ({
  notFound: vi.fn(() => {
    throw new Error('NEXT_NOT_FOUND')
  }),
  useRouter: vi.fn(() => ({
    push: vi.fn(),
  })),
}))

describe('ProductPage', () => {
  it('gera params estaticos com os slugs', async () => {
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

    const params = await generateStaticParams()

    expect(params).toEqual([
      { slug: 'espresso-tradicional' },
      { slug: 'latte-baunilha' },
    ])
  })

  it('renderiza detalhes do produto quando encontrado', async () => {
    vi.mocked(getProductBySlug).mockResolvedValue({
      slug: 'espresso-tradicional',
      title: 'Espresso Tradicional',
      shortDescription: 'Café curto',
      description: 'Descrição completa',
      price: 8.5,
      image: '/images/products/espresso-tradicional.png',
      category: 'cafe',
    })

    render(
      await ProductPage({
        params: Promise.resolve({ slug: 'espresso-tradicional' }),
      })
    )

    expect(screen.getByRole('heading', { name: 'Espresso Tradicional' })).toBeInTheDocument()
    expect(screen.getByText('Descrição completa')).toBeInTheDocument()
    expect(screen.getByText(/R\$\s*8,50/)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Comprar' })).toBeInTheDocument()
  })

  it('chama notFound quando o produto nao existe', async () => {
    vi.mocked(getProductBySlug).mockResolvedValue(null)

    await expect(
      ProductPage({ params: Promise.resolve({ slug: 'nao-existe' }) })
    ).rejects.toThrow('NEXT_NOT_FOUND')
    expect(notFound).toHaveBeenCalledTimes(1)
  })
})
