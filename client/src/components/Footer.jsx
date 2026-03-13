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
          <p className="footer-text">Arenales 1824, Recoleta, CABA</p>
          <p className="footer-text">+54 11 4582 9912</p>
          <p className="footer-text">contacto@lgpropiedades.com.ar</p>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <p>© {new Date().getFullYear()} LG Propiedades. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
