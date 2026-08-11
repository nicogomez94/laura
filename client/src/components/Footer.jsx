import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <p className="footer-brand">Laura Gutierrez Propiedades</p>
          <p className="footer-text">
            Servicios inmobiliarios para compra, venta, alquiler y tasaciones en
            CABA.
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
          <div className="footer-socials">
            <a
              href="https://www.facebook.com/profile.php?id=100084073331126"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
            >
              <i className="fa-brands fa-facebook-f" aria-hidden="true" />
              <span>Facebook</span>
            </a>
            <a
              href="https://www.instagram.com/lgcpropiedades/"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
            >
              <i className="fa-brands fa-instagram" aria-hidden="true" />
              <span>Instagram</span>
            </a>
          </div>
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
