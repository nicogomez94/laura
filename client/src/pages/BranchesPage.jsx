const BRANCHES = [
  {
    name: "Casa Central Recoleta",
    address: "Arenales 1824, CABA",
    phone: "011 3360-0537",
    hours: "Lunes a viernes de 9:00 a 18:30",
    focus: "Residencial premium y alquileres temporarios"
  },
  {
    name: "Sucursal Belgrano",
    address: "Av. Cabildo 2481, CABA",
    phone: "011 3360-0537",
    hours: "Lunes a viernes de 9:30 a 18:00",
    focus: "Departamentos para inversion y renta"
  },
  {
    name: "Sucursal Nordelta",
    address: "Av. Del Puerto 240, Tigre",
    phone: "011 3360-0537",
    hours: "Lunes a sabados de 10:00 a 19:00",
    focus: "Casas, barrios cerrados y lotes"
  }
];

export default function BranchesPage() {
  return (
    <main className="page container info-page">
      <header className="info-hero">
        <p className="section-kicker">SUCURSALES</p>
        <h1 className="page-title">Atencion local en cada zona clave</h1>
        <p className="page-text">
          Trabajamos con equipos especializados por barrio para darte una
          valuacion precisa, visitas agiles y seguimiento comercial real.
        </p>
      </header>

      <section className="info-grid">
        {BRANCHES.map((branch) => (
          <article key={branch.name} className="info-card">
            <h3>{branch.name}</h3>
            <p><strong>Direccion:</strong> {branch.address}</p>
            <p><strong>WhatsApp:</strong> {branch.phone}</p>
            <p><strong>Horario:</strong> {branch.hours}</p>
            <p><strong>Especialidad:</strong> {branch.focus}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
