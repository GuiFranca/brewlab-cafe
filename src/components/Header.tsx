'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import styles from './Header.module.css'

const AUTH_STORAGE_KEY = 'cafezin_auth'

type AuthSession = {
  email: string
  expiresAt: number
}

function checkAuth(): boolean {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY)
    if (!raw) return false
    const session = JSON.parse(raw) as AuthSession
    return (
      !!session &&
      typeof session.email === 'string' &&
      typeof session.expiresAt === 'number' &&
      session.expiresAt > Date.now()
    )
  } catch {
    return false
  }
}

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const syncAuthState = () => {
      setIsLoggedIn(checkAuth())
    }

    const timeoutId = window.setTimeout(syncAuthState, 0)

    window.addEventListener('auth-change', syncAuthState)
    window.addEventListener('storage', syncAuthState)

    return () => {
      window.clearTimeout(timeoutId)
      window.removeEventListener('auth-change', syncAuthState)
      window.removeEventListener('storage', syncAuthState)
    }
  }, [])

  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logo}>
        <span className={styles.logoIcon}>☕</span>
        Cafézin
      </Link>

      <nav className={styles.nav} aria-label="Navegação principal">
        <Link href="/" className={styles.navLink}>
          Home
        </Link>
        <Link href="/profile" className={styles.navLink}>
          {isLoggedIn ? (
            <>
              <span className={styles.navIcon}>👤</span>
              Perfil
            </>
          ) : (
            <>
              <span className={styles.navIcon}>🔑</span>
              Login
            </>
          )}
        </Link>
      </nav>
    </header>
  )
}
