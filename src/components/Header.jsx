import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'

const NAV_ITEMS = [
  { to: '/', label: '홈' },
  { to: '/survey', label: '자가진단' },
  { to: '/diary', label: '감정일기' },
  { to: '/counseling', label: '상담 연결' },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="header">
      <div className="header-inner">
        <Link to="/" className="logo" onClick={() => setMenuOpen(false)}>
          <span className="logo-icon">🌸</span>
          <span>
            마음봄
            <span className="logo-sub">덕성여대 정신건강 지원</span>
          </span>
        </Link>

        <nav className="nav">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <button
          className="hamburger"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="메뉴 열기"
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <nav className={`mobile-nav${menuOpen ? ' open' : ''}`}>
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}
            onClick={() => setMenuOpen(false)}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </header>
  )
}
