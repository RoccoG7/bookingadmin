import { useState } from 'react'
import type { FormEvent } from 'react'
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

export default function CreateListingPage() {
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [address, setAddress] = useState('')
  const [propertyType, setPropertyType] = useState('')
  const [description, setDescription] = useState('')
  const [notice, setNotice] = useState('')

  const canContinue = Boolean(title.trim() && address.trim() && propertyType && description.trim())

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (canContinue) {
      navigate('/listings/new/photos')
    }
  }

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
            <button
              className={`sidebar-link${item.active ? ' sidebar-link--active' : ''}`}
              key={item.label}
              type="button"
              onClick={() => item.active ? navigate('/') : setNotice(`Раздел «${item.label}» будет добавлен позже.`)}
            >
              <span className="sidebar-icon" aria-hidden="true">{item.icon}</span>
              <span>{item.label}</span>
              {item.badge && <span className="notification-badge">{item.badge}</span>}
            </button>
          ))}
        </nav>

        <img className="sidebar-logo" src={logo} alt="GlobalStay" />
      </aside>

      <section className="create-listing-content" aria-labelledby="create-listing-title">
        <header className="create-listing-header">
          <button className="back-button" type="button" onClick={() => navigate('/')} aria-label="Вернуться к объявлениям">
            ‹
          </button>
          <h1 id="create-listing-title">Создание объявления</h1>
        </header>

        <div className="creation-steps" aria-label="Этапы создания объявления">
          {steps.map((step, index) => (
            <div className={`creation-step${index === 0 ? ' creation-step--active' : ''}`} key={step}>
              {index + 1}. {step}
            </div>
          ))}
        </div>

        <section className="create-listing-card">
          <form className="create-listing-form" onSubmit={handleSubmit}>
            <h2>Заполните сведения о жилье</h2>

            <label className="create-field">
              <span>Название</span>
              <input
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="Введите название объявления"
                maxLength={100}
                required
              />
            </label>

            <label className="create-field">
              <span>Адрес</span>
              <input
                value={address}
                onChange={(event) => setAddress(event.target.value)}
                placeholder="Введите адрес жилья"
                required
              />
            </label>

            <label className="create-field">
              <span>Вид жилья</span>
              <select value={propertyType} onChange={(event) => setPropertyType(event.target.value)} required>
                <option value="" disabled>Укажите вид жилья</option>
                <option value="apartment">Квартира</option>
                <option value="house">Дом</option>
                <option value="room">Комната</option>
                <option value="hotel">Апартаменты</option>
              </select>
            </label>

            <label className="create-field create-field--description">
              <span>Описание</span>
              <textarea
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                placeholder="Добавьте описание жилья"
                maxLength={500}
                required
              />
              <small>{description.length}/500</small>
            </label>

            <button className="next-step-button" type="submit" disabled={!canContinue}>Далее</button>
            <p className="creation-notice" role="status" aria-live="polite">{notice}</p>
          </form>
        </section>
      </section>
    </main>
  )
}
