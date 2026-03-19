import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <p className="footer-brand">LGPROPIEDADES</p>
          <p className="footer-text">
            Servicios inmobiliarios para compra, venta, alquiler y tasaciones en
            CABA y zona norte.
          </p>
        </div>

        <div>
          <p className="footer-title">Navegacion</p>
          <div className="footer-links">
            <Link to="/">Inicio</Link>
            <Link to="/propiedades/en-venta">Propiedades</Link>
            <Link to="/tasaciones">Tasaciones</Link>
            <Link to="/nosotros">Nosotros</Link>
            <Link to="/contacto">Contacto</Link>
          </div>
        </div>

        <div>
          <p className="footer-title">Contacto</p>
          <p className="footer-text">WhatsApp: 011 3360-0537</p>
          <p className="footer-text">Email: info@lauragutierrezpropiedades.com.ar</p>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <p>© {new Date().getFullYear()} LG Propiedades. Todos los derechos reservados.</p>
          <p className="footer-credit">
            hecho por{" "}
            <a href="https://zigodev.com.ar" target="_blank" rel="noreferrer">
              zigodev
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
