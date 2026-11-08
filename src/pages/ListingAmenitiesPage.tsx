import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  AirVent,
  Bath,
  CarFront,
  Cigarette,
  Coffee,
  Dumbbell,
  Flame,
  KeyRound,
  Refrigerator,
  Shirt,
  Thermometer,
  Tv,
  Utensils,
  WashingMachine,
  WavesLadder,
  Wifi,
  Wind,
} from 'lucide-react'
import logo from '../assets/globalstay-logo.png'
import '../styles/listings-page.css'
import '../styles/create-listing-page.css'

const steps = ['Описание', 'Фото', 'Удобства', 'Правила', 'Дополнительное', 'Стоимость']

const amenities = [
  { icon: Wifi, name: 'WiFi' },
  { icon: Tv, name: 'Телевизор' },
  { icon: AirVent, name: 'Кондиционер' },
  { icon: Thermometer, name: 'Обогреватель' },
  { icon: Wind, name: 'Фен' },
  { icon: Shirt, name: 'Утюг' },
  { icon: Refrigerator, name: 'Кухня' },
  { icon: WashingMachine, name: 'Стиральная машина' },
  { icon: Utensils, name: 'Посуда' },
]

const features = [
  { icon: Coffee, name: 'Завтраки' },
  { icon: WavesLadder, name: 'Бассейн' },
  { icon: Flame, name: 'Камин' },
  { icon: Cigarette, name: 'Разрешено курение' },
  { icon: Dumbbell, name: 'Спортзал' },
  { icon: KeyRound, name: 'Самостоятельное заселение' },
  { icon: Bath, name: 'Сауна' },
  { icon: CarFront, name: 'Парковка' },
]

const initialAmenities = new Set(['Фен', 'Утюг', 'Стиральная машина'])
const initialFeatures = new Set(['Разрешено курение', 'Самостоятельное заселение'])

const navItems = [
  { label: 'Мои объявления', icon: '▤', active: true },
  { label: 'Бронирования', icon: '⌂' },
  { label: 'Чаты', icon: '●' },
  { label: 'Уведомления', icon: '♟', badge: '2' },
  { label: 'Профиль', icon: '●' },
]

function toggleItem(name: string, selected: Set<string>, setSelected: (items: Set<string>) => void) {
  const next = new Set(selected)

  if (next.has(name)) {
    next.delete(name)
  } else {
    next.add(name)
  }

  setSelected(next)
}

export default function ListingAmenitiesPage() {
  const navigate = useNavigate()
  const [selectedAmenities, setSelectedAmenities] = useState(initialAmenities)
  const [selectedFeatures, setSelectedFeatures] = useState(initialFeatures)
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

      <section className="create-listing-content" aria-labelledby="listing-amenities-title">
        <header className="create-listing-header">
          <button className="back-button" type="button" onClick={() => navigate('/listings/new/photos')} aria-label="Вернуться к фотографиям">‹</button>
          <h1 id="listing-amenities-title">Создание объявления</h1>
        </header>

        <div className="creation-steps" aria-label="Этапы создания объявления">
          {steps.map((step, index) => <div className={`creation-step${index <= 2 ? ' creation-step--active' : ''}`} key={step}>{index + 1}. {step}</div>)}
        </div>

        <section className="create-listing-card">
          <div className="amenities-step-form">
            <h2>Укажите удобства и дополнительные характеристики жилья</h2>

            <section className="amenities-group" aria-labelledby="amenities-heading">
              <h3 id="amenities-heading">Удобства</h3>
              <div className="amenity-tags">
                {amenities.map(({ icon: Icon, name }) => (
                  <button className={`amenity-tag${selectedAmenities.has(name) ? ' amenity-tag--selected' : ''}`} key={name} type="button" aria-pressed={selectedAmenities.has(name)} onClick={() => toggleItem(name, selectedAmenities, setSelectedAmenities)}>
                    <Icon aria-hidden="true" />{name}
                  </button>
                ))}
              </div>
            </section>

            <section className="amenities-group" aria-labelledby="features-heading">
              <h3 id="features-heading">Дополнительные характеристики</h3>
              <div className="amenity-tags">
                {features.map(({ icon: Icon, name }) => (
                  <button className={`amenity-tag${selectedFeatures.has(name) ? ' amenity-tag--selected' : ''}`} key={name} type="button" aria-pressed={selectedFeatures.has(name)} onClick={() => toggleItem(name, selectedFeatures, setSelectedFeatures)}>
                    <Icon aria-hidden="true" />{name}
                  </button>
                ))}
              </div>
            </section>

            <div className="photo-step-actions amenities-actions">
              <button className="return-button" type="button" onClick={() => navigate('/listings/new/photos')}>Вернуться</button>
              <button className="next-step-button" type="button" onClick={() => navigate('/listings/new/rules')}>Далее</button>
            </div>
            <p className="creation-notice" role="status" aria-live="polite">{notice}</p>
          </div>
        </section>
      </section>
    </main>
  )
}
