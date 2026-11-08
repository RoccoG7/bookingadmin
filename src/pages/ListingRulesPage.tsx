import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../assets/globalstay-logo.png'
import '../styles/listings-page.css'
import '../styles/create-listing-page.css'

const steps = ['Описание', 'Фото', 'Удобства', 'Правила', 'Дополнительное', 'Стоимость']

const navItems = [
  { label: 'Мои объявления', icon: '▤', active: true },
  { label: 'Бронирования', icon: '⌂' },
  { label: 'Чаты', icon: '●' },
  { label: 'Уведомления', icon: '♟', badge: '2' },
  { label: 'Профиль', icon: '●' },
]

export default function ListingRulesPage() {
  const navigate = useNavigate()
  const [guestCount, setGuestCount] = useState('')
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [petsAllowed, setPetsAllowed] = useState(false)
  const [cancellationAllowed, setCancellationAllowed] = useState(false)
  const [notice, setNotice] = useState('')

  const canContinue = Number(guestCount) > 0 && Boolean(checkIn && checkOut)

  return (
    <main className="listings-page">
      <aside className="sidebar">
        <div className="profile-summary">
          <div className="profile-avatar" aria-hidden="true">ИИ</div>
          <div>
            <strong>Ирина Иванова</strong>
            <span>hello@gmail.com</span>
          </div>
        </div>
        <nav className="sidebar-navigation" aria-label="Основная навигация">
          {navItems.map((item) => (
            <button className={`sidebar-link${item.active ? ' sidebar-link--active' : ''}`} key={item.label} type="button" onClick={() => item.active ? navigate('/') : setNotice(`Раздел «${item.label}» будет добавлен позже.`)}>
              <span className="sidebar-icon" aria-hidden="true">{item.icon}</span>
              <span>{item.label}</span>
              {item.badge && <span className="notification-badge">{item.badge}</span>}
            </button>
          ))}
        </nav>
        <img className="sidebar-logo" src={logo} alt="GlobalStay" />
      </aside>

      <section className="create-listing-content" aria-labelledby="listing-rules-title">
        <header className="create-listing-header">
          <button className="back-button" type="button" onClick={() => navigate('/listings/new/amenities')} aria-label="Вернуться к удобствам">‹</button>
          <h1 id="listing-rules-title">Создание объявления</h1>
        </header>

        <div className="creation-steps" aria-label="Этапы создания объявления">
          {steps.map((step, index) => <div className={`creation-step${index <= 3 ? ' creation-step--active' : ''}`} key={step}>{index + 1}. {step}</div>)}
        </div>

        <section className="create-listing-card">
          <div className="rules-step-form">
            <h2>Укажите правила жилья</h2>
            <label className="create-field">
              <span>Количество гостей</span>
              <input type="number" min="1" value={guestCount} onChange={(event) => setGuestCount(event.target.value)} placeholder="Введите максимальное количество гостей" required />
            </label>

            <div className="rules-time-fields">
              <label className="create-field">
                <span>Время заселения</span>
                <input type="time" value={checkIn} onChange={(event) => setCheckIn(event.target.value)} required />
              </label>
              <label className="create-field">
                <span>Время выселения</span>
                <input type="time" value={checkOut} onChange={(event) => setCheckOut(event.target.value)} required />
              </label>
            </div>

            <div className="rules-toggles">
              <label className="rules-toggle">
                <input type="checkbox" checked={petsAllowed} onChange={(event) => setPetsAllowed(event.target.checked)} />
                <span aria-hidden="true" />
                Можно с животными
              </label>
              <label className="rules-toggle">
                <input type="checkbox" checked={cancellationAllowed} onChange={(event) => setCancellationAllowed(event.target.checked)} />
                <span aria-hidden="true" />
                Можно отменять бронирование
              </label>
            </div>

            <div className="photo-step-actions rules-actions">
              <button className="return-button" type="button" onClick={() => navigate('/listings/new/amenities')}>Вернуться</button>
              <button className="next-step-button" type="button" disabled={!canContinue} onClick={() => navigate('/listings/new/additional')}>Далее</button>
            </div>
            <p className="creation-notice" role="status" aria-live="polite">{notice}</p>
          </div>
        </section>
      </section>
    </main>
  )
}
