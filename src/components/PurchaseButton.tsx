'use client'

import { useRouter } from 'next/navigation'

type PurchaseButtonProps = {
  className?: string
}

export default function PurchaseButton({ className }: PurchaseButtonProps) {
  const router = useRouter()

  function handleBuy() {
    router.push('/')
  }

  return (
    <button type="button" className={className} onClick={handleBuy}>
      Comprar
    </button>
  )
}
