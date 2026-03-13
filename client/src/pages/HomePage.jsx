import { Link } from "react-router-dom";
import { menuStructure } from "../data/menu";

const heroImages = [
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1800&q=80",
  "https://images.unsplash.com/photo-1600607687644-c94bf7f28f89?auto=format&fit=crop&w=1800&q=80",
  "https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&w=1800&q=80"
];

export default function HomePage() {
  return (
    <>
      <section
        className="hero-content container"
        style={{ backgroundImage: `url(${heroImages[0]})` }}
      >
        <p className="hero-kicker">+3.500 operaciones de compra, venta y alquiler</p>
        <h1>
          Encontra la propiedad
          <br />
          ideal para vos
        </h1>
        <p className="hero-sub">
          Asesoramiento integral para comprar, vender o alquilar con respaldo legal
          y estrategia comercial.
        </p>
        <Link className="btn-main" to="/propiedades/en-venta">
          VER PROPIEDADES
        </Link>
      </section>

      <main className="dark-block">
        <section className="about container">
          <div className="stat-box">
            <span className="stat-number">25</span>
            <span className="stat-label">
              anos
              <br />
              liderando el
              <br />
              mercado local
            </span>
          </div>
          <div className="about-copy">
            <p className="section-kicker">SOBRE NOSOTROS</p>
            <h2>Gestion inmobiliaria profesional para cada etapa de tu operacion</h2>
          </div>
          <div className="about-text">
            <p>
              Conectamos compradores, vendedores e inversores con oportunidades
              reales en barrios estrategicos.
            </p>
            <Link to="/nosotros" className="btn-secondary">
              CONOCER LA EMPRESA
            </Link>
          </div>
        </section>

        <section className="collections container">
          {menuStructure
            .slice(0, 2)
            .flatMap((section) => section.items)
            .slice(0, 4)
            .map((item, index) => (
              <article key={item.to} className={`card card-${index + 1}`}>
                <div className="card-overlay" />
                <div className="card-content">
                  <h3>{item.label}</h3>
                  <Link to={item.to}>VER MAS</Link>
                </div>
              </article>
            ))}
        </section>
      </main>
    </>
  );
}
