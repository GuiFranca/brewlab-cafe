import { render, screen } from '@testing-library/react'
import Header from './Header'

describe('Header', () => {
  it('renderiza links de Home e Profile', () => {
    render(<Header />)

    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/')
    expect(screen.getByRole('link', { name: 'Profile' })).toHaveAttribute('href', '/profile')
  })
})
