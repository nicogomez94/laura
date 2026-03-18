import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const TABS = ["Comprar", "Alquilar", "Tasación"];
const PILLARS = [
  {
    title: "Servicio Integral",
    text: "Acompanamiento completo desde la publicacion hasta el cierre de la operacion."
  },
  {
    title: "Valor Real",
    text: "Analisis de mercado y pricing estrategico para vender o alquilar sin sobreexponer."
  },
  {
    title: "Red de Clientes",
    text: "Base activa de compradores e inversores para reducir tiempos de comercializacion."
  },
  {
    title: "Confianza",
    text: "Gestion documental, comunicacion transparente y seguimiento profesional en cada etapa."
  }
];

function HeroContent() {
  const [activeTab, setActiveTab] = useState(0);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  function handleSearch(e) {
    e.preventDefault();
    const routes = ["/propiedades/en-venta", "/propiedades/en-alquiler", "/tasaciones"];
    navigate(routes[activeTab]);
  }

  function handleScrollDown() {
    const nextSection = document.querySelector(".dark-block");
    if (!nextSection) return;
    nextSection.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <section className="hero-content container">
      <p className="hero-kicker">+3.500 operaciones de compra, venta y alquiler</p>
      <h1>
        Encontrá la propiedad
        <br />
        ideal para vos
      </h1>
      <p className="hero-sub">
        Asesoramiento integral para comprar, vender o alquilar con respaldo legal
        y estrategia comercial.
      </p>

      <form className="hero-search" onSubmit={handleSearch}>
        <div style={{ flex: 1 }}>
          <div className="hero-search-tabs">
            {TABS.map((tab, i) => (
              <button
                key={tab}
                type="button"
                className={`hero-search-tab${activeTab === i ? " active" : ""}`}
                onClick={() => setActiveTab(i)}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="hero-search-row">
            <svg width="16" height="16" fill="none" stroke="#8a95a8" strokeWidth="2" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              placeholder="Barrio, ciudad o zona..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button type="submit" className="hero-search-btn">BUSCAR</button>
          </div>
        </div>
      </form>

      <button
        type="button"
        className="hero-scroll-cue"
        onClick={handleScrollDown}
        aria-label="Ir a la siguiente sección"
      >
        <span className="hero-scroll-cue-arrow" aria-hidden="true">↓</span>
      </button>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <HeroContent />
      <main className="dark-block">
        <section className="about container">
          <div className="stat-box">
            <span className="stat-number">25</span>
            <span className="stat-label">
              años
              <br />
              liderando el
              <br />
              mercado local
            </span>
          </div>
          <div className="about-copy">
            <p className="section-kicker">SOBRE NOSOTROS</p>
            <h2>Gestión inmobiliaria profesional para cada etapa de tu operación</h2>
          </div>
          <div className="about-text">
            <p>
              Conectamos compradores, vendedores e inversores con oportunidades
              reales en barrios estratégicos. Te acompañamos desde la tasación
              hasta la firma de escritura o contrato.
            </p>
            <Link to="/nosotros" className="btn-secondary">
              CONOCER LA EMPRESA
            </Link>
          </div>
        </section>

        <section className="collections container">
          <article className="card card-1">
            <div className="card-overlay" />
            <div className="card-content">
              <h3>Propiedades<br />en Countries</h3>
              <Link to="/propiedades/en-venta">VER MÁS</Link>
            </div>
          </article>
          <article className="card card-2">
            <div className="card-overlay" />
            <div className="card-content">
              <h3>Departamentos<br />en Venta</h3>
              <Link to="/propiedades/en-venta">VER MÁS</Link>
            </div>
          </article>
          <article className="card card-3">
            <div className="card-overlay" />
            <div className="card-content">
              <h3>Casas<br />Residenciales</h3>
              <Link to="/propiedades/en-venta">VER MÁS</Link>
            </div>
          </article>
          <article className="card card-4">
            <div className="card-overlay" />
            <div className="card-content">
              <h3>Inversiones<br />Premium</h3>
              <Link to="/propiedades/en-venta">VER MÁS</Link>
            </div>
          </article>
        </section>

        <section className="why-choose">
          <div className="container">
            <p className="section-kicker">POR QUE ELEGIRNOS</p>
            <h2>Trabajamos con un estándar alto de satisfacción para cada cliente</h2>

            <div className="why-grid">
              {PILLARS.map((pillar, index) => (
                <article key={pillar.title} className="why-item">
                  <span className="why-icon">{index + 1}</span>
                  <h3>{pillar.title}</h3>
                  <p>{pillar.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
