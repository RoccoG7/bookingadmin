import { useState } from 'react'
import type { LucideIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Building2, MapPin, Pencil, Trash2, Tv, Wifi, Wind, WashingMachine, Refrigerator, Utensils, AirVent, Shirt, X } from 'lucide-react'
import heroImage from '../assets/login-hero.png'
import logo from '../assets/globalstay-logo.png'
import '../styles/listings-page.css'
import '../styles/listing-preview-page.css'

const navItems = [
  { label: 'Мои объявления', icon: '▤', active: true },
  { label: 'Бронирования', icon: '⌂' },
  { label: 'Чаты', icon: '●' },
  { label: 'Уведомления', icon: '♟', badge: '2' },
  { label: 'Профиль', icon: '●' },
]

const amenities: Array<[LucideIcon, string]> = [
  [Wifi, 'WiFi'], [Tv, 'Телевизор'], [AirVent, 'Кондиционер'], [Wind, 'Фен'],
  [Shirt, 'Утюг'], [Refrigerator, 'Кухня'], [WashingMachine, 'Стиральная машина'], [Utensils, 'Посуда'],
]

const features = ['Завтраки', 'Бассейн', 'Камин', 'Спортзал', 'Сауна', 'Парковка']

const prices = [
  ['Аренда до 14 дней', '3 500 ₽', '320 ₽', '3 820 ₽'],
  ['Аренда от 14 до 28 дней', '3 100 ₽', '300 ₽', '3 400 ₽'],
  ['Аренда на 28 дней и более', '2 900 ₽', '280 ₽', '3 180 ₽'],
]

const uniquePrices = [
  ['Аренда 14.02.2025', '4 000 ₽', '350 ₽', '4 350 ₽'],
  ['Аренда 01.05.2025', '4 200 ₽', '370 ₽', '4 570 ₽'],
]

export default function ListingPreviewPage() {
  const navigate = useNavigate()
  const [notice, setNotice] = useState('')
  const [isModerationDialogOpen, setIsModerationDialogOpen] = useState(false)

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

      <section className="preview-content" aria-labelledby="preview-title">
        <header className="preview-header">
          <div className="preview-title-wrap">
            <button className="back-button" type="button" onClick={() => navigate('/listings/new/pricing')} aria-label="Вернуться к стоимости">‹</button>
            <h1 id="preview-title">Создание объявления</h1>
          </div>
          <div className="preview-header-actions">
            <button className="round-action" type="button" onClick={() => navigate('/listings/new')} aria-label="Редактировать объявление"><Pencil aria-hidden="true" /></button>
            <button className="round-action" type="button" onClick={() => setNotice('Черновик будет удалён после подтверждения.')} aria-label="Удалить черновик"><Trash2 aria-hidden="true" /></button>
            <button className="archive-button" type="button" onClick={() => setNotice('Объявление сохранено в архив как черновик.')}>Сохранить в архив</button>
            <button className="moderation-button" type="button" onClick={() => setIsModerationDialogOpen(true)}>Отправить на модерацию</button>
          </div>
        </header>

        <article className="listing-preview-card">
          <section className="preview-gallery" aria-label="Фотографии жилья">
            <img className="preview-gallery-main" src={heroImage} alt="Главное фото студии" />
            <div className="preview-gallery-grid">
              <img src={heroImage} alt="Фото студии 2" />
              <img src={heroImage} alt="Фото студии 3" />
              <img src={heroImage} alt="Фото студии 4" />
              <div className="more-photos">+6 фото</div>
            </div>
          </section>

          <section className="preview-details">
            <div>
              <h2>Уютная студия в центре Москвы</h2>
              <div className="preview-meta"><span><MapPin aria-hidden="true" />Москва, ул. Невская 48</span><span><Building2 aria-hidden="true" />Квартира</span></div>
              <p className="preview-description">Современное и комфортное жилье в шаговой доступности от главных достопримечательностей города. В студии есть двуспальная кровать, зона отдыха с диваном, кухня с необходимой техникой и ванная комната. Высокоскоростной Wi‑Fi и круглосуточное заселение сделают ваше пребывание удобным и приятным.</p>
            </div>

            <PreviewTags title="Удобства" items={amenities} withIcons />
            <PreviewTags title="Дополнительные характеристики" items={features.map((name) => [null, name])} />

            <section className="preview-section"><h3>Правила жилья</h3><div className="rules-summary">
              <Summary label="Количество гостей (макс.)" value="4 человека" />
              <Summary label="Проживание с животными" value="Разрешено" />
              <Summary label="Заселение" value="14:00" />
              <Summary label="Выселение" value="12:00" />
            </div></section>

            <section className="instructions-grid">
              <div><h3>Как попасть внутрь</h3><ol><li>Введите код домофона 3486</li><li>Поднимитесь на 4 этаж</li><li>Введите код на двери 846395</li></ol></div>
              <div><h3>Правила проживания</h3><ol><li>Максимум 4 гостя</li><li>Не включать громко музыку или телевизор после 22:00</li><li>Не курить</li><li>Нельзя с животными</li></ol></div>
            </section>

            <PriceSection title="Стоимость жилья за сутки" prices={prices} />
            <PriceSection title="Уникальная стоимость жилья за сутки" prices={uniquePrices} />
          </section>
        </article>
        <p className="preview-notice" role="status" aria-live="polite">{notice}</p>
      </section>
      {isModerationDialogOpen && (
        <div className="moderation-dialog-backdrop" role="presentation" onMouseDown={() => setIsModerationDialogOpen(false)}>
          <section className="moderation-dialog" role="dialog" aria-modal="true" aria-labelledby="moderation-dialog-title" onMouseDown={(event) => event.stopPropagation()}>
            <div className="moderation-dialog-content">
              <div className="moderation-dialog-heading">
                <h2 id="moderation-dialog-title">Объявление отправлено на модерацию</h2>
                <button className="moderation-dialog-close" type="button" onClick={() => setIsModerationDialogOpen(false)} aria-label="Закрыть"><X aria-hidden="true" /></button>
              </div>
              <p>Администратор проверит ваше объявление в течение 24 часов. Вы получите уведомление, когда объявление будет опубликовано.</p>
            </div>
            <button className="moderation-dialog-confirm" type="button" onClick={() => setIsModerationDialogOpen(false)}>Ок</button>
          </section>
        </div>
      )}
    </main>
  )
}

type PreviewTagsProps = { title: string; items: Array<[LucideIcon | null, string]>; withIcons?: boolean }

function PreviewTags({ title, items, withIcons = false }: PreviewTagsProps) {
  return <section className="preview-section"><h3>{title}</h3><div className="preview-tags">{items.map(([Icon, label]) => <span className="preview-tag" key={label}>{withIcons && Icon && <Icon aria-hidden="true" />}{label}</span>)}</div></section>
}

function Summary({ label, value }: { label: string; value: string }) {
  return <div><span>{label}</span><b>{value}</b></div>
}

function PriceSection({ title, prices: entries }: { title: string; prices: string[][] }) {
  return <section className="preview-section"><h3>{title}</h3><div className="preview-prices">{entries.map(([period, clientPrice, commission, total]) => <div className="preview-price-card" key={period}><span>{period}</span><p>Стоимость для клиента: <b>{clientPrice}</b></p><p>Комиссия сервиса: <b>{commission}</b></p><p>Стоимость с комиссией: <b>{total}</b></p></div>)}</div></section>
}
