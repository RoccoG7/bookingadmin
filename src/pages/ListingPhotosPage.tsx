import { useEffect, useRef, useState } from 'react'
import type { ChangeEvent } from 'react'
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

type Preview = {
  id: string
  url: string
}

export default function ListingPhotosPage() {
  const navigate = useNavigate()
  const [previews, setPreviews] = useState<Preview[]>([])
  const [notice, setNotice] = useState('')
  const previewsRef = useRef<Preview[]>([])

  useEffect(() => {
    previewsRef.current = previews
  }, [previews])

  useEffect(() => () => previewsRef.current.forEach((preview) => URL.revokeObjectURL(preview.url)), [])

  function handleFiles(event: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files ?? [])
    const availableSlots = Math.max(0, 9 - previews.length)
    const addedPreviews = files.slice(0, availableSlots).map((file) => ({
      id: `${file.name}-${file.lastModified}-${crypto.randomUUID()}`,
      url: URL.createObjectURL(file),
    }))

    setPreviews((current) => [...current, ...addedPreviews])
    event.target.value = ''
  }

  function removePreview(id: string) {
    setPreviews((current) => {
      const removed = current.find((preview) => preview.id === id)

      if (removed) {
        URL.revokeObjectURL(removed.url)
      }

      return current.filter((preview) => preview.id !== id)
    })
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

      <section className="create-listing-content" aria-labelledby="listing-photos-title">
        <header className="create-listing-header">
          <button className="back-button" type="button" onClick={() => navigate('/listings/new')} aria-label="Вернуться к описанию">
            ‹
          </button>
          <h1 id="listing-photos-title">Создание объявления</h1>
        </header>

        <div className="creation-steps" aria-label="Этапы создания объявления">
          {steps.map((step, index) => (
            <div className={`creation-step${index <= 1 ? ' creation-step--active' : ''}`} key={step}>
              {index + 1}. {step}
            </div>
          ))}
        </div>

        <section className="create-listing-card">
          <div className="photo-step-form">
            <div className="photo-step-heading">
              <h2>Добавьте фото жилья</h2>
              <p>Минимум 6 фото</p>
            </div>

            <input className="photo-input" id="property-photos" type="file" accept="image/*" multiple onChange={handleFiles} />
            <div className="photo-grid">
              <label className="photo-upload photo-upload--main" htmlFor="property-photos">
                {previews[0] ? <img src={previews[0].url} alt="Главное фото жилья" /> : <span>+</span>}
              </label>
              {Array.from({ length: 8 }, (_, index) => {
                const preview = previews[index + 1]

                return (
                  <div className="photo-upload photo-upload--small" key={preview?.id ?? `empty-${index}`}>
                    {preview ? (
                      <>
                        <img src={preview.url} alt={`Фото жилья ${index + 2}`} />
                        <button type="button" onClick={() => removePreview(preview.id)} aria-label={`Удалить фото ${index + 2}`}>×</button>
                      </>
                    ) : (
                      <label htmlFor="property-photos" aria-label="Добавить фото">+</label>
                    )}
                  </div>
                )
              })}
            </div>

            <div className="photo-step-actions">
              <button className="return-button" type="button" onClick={() => navigate('/listings/new')}>Вернуться</button>
              <button className="next-step-button" type="button" disabled={previews.length < 6} onClick={() => navigate('/listings/new/amenities')}>
                Далее
              </button>
            </div>
            <p className="creation-notice" role="status" aria-live="polite">{notice}</p>
          </div>
        </section>
      </section>
    </main>
  )
}
