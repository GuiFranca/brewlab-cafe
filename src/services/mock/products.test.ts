import { getProductBySlug, getProducts, products } from './products'

describe('products service', () => {
  it('retorna todos os produtos', async () => {
    const result = await getProducts()

    expect(result).toHaveLength(products.length)
    expect(result[0]?.slug).toBe(products[0]?.slug)
  })

  it('retorna produto pelo slug', async () => {
    const result = await getProductBySlug('espresso-tradicional')

    expect(result?.title).toBe('Espresso Tradicional')
  })

  it('retorna null para slug inexistente', async () => {
    const result = await getProductBySlug('nao-existe')

    expect(result).toBeNull()
  })
})
