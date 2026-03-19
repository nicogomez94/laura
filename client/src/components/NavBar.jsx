import { useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import Footer from "./Footer";

function MobileMenu({ onClose }) {
  const links = [
    { to: "/", label: "Inicio" },
    { to: "/propiedades/en-venta", label: "Propiedades" },
    { to: "/servicios", label: "Servicios" },
    { to: "/nosotros", label: "Nosotros" },
    { to: "/contacto", label: "Contacto" },
  ];
  return (
    <div className="mobile-overlay">
      <button type="button" className="mobile-overlay-close" onClick={onClose} aria-label="Cerrar menú">
        <i className="fa-solid fa-xmark" aria-hidden="true" />
      </button>
      <nav className="mobile-overlay-nav">
        {links.map((link) => (
          <NavLink key={link.to} to={link.to} className="mobile-overlay-link" onClick={onClose}>
            {link.label}
          </NavLink>
        ))}
      </nav>
      <NavLink to="/tasaciones" className="mobile-overlay-cta" onClick={onClose}>
        TASAR PROPIEDAD
      </NavLink>
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
          <span>WhatsApp: 011 3360-0537</span>
        </div>
      </div>

      <nav className="navbar container">
        <Link to="/" className="brand">
          <img
            src="/20260318_1121_Image%20Generation_remix_01km0n2052f7sb5py4r7empmw9.png"
            alt="LG Propiedades"
            className="brand-logo"
          />
        </Link>

        <ul className="nav-links">
          <li><NavLink to="/">Inicio</NavLink></li>
          <li><NavLink to="/propiedades/en-venta">Propiedades</NavLink></li>
          {/* <li><NavLink to="/sucursales">Zonas</NavLink></li> */}
          <li><NavLink to="/servicios">Servicios</NavLink></li>
          <li><NavLink to="/nosotros">Nosotros</NavLink></li>
          <li><NavLink to="/contacto">Contacto</NavLink></li>
        </ul>

        <NavLink to="/tasaciones" id="tasar" className="cta-small">TASAR PROPIEDAD</NavLink>

        <button
          type="button"
          className="mobile-menu-btn"
          aria-label="Abrir menú"
          onClick={() => setMobileOpen((v) => !v)}
        >
          <i className="fa-solid fa-bars" aria-hidden="true" />
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
