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
    setIsLoggedIn(checkAuth())

    function handleAuthChange() {
      setIsLoggedIn(checkAuth())
    }

    window.addEventListener('auth-change', handleAuthChange)
    window.addEventListener('storage', handleAuthChange)

    return () => {
      window.removeEventListener('auth-change', handleAuthChange)
      window.removeEventListener('storage', handleAuthChange)
    }
  }, [])

  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logo}>
        <span className={styles.logoIcon}>☕</span>
        Cafézin
      </Link>

      <nav className={styles.nav}>
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
