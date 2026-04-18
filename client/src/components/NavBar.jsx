import { useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { menuStructure } from "../data/menu";
import Footer from "./Footer";

const propertyMenuItems = menuStructure
  .filter((section) => ["PROPIEDADES", "EMPRENDIMIENTOS"].includes(section.title))
  .flatMap((section) => section.items);

function MobileMenu({ onClose }) {
  const links = [
    { to: "/", label: "Inicio" },
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
        <div className="mobile-overlay-group">
          <NavLink to="/propiedades/en-venta" className="mobile-overlay-link" onClick={onClose}>
            Propiedades
          </NavLink>
          <div className="mobile-overlay-sublinks">
            {propertyMenuItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className="mobile-overlay-sublink"
                onClick={onClose}
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
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
        <div className="topbar-left topbar-socials">
          <a
            href="https://www.linkedin.com/"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
          >
            <i className="fa-brands fa-linkedin-in" aria-hidden="true" />
          </a>
          <a
            href="https://www.facebook.com/profile.php?id=100084073331126"
            target="_blank"
            rel="noreferrer"
            aria-label="Facebook"
          >
            <i className="fa-brands fa-facebook-f" aria-hidden="true" />
          </a>
          <a
            href="https://www.instagram.com/lgcpropiedades/"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
          >
            <i className="fa-brands fa-instagram" aria-hidden="true" />
          </a>
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
          <li className="nav-dropdown">
            <NavLink to="/propiedades/en-venta" className="nav-dropdown-trigger">
              Propiedades
            </NavLink>
            <div className="nav-dropdown-menu" aria-label="Tipos de propiedades">
              <span className="nav-dropdown-label">Estado</span>
              <div className="nav-dropdown-links">
                {propertyMenuItems.map((item) => (
                  <NavLink key={item.to} to={item.to} className="nav-dropdown-link">
                    {item.label}
                  </NavLink>
                ))}
              </div>
            </div>
          </li>
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
