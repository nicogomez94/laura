import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const TABS = ["Comprar", "Alquilar", "Tasación"];
const COLLECTIONS = [
  { title: "Casas\nen Venta", to: "/propiedades/en-venta", cardClass: "card-1", icon: "fa-house" },
  { title: "Departamentos\nen Alquiler", to: "/propiedades/en-alquiler", cardClass: "card-2", icon: "fa-key" },
  { title: "Locales\nComerciales", to: "/propiedades/en-venta", cardClass: "card-3", icon: "fa-shop" },
  { title: "Lotes y\nTerrenos", to: "/propiedades/en-venta", cardClass: "card-4", icon: "fa-ruler-combined" }
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

const INITIAL_CTA_FORM = {
  fullName: "",
  email: "",
  phone: "",
  message: "",
  consent: false
};

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

function HomeContactCta() {
  const [form, setForm] = useState(INITIAL_CTA_FORM);
  const [sent, setSent] = useState(false);

  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
    if (sent) setSent(false);
  }

  function handleSubmit(event) {
    event.preventDefault();
    setSent(true);
    setForm(INITIAL_CTA_FORM);
  }

  return (
    <section className="home-contact-cta container">
      <div className="home-contact-cta-head">
        <p className="section-kicker">HABLEMOS DE TU PROPIEDAD</p>
        <h2>Recibí asesoramiento personalizado hoy</h2>
        <p>
          Completá tus datos y te contactamos para ayudarte con compra, venta,
          alquiler o tasación.
        </p>
      </div>

      <div className="home-contact-grid">
        <form className="form-card home-contact-form" onSubmit={handleSubmit}>
          <h3>Solicitar contacto</h3>
          <div className="form-grid">
            <label>
              Nombre y apellido
              <input
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Email
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              WhatsApp
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Mensaje
              <input
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Ej: Quiero vender un departamento en Recoleta."
                required
              />
            </label>
          </div>

          <label className="consent-row">
            <input
              type="checkbox"
              name="consent"
              checked={form.consent}
              onChange={handleChange}
              required
            />
            <span>Acepto el tratamiento de mis datos personales para ser contactado.</span>
          </label>

          <button type="submit" className="btn-primary">QUIERO QUE ME CONTACTEN</button>
          {sent ? <p className="success-text">Gracias. Recibimos tu consulta y te escribimos pronto.</p> : null}
        </form>

        <article className="info-card home-contact-data">
          <h3>Datos personales y contacto</h3>
          <p><strong>Asesor comercial:</strong> Laura Gutierrez</p>
          <p><strong>WhatsApp:</strong> 011 3360-0537</p>
          <p><strong>Email:</strong> info@lauragutierrezpropiedades.com.ar</p>
          <Link to="/contacto" className="cta-small home-contact-link">IR A CONTACTO COMPLETO</Link>
        </article>
      </div>
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
            <span className="stat-number">+10</span>
            <span className="stat-label">
              años
              <br />
              ayudando
              <br />
              a la gente
            </span>
          </div>
          <div className="about-copy">
            <p className="section-kicker">SOBRE NOSOTROS</p>
            <h2>Una inmobiliaria de confianza, con atención personalizada</h2>
          </div>
          <div className="about-text">
            <p>
              Trabajamos con seriedad y compromiso para ayudarte a comprar,
              vender o alquilar tu propiedad. Conocemos la zona y te
              acompañamos en cada paso del proceso.
            </p>
            <Link to="/nosotros" className="btn-secondary">
              CONOCENOS
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
        <HomeContactCta />
      </main>
    </>
  );
}
