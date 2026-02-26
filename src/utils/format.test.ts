import { formatCurrency } from './format'

describe('formatCurrency', () => {
  it('formata valor inteiro em reais', () => {
    expect(formatCurrency(10)).toBe('R$\u00a010,00')
  })

  it('formata valor com centavos', () => {
    expect(formatCurrency(14.9)).toBe('R$\u00a014,90')
  })

  it('formata zero', () => {
    expect(formatCurrency(0)).toBe('R$\u00a00,00')
  })

  it('formata valores grandes', () => {
    expect(formatCurrency(1250.5)).toBe('R$\u00a01.250,50')
  })
})
