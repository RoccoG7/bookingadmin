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

export default function ListingAdditionalPage() {
  const navigate = useNavigate()
  const [entryInstructions, setEntryInstructions] = useState('')
  const [houseRules, setHouseRules] = useState('')
  const [additionalInfo, setAdditionalInfo] = useState('')
  const [notice, setNotice] = useState('')

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

      <section className="create-listing-content" aria-labelledby="listing-additional-title">
        <header className="create-listing-header">
          <button className="back-button" type="button" onClick={() => navigate('/listings/new/rules')} aria-label="Вернуться к правилам">‹</button>
          <h1 id="listing-additional-title">Создание объявления</h1>
        </header>

        <div className="creation-steps" aria-label="Этапы создания объявления">
          {steps.map((step, index) => <div className={`creation-step${index <= 4 ? ' creation-step--active' : ''}`} key={step}>{index + 1}. {step}</div>)}
        </div>

        <section className="create-listing-card">
          <div className="additional-step-form">
            <h2>Укажите дополнительные сведения</h2>
            <TextAreaField label="Инструкция, как попасть внутрь" placeholder="Опишите, как попасть в жилье" value={entryInstructions} onChange={setEntryInstructions} />
            <TextAreaField label="Правила проживания" placeholder="Укажите правила проживания" value={houseRules} onChange={setHouseRules} />
            <TextAreaField label="Дополнительная информация" placeholder="Укажите дополнительную информацию" value={additionalInfo} onChange={setAdditionalInfo} />

            <div className="photo-step-actions additional-actions">
              <button className="return-button" type="button" onClick={() => navigate('/listings/new/rules')}>Вернуться</button>
              <button className="next-step-button" type="button" onClick={() => navigate('/listings/new/pricing')}>Далее</button>
            </div>
            <p className="creation-notice" role="status" aria-live="polite">{notice}</p>
          </div>
        </section>
      </section>
    </main>
  )
}

type TextAreaFieldProps = {
  label: string
  placeholder: string
  value: string
  onChange: (value: string) => void
}

function TextAreaField({ label, placeholder, value, onChange }: TextAreaFieldProps) {
  return (
    <label className="additional-field">
      <span>{label}</span>
      <textarea value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} maxLength={500} />
      <small>{value.length}/500</small>
    </label>
  )
}
