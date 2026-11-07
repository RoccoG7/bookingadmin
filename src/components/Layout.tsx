import { Link, Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <nav style={{ 
        width: '250px', 
        background: '#1a1a1a', 
        padding: '20px',
        color: 'white'
      }}>
        <h2 style={{ marginBottom: '30px' }}>BookingAdmin</h2>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li style={{ marginBottom: '15px' }}>
            <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
              Панель управления
            </Link>
          </li>
          <li style={{ marginBottom: '15px' }}>
            <Link to="/bookings" style={{ color: 'white', textDecoration: 'none' }}>
              Бронирования
            </Link>
          </li>
          <li style={{ marginBottom: '15px' }}>
            <Link to="/settings" style={{ color: 'white', textDecoration: 'none' }}>
              Настройки
            </Link>
          </li>
        </ul>
      </nav>
      <main style={{ flex: 1, padding: '40px' }}>
        <Outlet />
      </main>
    </div>
  );
}
