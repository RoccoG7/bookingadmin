import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CalendarDays, Plus, Trash2 } from 'lucide-react'
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

const pricingPeriods = [
  { id: 'short', label: 'Аренда до 14 дней', value: '3500' },
  { id: 'medium', label: 'Аренда от 14 до 28 дней', value: '3100' },
  { id: 'long', label: 'Аренда на 28 дней и более', value: '2900' },
]

type CustomDatePrice = {
  id: number
  date: string
  price: string
}

function formatRubles(value: string | number) {
  const amount = Number(value)

  return Number.isFinite(amount) && amount > 0
    ? `${new Intl.NumberFormat('ru-RU').format(amount)} ₽`
    : '0 ₽'
}

export default function ListingPricingPage() {
  const navigate = useNavigate()
  const [prices, setPrices] = useState(() => Object.fromEntries(pricingPeriods.map(({ id, value }) => [id, value])))
  const [customPricing, setCustomPricing] = useState(false)
  const [customDatePrices, setCustomDatePrices] = useState<CustomDatePrice[]>([])
  const [notice, setNotice] = useState('')

  const allPricesEntered = pricingPeriods.every(({ id }) => Number(prices[id]) > 0)
  const customPeriodComplete = !customPricing || customDatePrices.length > 0 && customDatePrices.every(({ date, price }) => date && Number(price) > 0)
  const canSubmit = allPricesEntered && customPeriodComplete

  function toggleCustomPricing(enabled: boolean) {
    setCustomPricing(enabled)

    if (enabled && customDatePrices.length === 0) {
      setCustomDatePrices([{ id: Date.now(), date: '', price: '' }])
    }
  }

  function addCustomDatePrice() {
    setCustomDatePrices((current) => [...current, { id: Date.now(), date: '', price: '' }])
  }

  function updateCustomDatePrice(id: number, field: 'date' | 'price', value: string) {
    setCustomDatePrices((current) => current.map((item) => item.id === id ? { ...item, [field]: value } : item))
  }

  function removeCustomDatePrice(id: number) {
    setCustomDatePrices((current) => current.filter((item) => item.id !== id))
  }

  return (
    <main className="listings-page">
      <aside className="sidebar">
        <div className="profile-summary">
          <div className="profile-avatar" aria-hidden="true">ИИ</div>
          <div><strong>Ирина Иванова</strong><span>hello@gmail.com</span></div>
        </div>
        <nav className="sidebar-navigation" aria-label="Основная навигация">
          {navItems.map((item) => (
            <button className={`sidebar-link${item.active ? ' sidebar-link--active' : ''}`} key={item.label} type="button" onClick={() => item.active ? navigate('/') : setNotice(`Раздел «${item.label}» будет добавлен позже.`)}>
              <span className="sidebar-icon" aria-hidden="true">{item.icon}</span><span>{item.label}</span>{item.badge && <span className="notification-badge">{item.badge}</span>}
            </button>
          ))}
        </nav>
        <img className="sidebar-logo" src={logo} alt="GlobalStay" />
      </aside>

      <section className="create-listing-content" aria-labelledby="listing-pricing-title">
        <header className="create-listing-header">
          <button className="back-button" type="button" onClick={() => navigate('/listings/new/additional')} aria-label="Вернуться к дополнительным сведениям">‹</button>
          <h1 id="listing-pricing-title">Создание объявления</h1>
        </header>
        <div className="creation-steps" aria-label="Этапы создания объявления">
          {steps.map((step, index) => <div className={`creation-step${index <= 5 ? ' creation-step--active' : ''}`} key={step}>{index + 1}. {step}</div>)}
        </div>

        <section className="create-listing-card">
          <div className="pricing-step-form">
            <h2>Укажите стоимость жилья за сутки</h2>
            {pricingPeriods.map(({ id, label }) => {
              const price = prices[id]
              const commission = Math.round(Number(price || 0) * 0.1)

              return (
                <div className="price-period" key={id}>
                  <label className="create-field">
                    <span>{label}</span>
                    <span className="currency-input"><input type="number" min="0" inputMode="numeric" value={price} onChange={(event) => setPrices((current) => ({ ...current, [id]: event.target.value }))} aria-label={label} /><b>₽</b></span>
                  </label>
                  <div className="price-calculation">
                    <span>Комиссия сервиса: <b>{formatRubles(commission)}</b></span>
                    <span>Стоимость с учетом комиссии: <b>{formatRubles(Number(price || 0) + commission)}</b></span>
                  </div>
                </div>
              )
            })}

            <label className="custom-pricing-switch">
              <span>Добавить уникальную стоимость для конкретных дат</span>
              <input type="checkbox" checked={customPricing} onChange={(event) => toggleCustomPricing(event.target.checked)} />
              <i aria-hidden="true" />
            </label>

            {customPricing && (
              <section className="custom-pricing" aria-labelledby="custom-pricing-title">
                <h3 id="custom-pricing-title">Укажите даты и уникальную стоимость за сутки</h3>
                {customDatePrices.map((item, index) => {
                  const commission = Math.round(Number(item.price || 0) * 0.1)

                  return (
                    <section className="custom-date-price" key={item.id} aria-label={`Уникальная стоимость: дата ${index + 1}`}>
                      <header>
                        <b>Дата {index + 1}</b>
                        <button type="button" onClick={() => removeCustomDatePrice(item.id)} aria-label={`Удалить дату ${index + 1}`}><Trash2 aria-hidden="true" /></button>
                      </header>
                      <div className="custom-date-price-fields">
                        <label className="create-field">
                          <span>Дата</span>
                          <span className="date-input"><input type="date" value={item.date} onChange={(event) => updateCustomDatePrice(item.id, 'date', event.target.value)} /><CalendarDays aria-hidden="true" /></span>
                        </label>
                        <div>
                          <label className="create-field"><span>Аренда за сутки</span><span className="currency-input"><input type="number" min="0" inputMode="numeric" value={item.price} onChange={(event) => updateCustomDatePrice(item.id, 'price', event.target.value)} aria-label={`Стоимость за сутки на дату ${index + 1}`} /><b>₽</b></span></label>
                          <div className="price-calculation">
                            <span>Комиссия сервиса: <b>{formatRubles(commission)}</b></span>
                            <span>Стоимость с учетом комиссии: <b>{formatRubles(Number(item.price || 0) + commission)}</b></span>
                          </div>
                        </div>
                      </div>
                    </section>
                  )
                })}
                <button className="add-custom-date" type="button" onClick={addCustomDatePrice}><Plus aria-hidden="true" />Добавить еще</button>
              </section>
            )}

            <div className="photo-step-actions pricing-actions">
              <button className="return-button" type="button" onClick={() => navigate('/listings/new/additional')}>Вернуться</button>
              <button className="next-step-button" type="button" disabled={!canSubmit} onClick={() => navigate('/listings/new/preview')}>Далее</button>
            </div>
            <p className="creation-notice" role="status" aria-live="polite">{notice}</p>
          </div>
        </section>
      </section>
    </main>
  )
}
