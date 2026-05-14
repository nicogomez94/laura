const METRICS = [
  { value: "4", label: "Años de trayectoria" },
  { value: "56", label: "Operaciones cerradas" },
  { value: "0", label: "Propiedades vendidas en menos de 90 días" }
];

const VALUES = [
  {
    title: "Trato cercano y directo",
    text: "Cada cliente habla directamente con Laura o con alguno de sus asesores de confianza. Sin intermediarios, sin burocracia."
  },
  {
    title: "Conocimiento real del mercado",
    text: "Nuestra experiencia operando en CABA nos da una lectura afinada de precios, zonas y oportunidades."
  },
  {
    title: "Acompañamiento hasta el final",
    text: "Desde la primera consulta hasta la firma de escritura. Gestionamos reservas, boletos y trámites notariales sin que tengas que preocuparte."
  }
];

export default function AboutPage() {
  return (
    <main className="page container info-page">
      <header className="info-hero">
        <p className="section-kicker">NOSOTROS</p>
        <h1 className="page-title">4 años haciendo lo que nos apasiona</h1>
        <p className="page-text">
          Laura fundó esta inmobiliaria con una convicción simple: que comprar,
          vender o alquilar una propiedad debería ser una experiencia clara,
          segura y sin sobresaltos. Esa filosofía sigue siendo el núcleo de todo
          lo que hacemos.
        </p>
      </header>

      <section className="metrics-grid">
        {METRICS.map((metric) => (
          <article key={metric.label} className="metric-card">
            <h3>{metric.value}</h3>
            <p>{metric.label}</p>
          </article>
        ))}
      </section>

      <section className="info-section">
        <h2 className="section-title">Quiénes somos</h2>
        <p className="page-text">
          Somos un equipo de asesores inmobiliarios con base en Almagro,
          Balvanera y Palermo, con presencia en Belgrano. Laura lidera el
          equipo desde hace años y fue creciendo junto a sus clientes, muchos
          de los cuales hoy vuelven para su segunda o tercera operación.
        </p>
        <p className="page-text" style={{ marginTop: "1rem" }}>
          Lo que nos diferencia no es el tamaño, sino la dedicación. Cada
          propiedad recibe una estrategia de comercialización a medida:
          tasación fundamentada, fotografía profesional, publicación en los
          principales portales y seguimiento activo de cada interesado. No
          esperamos consultas; trabajamos para generarlas.
        </p>
      </section>

      <section className="info-grid">
        {VALUES.map((value) => (
          <article key={value.title} className="info-card">
            <h3>{value.title}</h3>
            <p>{value.text}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
