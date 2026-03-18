import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const TABS = ["Comprar", "Alquilar", "Tasación"];
const COLLECTIONS = [
  { title: "Propiedades\nen Countries", to: "/propiedades/en-venta", cardClass: "card-1", icon: "fa-tree-city" },
  { title: "Departamentos\nen Venta", to: "/propiedades/en-venta", cardClass: "card-2", icon: "fa-building" },
  { title: "Casas\nResidenciales", to: "/propiedades/en-venta", cardClass: "card-3", icon: "fa-house-chimney" },
  { title: "Inversiones\nPremium", to: "/propiedades/en-venta", cardClass: "card-4", icon: "fa-chart-line" }
];
const PILLARS = [
  {
    title: "Servicio Integral",
    text: "Acompanamiento completo desde la publicacion hasta el cierre de la operacion.",
    icon: "fa-handshake"
  },
  {
    title: "Valor Real",
    text: "Analisis de mercado y pricing estrategico para vender o alquilar sin sobreexponer.",
    icon: "fa-scale-balanced"
  },
  {
    title: "Red de Clientes",
    text: "Base activa de compradores e inversores para reducir tiempos de comercializacion.",
    icon: "fa-users"
  },
  {
    title: "Confianza",
    text: "Gestion documental, comunicacion transparente y seguimiento profesional en cada etapa.",
    icon: "fa-shield-halved"
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
            <i className="fa-solid fa-magnifying-glass hero-search-icon" aria-hidden="true" />
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
        <span className="hero-scroll-cue-arrow" aria-hidden="true">
          <i className="fa-solid fa-chevron-down" />
        </span>
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
          {COLLECTIONS.map((collection) => (
            <article key={collection.title} className={`card ${collection.cardClass}`}>
              <div className="card-overlay" />
              <div className="card-content">
                <span className="card-icon" aria-hidden="true">
                  <i className={`fa-solid ${collection.icon}`} />
                </span>
                <h3>{collection.title.split("\n")[0]}<br />{collection.title.split("\n")[1]}</h3>
                <Link to={collection.to}>VER MAS</Link>
              </div>
            </article>
          ))}
        </section>

        <section className="why-choose">
          <div className="container">
            <p className="section-kicker">POR QUE ELEGIRNOS</p>
            <h2>Trabajamos con un estándar alto de satisfacción para cada cliente</h2>

            <div className="why-grid">
              {PILLARS.map((pillar) => (
                <article key={pillar.title} className="why-item">
                  <span className="why-icon" aria-hidden="true">
                    <i className={`fa-solid ${pillar.icon}`} />
                  </span>
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
