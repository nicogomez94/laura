import { useMemo, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { menuStructure } from "../data/menu";

function MenuContent({ onItemClick }) {
  return (
    <div className="mega-grid">
      {menuStructure.map((section) => (
        <div key={section.title} className="mega-section">
          <h4>{section.title}</h4>
          {section.items.map((item) => (
            <NavLink key={item.to} to={item.to} onClick={onItemClick}>
              {item.label}
            </NavLink>
          ))}
        </div>
      ))}
    </div>
  );
}

export default function NavBar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const todayLabel = useMemo(() => "Buenos Aires", []);

  return (
    <>
      <header className="hero">
        <div className="hero-overlay" />
        <div className="topbar container">
          <div className="topbar-left">
            <span>in</span>
            <span>fb</span>
            <span>ig</span>
          </div>
          <div className="topbar-right">
            <span>{todayLabel}</span>
            <span>|</span>
            <span>+54 11 4582 9912</span>
          </div>
        </div>

        <nav className="navbar container">
          <Link to="/" className="brand">
            LG<span>PROPIEDADES</span>
          </Link>

          <ul className="nav-links">
            <li>
              <NavLink to="/">Inicio</NavLink>
            </li>
            <li className="mega-trigger">
              <button
                className="mega-toggle"
                onClick={() => setMegaOpen((value) => !value)}
                type="button"
              >
                Menu
              </button>
              {megaOpen ? (
                <div className="mega-panel">
                  <MenuContent onItemClick={() => setMegaOpen(false)} />
                </div>
              ) : null}
            </li>
            <li>
              <NavLink to="/admin/login">Admin</NavLink>
            </li>
          </ul>

          <button
            type="button"
            className="mobile-menu-btn"
            onClick={() => setMobileOpen((value) => !value)}
          >
            Menu
          </button>
        </nav>

        {mobileOpen ? (
          <div className="mobile-panel container">
            <MenuContent onItemClick={() => setMobileOpen(false)} />
          </div>
        ) : null}
      </header>
    </>
  );
}
