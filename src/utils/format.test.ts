import { describe, it, expect } from 'vitest'
import { formatCurrency } from './format'

describe('formatCurrency', () => {
  it('should format a number as BRL currency', () => {
    // Intl.NumberFormat uses non-breaking space (\u00A0)
    expect(formatCurrency(10)).toBe('R$\u00A010,00')
    expect(formatCurrency(1234.56)).toBe('R$\u00A01.234,56')
  })

  it('should format zero correctly', () => {
    expect(formatCurrency(0)).toBe('R$\u00A00,00')
  })

  it('should handle negative numbers', () => {
    expect(formatCurrency(-50)).toBe('-R$\u00A050,00')
  })
})
