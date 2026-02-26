'use client'

import { useEffect, useRef, useState } from 'react'
import styles from './page.module.css'

type UserProfile = {
  name: string
  email: string
  city: string
  favoriteDrink: string
}

type AuthStatus = 'checking' | 'guest' | 'authenticated'
type SaveStatus = 'idle' | 'saving' | 'success' | 'error'
type FieldErrors = Partial<Record<keyof UserProfile, string>>

type AuthSession = {
  email: string
  expiresAt: number
}

const AUTH_STORAGE_KEY = 'cafezin_auth'
const PROFILE_STORAGE_KEY = 'cafezin_profile'
const AUTH_TTL_MS = 24 * 60 * 60 * 1000

const DEFAULT_PROFILE: UserProfile = {
  name: 'Guilherme',
  email: 'gui@email.com',
  city: 'Capivari',
  favoriteDrink: 'Espresso'
}

function isValidEmail(value: string) {
  return /.+@.+\..+/.test(value)
}

function validateProfile(profile: UserProfile): FieldErrors {
  const errors: FieldErrors = {}

  if (profile.name.trim().length < 2) {
    errors.name = 'Informe um nome com ao menos 2 caracteres.'
  }

  if (!isValidEmail(profile.email)) {
    errors.email = 'Informe um email valido.'
  }

  if (profile.city.trim().length < 2) {
    errors.city = 'Informe uma cidade valida.'
  }

  if (profile.favoriteDrink.trim().length < 2) {
    errors.favoriteDrink = 'Informe a bebida favorita.'
  }

  return errors
}

export default function ProfilePage() {
  const [authStatus, setAuthStatus] = useState<AuthStatus>('checking')
  const [sessionExpiresAt, setSessionExpiresAt] = useState<number | null>(null)
  const [profile, setProfile] = useState<UserProfile>(DEFAULT_PROFILE)
  const [draftProfile, setDraftProfile] = useState<UserProfile>(DEFAULT_PROFILE)
  const [isEditing, setIsEditing] = useState(false)
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('idle')
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const [feedback, setFeedback] = useState('')
  const [loginEmail, setLoginEmail] = useState(DEFAULT_PROFILE.email)
  const [loginPassword, setLoginPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [isLoginLoading, setIsLoginLoading] = useState(false)
  const nameInputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const profileRaw = localStorage.getItem(PROFILE_STORAGE_KEY)
        if (profileRaw) {
          const parsed = JSON.parse(profileRaw) as UserProfile
          if (
            parsed &&
            typeof parsed.name === 'string' &&
            typeof parsed.email === 'string' &&
            typeof parsed.city === 'string' &&
            typeof parsed.favoriteDrink === 'string'
          ) {
            setProfile(parsed)
            setDraftProfile(parsed)
            setLoginEmail(parsed.email)
          }
        }

        const sessionRaw = localStorage.getItem(AUTH_STORAGE_KEY)
        if (!sessionRaw) {
          setAuthStatus('guest')
          return
        }

        const parsedSession = JSON.parse(sessionRaw) as AuthSession
        const isValidSession =
          parsedSession &&
          typeof parsedSession.email === 'string' &&
          typeof parsedSession.expiresAt === 'number' &&
          parsedSession.expiresAt > Date.now()

        if (isValidSession) {
          setLoginEmail(parsedSession.email)
          setSessionExpiresAt(parsedSession.expiresAt)
          setAuthStatus('authenticated')
        } else {
          localStorage.removeItem(AUTH_STORAGE_KEY)
          setAuthStatus('guest')
        }
      } catch {
        setAuthStatus('guest')
      }
    }, 0)

    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (isEditing) {
      nameInputRef.current?.focus()
    }
  }, [isEditing])

  useEffect(() => {
    if (!isEditing) {
      return
    }

    function onKeydown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setDraftProfile(profile)
        setFieldErrors({})
        setSaveStatus('idle')
        setFeedback('Edicao cancelada.')
        setIsEditing(false)
      }
    }

    window.addEventListener('keydown', onKeydown)
    return () => window.removeEventListener('keydown', onKeydown)
  }, [isEditing, profile])

  function handleDraftChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const field = e.target.name as keyof UserProfile
    const value = e.target.value

    setDraftProfile(prev => ({
      ...prev,
      [field]: value
    }))

    setFieldErrors(prev => {
      if (!prev[field]) {
        return prev
      }

      const next = { ...prev }
      delete next[field]
      return next
    })
  }

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoginError('')
    setFeedback('')

    if (!isValidEmail(loginEmail) || loginPassword.trim().length < 4) {
      setLoginError('Informe email valido e senha com no minimo 4 caracteres.')
      return
    }

    setIsLoginLoading(true)
    await new Promise(resolve => setTimeout(resolve, 900))

    if (Math.random() < 0.15) {
      setLoginError('Falha temporaria ao autenticar. Tente novamente.')
      setIsLoginLoading(false)
      return
    }

    const session: AuthSession = {
      email: loginEmail,
      expiresAt: Date.now() + AUTH_TTL_MS
    }

    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session))
    setSessionExpiresAt(session.expiresAt)
    setAuthStatus('authenticated')
    setIsLoginLoading(false)
    setLoginPassword('')
    setFeedback('Login realizado com sucesso.')
  }

  function handleLogout() {
    localStorage.removeItem(AUTH_STORAGE_KEY)
    setAuthStatus('guest')
    setSessionExpiresAt(null)
    setIsEditing(false)
    setSaveStatus('idle')
    setFeedback('Sessao encerrada.')
  }

  function handleStartEditing() {
    setDraftProfile(profile)
    setFieldErrors({})
    setSaveStatus('idle')
    setFeedback('')
    setIsEditing(true)
  }

  function handleCancelEditing() {
    setDraftProfile(profile)
    setFieldErrors({})
    setSaveStatus('idle')
    setFeedback('Edicao cancelada.')
    setIsEditing(false)
  }

  async function handleSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const errors = validateProfile(draftProfile)

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors)
      setSaveStatus('idle')
      return
    }

    setSaveStatus('saving')
    setFeedback('')
    await new Promise(resolve => setTimeout(resolve, 1200))

    if (Math.random() < 0.2) {
      setSaveStatus('error')
      setFeedback('Nao foi possivel salvar agora. Tente novamente.')
      return
    }

    setProfile(draftProfile)
    localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(draftProfile))
    setSaveStatus('success')
    setFeedback('Dados atualizados com sucesso.')
    setIsEditing(false)
  }

  const expiresAtLabel = sessionExpiresAt
    ? new Date(sessionExpiresAt).toLocaleString('pt-BR')
    : null

  const isAuthenticated = authStatus === 'authenticated'

  const saveButtonLabel =
    saveStatus === 'saving'
      ? 'Salvando...'
      : saveStatus === 'error'
        ? 'Tentar novamente'
        : 'Salvar alteracoes'

  const hasError = (field: keyof UserProfile) => Boolean(fieldErrors[field])

  const canEdit = isAuthenticated && isEditing

  function getFieldErrorId(field: keyof UserProfile) {
    return `${field}-error`
  }

  return (
    <main className={styles.page}>
      <h1 className={styles.title}>Perfil do Usuario</h1>
      <p className={styles.subtitle}>
        Conteudo personalizado em CSR com autenticacao simulada via estado local.
      </p>

      {authStatus === 'checking' && (
        <p role="status" aria-live="polite" className={styles.status}>
          Carregando sessao...
        </p>
      )}

      {authStatus === 'guest' && (
        <section className={styles.card}>
          <h2 className={styles.sectionTitle}>Acessar conta</h2>
          <form className={styles.form} onSubmit={handleLogin}>
            <label htmlFor="loginEmail">Email</label>
            <input
              id="loginEmail"
              name="loginEmail"
              type="email"
              autoComplete="email"
              value={loginEmail}
              onChange={e => setLoginEmail(e.target.value)}
              placeholder="voce@email.com"
            />

            <label htmlFor="loginPassword">Senha</label>
            <input
              id="loginPassword"
              name="loginPassword"
              type="password"
              autoComplete="current-password"
              value={loginPassword}
              onChange={e => setLoginPassword(e.target.value)}
              placeholder="********"
            />

            <button
              type="submit"
              className={styles.authButton}
              disabled={isLoginLoading}
            >
              {isLoginLoading ? 'Entrando...' : 'Entrar'}
            </button>

            {loginError && (
              <p role="alert" className={styles.errorMessage}>
                {loginError}
              </p>
            )}
          </form>
        </section>
      )}

      {isAuthenticated && (
        <section className={styles.card}>
          <div className={styles.header}>
            <h2 className={styles.sectionTitle}>Minha conta</h2>
            <div className={styles.actions}>
              {!isEditing && (
                <button
                  type="button"
                  className={styles.secondaryButton}
                  onClick={handleStartEditing}
                >
                  Editar perfil
                </button>
              )}
              {isEditing && (
                <button
                  type="button"
                  className={styles.secondaryButton}
                  onClick={handleCancelEditing}
                >
                  Cancelar
                </button>
              )}
              <button
                type="button"
                className={styles.authButton}
                onClick={handleLogout}
              >
                Sair
              </button>
            </div>
          </div>

          <p className={styles.status}>Status: Autenticado</p>
          {expiresAtLabel && (
            <p className={styles.sessionInfo}>
              Sessao ativa ate: {expiresAtLabel}
            </p>
          )}

          <div className={styles.highlights}>
            <article className={styles.highlightCard}>
              <span>Pontos fidelidade</span>
              <strong>128</strong>
            </article>
            <article className={styles.highlightCard}>
              <span>Ultimo pedido</span>
              <strong>Mocha Chocolate</strong>
            </article>
          </div>

          {!isEditing && (
            <dl className={styles.infoList}>
              <div>
                <dt>Nome</dt>
                <dd>{profile.name}</dd>
              </div>
              <div>
                <dt>Email</dt>
                <dd>{profile.email}</dd>
              </div>
              <div>
                <dt>Cidade</dt>
                <dd>{profile.city}</dd>
              </div>
              <div>
                <dt>Bebida favorita</dt>
                <dd>{profile.favoriteDrink}</dd>
              </div>
            </dl>
          )}

          {isEditing && (
            <form className={styles.form} onSubmit={handleSave}>
              <fieldset className={styles.fieldset}>
                <legend>Editar dados</legend>

                <label htmlFor="name">Nome</label>
                <input
                  ref={nameInputRef}
                  id="name"
                  name="name"
                  value={draftProfile.name}
                  onChange={handleDraftChange}
                  placeholder="Nome"
                  autoComplete="name"
                  aria-invalid={hasError('name')}
                  aria-describedby={
                    hasError('name') ? getFieldErrorId('name') : undefined
                  }
                />
                {fieldErrors.name && (
                  <p
                    id={getFieldErrorId('name')}
                    role="alert"
                    className={styles.fieldError}
                  >
                    {fieldErrors.name}
                  </p>
                )}

                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  value={draftProfile.email}
                  onChange={handleDraftChange}
                  placeholder="Email"
                  type="email"
                  autoComplete="email"
                  aria-invalid={hasError('email')}
                  aria-describedby={
                    hasError('email') ? getFieldErrorId('email') : undefined
                  }
                />
                {fieldErrors.email && (
                  <p
                    id={getFieldErrorId('email')}
                    role="alert"
                    className={styles.fieldError}
                  >
                    {fieldErrors.email}
                  </p>
                )}

                <label htmlFor="city">Cidade</label>
                <input
                  id="city"
                  name="city"
                  value={draftProfile.city}
                  onChange={handleDraftChange}
                  placeholder="Cidade"
                  aria-invalid={hasError('city')}
                  aria-describedby={
                    hasError('city') ? getFieldErrorId('city') : undefined
                  }
                />
                {fieldErrors.city && (
                  <p
                    id={getFieldErrorId('city')}
                    role="alert"
                    className={styles.fieldError}
                  >
                    {fieldErrors.city}
                  </p>
                )}

                <label htmlFor="favoriteDrink">Bebida favorita</label>
                <input
                  id="favoriteDrink"
                  name="favoriteDrink"
                  value={draftProfile.favoriteDrink}
                  onChange={handleDraftChange}
                  placeholder="Bebida favorita"
                  aria-invalid={hasError('favoriteDrink')}
                  aria-describedby={
                    hasError('favoriteDrink')
                      ? getFieldErrorId('favoriteDrink')
                      : undefined
                  }
                />
                {fieldErrors.favoriteDrink && (
                  <p
                    id={getFieldErrorId('favoriteDrink')}
                    role="alert"
                    className={styles.fieldError}
                  >
                    {fieldErrors.favoriteDrink}
                  </p>
                )}
              </fieldset>

              <button
                type="submit"
                className={styles.saveButton}
                disabled={!canEdit || saveStatus === 'saving'}
              >
                {saveButtonLabel}
              </button>
            </form>
          )}
        </section>
      )}

      {feedback && (
        <p role="status" aria-live="polite" className={styles.message}>
          {feedback}
        </p>
      )}
    </main>
  )
}
