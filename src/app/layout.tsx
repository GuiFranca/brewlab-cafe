import type { Metadata } from 'next'
import Header from '@/components/Header'
import Container from '@/components/Container'
import '@/styles/globals.css'

export const metadata: Metadata = {
  title: 'Cafézin',
  description: 'Desafio Next Zup - Cafézin',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br">
      <body>
        <Header />
        <Container>{children}</Container>
      </body>
    </html>
  )
}
