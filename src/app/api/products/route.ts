import { NextResponse } from 'next/server'
import { products } from '@/services/mock/products'

export async function GET() {
  return NextResponse.json(products)
}
