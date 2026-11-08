import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import emptyListings from '../assets/empty-listings.png'
import logo from '../assets/globalstay-logo.png'
import '../styles/listings-page.css'

type Tab = 'all' | 'published' | 'moderation' | 'archive'

const tabs: Array<{ id: Tab; label: string }> = [
  { id: 'all', label: 'Все объявления' },
  { id: 'published', label: 'Опубликованы' },
  { id: 'moderation', label: 'На модерации' },
  { id: 'archive', label: 'Архив' },
]

const navItems = [
  { label: 'Мои объявления', icon: '▤', active: true },
  { label: 'Бронирования', icon: '⌂' },
  { label: 'Чаты', icon: '●' },
  { label: 'Уведомления', icon: '♟', badge: '2' },
  { label: 'Профиль', icon: '●' },
]

export default function ListingsPage() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<Tab>('all')
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
            <button
              className={`sidebar-link${item.active ? ' sidebar-link--active' : ''}`}
              key={item.label}
              type="button"
              onClick={() => !item.active && setNotice(`Раздел «${item.label}» будет добавлен позже.`)}
            >
              <span className="sidebar-icon" aria-hidden="true">{item.icon}</span>
              <span>{item.label}</span>
              {item.badge && <span className="notification-badge">{item.badge}</span>}
            </button>
          ))}
        </nav>

        <img className="sidebar-logo" src={logo} alt="GlobalStay" />
      </aside>

      <section className="listings-content" aria-labelledby="listings-title">
        <header className="listings-header">
          <h1 id="listings-title">Мои объявления</h1>
          <button className="create-listing" type="button" onClick={() => navigate('/listings/new')}>
            Создать объявление
          </button>
        </header>

        <div className="listings-tabs" role="tablist" aria-label="Статус объявлений">
          {tabs.map((tab) => (
            <button
              className={`listing-tab${activeTab === tab.id ? ' listing-tab--active' : ''}`}
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <section className="empty-listings" aria-live="polite">
          <div className="empty-listings-inner">
            <img src={emptyListings} alt="" />
            <div>
              <h2>Нет объявлений</h2>
              <p>Создайте свое первое объявление о жилье!</p>
            </div>
          </div>
        </section>

        <p className="listings-notice" role="status" aria-live="polite">{notice}</p>
      </section>
    </main>
  )
}
