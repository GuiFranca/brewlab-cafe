import { NextResponse } from 'next/server'
import { products } from '@/services/mock/products'

export async function GET(
  request: Request,
  context: { params: Promise<{ slug: string }> }
) {
  const { slug } = await context.params

  const product = products.find(p => p.slug === slug)

  if (!product) {
    return NextResponse.json({ message: 'Not found' }, { status: 404 })
  }

  return NextResponse.json(product)
}
