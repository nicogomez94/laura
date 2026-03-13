import { useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { menuStructure } from "../data/menu";
import Footer from "./Footer";

function MobileMenu({ onClose }) {
  return (
    <div className="mobile-panel container">
      <div className="mega-grid">
        {menuStructure.map((section) => (
          <div key={section.title} className="mega-section">
            <h4>{section.title}</h4>
            {section.items.map((item) => (
              <NavLink key={item.to} to={item.to} onClick={onClose}>
                {item.label}
              </NavLink>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function NavContent({ mobileOpen, setMobileOpen }) {
  return (
    <>
      <div className="topbar container">
        <div className="topbar-left">
          <span>in</span>
          <span>fb</span>
          <span>ig</span>
        </div>
        <div className="topbar-right">
          <span>Buenos Aires</span>
          <span>|</span>
          <span>+54 11 4582 9912</span>
        </div>
      </div>

      <nav className="navbar container">
        <Link to="/" className="brand">
          LG<span>PROPIEDADES</span>
        </Link>

        <ul className="nav-links">
          <li><NavLink to="/">Inicio</NavLink></li>
          <li><NavLink to="/propiedades/en-venta">Propiedades</NavLink></li>
          {/* <li><NavLink to="/sucursales">Zonas</NavLink></li> */}
          <li><NavLink to="/tasaciones">Servicios</NavLink></li>
          <li><NavLink to="/nosotros">Nosotros</NavLink></li>
          <li><NavLink to="/contacto">Contacto</NavLink></li>
        </ul>

        <NavLink to="/tasaciones" className="cta-small">TASAR PROPIEDAD</NavLink>

        <button
          type="button"
          className="mobile-menu-btn"
          onClick={() => setMobileOpen((v) => !v)}
        >
          ☰
        </button>
      </nav>

      {mobileOpen ? (
        <MobileMenu onClose={() => setMobileOpen(false)} />
      ) : null}
    </>
  );
}

/** Used as layout route for the home page — hero background wraps nav + page content */
export function HeroNavBar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <>
      <div className="hero">
        <div className="hero-overlay" />
        <NavContent mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

/** Used as layout route for all other pages — plain dark header */
export default function NavBar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <>
      <header className="site-header">
        <NavContent mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      </header>
      <Outlet />
      <Footer />
    </>
  );
}
