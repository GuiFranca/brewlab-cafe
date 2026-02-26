import '@testing-library/jest-dom'
import { cleanup } from '@testing-library/react'
import React, {
  type AnchorHTMLAttributes,
  type ImgHTMLAttributes,
  type ReactNode,
} from 'react'
import { afterEach, vi } from 'vitest'

afterEach(() => {
  cleanup()
})

vi.mock('next/image', () => ({
  default: (props: ImgHTMLAttributes<HTMLImageElement>) => {
    const { alt = '', ...rest } = props
    return React.createElement('img', { alt, ...rest })
  },
}))

vi.mock('next/link', () => ({
  default: ({
    children,
    href,
    ...props
  }: AnchorHTMLAttributes<HTMLAnchorElement> & { children: ReactNode; href: string }) =>
    React.createElement('a', { href, ...props }, children),
}))
