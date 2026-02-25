import { NextResponse } from 'next/server'
import { getProducts } from '@/services/mock/products'

export async function GET() {
  const products = await getProducts()
  return NextResponse.json(products)
}
