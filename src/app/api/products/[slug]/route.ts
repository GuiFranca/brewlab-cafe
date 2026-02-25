import { NextResponse } from 'next/server'
import { getProductBySlug } from '@/services/mock/products'

export async function GET(
  request: Request,
  context: { params: Promise<{ slug: string }> }
) {
  void request
  const { slug } = await context.params

  const product = await getProductBySlug(slug)

  if (!product) {
    return NextResponse.json({ message: 'Not found' }, { status: 404 })
  }

  return NextResponse.json(product)
}
