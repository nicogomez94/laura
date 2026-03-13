const METRICS = [
  { value: "+25", label: "Anios de experiencia" },
  { value: "3.500", label: "Operaciones cerradas" },
  { value: "92%", label: "Propiedades vendidas en menos de 90 dias" }
];

const VALUES = [
  {
    title: "Transparencia comercial",
    text: "Informes claros de mercado, visitas calificadas y reportes semanales."
  },
  {
    title: "Asesoria legal integral",
    text: "Acompanamiento documental, reservas, boletos y escritura."
  },
  {
    title: "Marketing inmobiliario",
    text: "Produccion audiovisual, pauta digital y cartera activa de clientes."
  }
];

export default function AboutPage() {
  return (
    <main className="page container info-page">
      <header className="info-hero">
        <p className="section-kicker">NOSOTROS</p>
        <h1 className="page-title">Una inmobiliaria orientada a resultados</h1>
        <p className="page-text">
          Combinamos estrategia de pricing, tecnologia comercial y seguimiento
          personalizado para que cada operacion llegue a buen termino.
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
