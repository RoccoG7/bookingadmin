import { useState } from 'react'
import type { FormEvent } from 'react'
import heroImage from '../assets/login-hero.png'
import logo from '../assets/globalstay-logo.png'
import '../styles/login-page.css'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [message, setMessage] = useState('')

  const canSubmit = email.trim().length > 0 && password.length > 0

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (canSubmit) {
      setMessage('Авторизация будет подключена после настройки сервера.')
    }
  }

  return (
    <main className="login-page">
      <a className="login-logo" href="/" aria-label="GlobalStay">
        <img src={logo} alt="GlobalStay" />
      </a>

      <section className="login-form-section" aria-labelledby="login-title">
        <form className="login-form" onSubmit={handleSubmit}>
          <h1 id="login-title">Войти</h1>

          <div className="login-fields">
            <label className="login-field">
              <span>Email</span>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Введите email"
                autoComplete="email"
                required
              />
            </label>

            <div className="password-group">
              <label className="login-field">
                <span>Пароль</span>
                <div className="password-input-wrap">
                  <input
                    type={isPasswordVisible ? 'text' : 'password'}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Введите пароль"
                    autoComplete="current-password"
                    required
                  />
                  <button
                    className="password-visibility"
                    type="button"
                    onClick={() => setIsPasswordVisible((value) => !value)}
                    aria-label={isPasswordVisible ? 'Скрыть пароль' : 'Показать пароль'}
                  >
                    {isPasswordVisible ? 'Скрыть' : 'Показать'}
                  </button>
                </div>
              </label>
              <a className="login-link forgotten-password" href="#forgot-password">
                Забыли пароль?
              </a>
            </div>
          </div>

          <div className="login-actions">
            <button className="login-submit" type="submit" disabled={!canSubmit}>
              Начать работу
            </button>
            <p>
              Нет аккаунта? <a className="login-link" href="#sign-up">Создать аккаунт</a>
            </p>
          </div>

          <p className="login-feedback" role="status" aria-live="polite">
            {message}
          </p>
        </form>
      </section>

      <aside className="login-visual" aria-hidden="true">
        <img src={heroImage} alt="" />
      </aside>

      <p className="login-terms">
        Продолжая, Вы соглашаетесь с{' '}
        <a href="#terms">Условиями использования</a> и{' '}
        <a href="#privacy">Политикой конфиденциальности</a>
      </p>
    </main>
  )
}
