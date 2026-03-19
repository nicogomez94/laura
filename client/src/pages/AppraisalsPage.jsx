import { useState } from "react";

const INITIAL_FORM = {
  fullName: "",
  phone: "",
  email: "",
  operationType: "venta",
  propertyType: "departamento",
  neighborhood: "",
  estimatedM2: "",
  message: ""
};

export default function AppraisalsPage() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [sent, setSent] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    setSent(true);
    setForm(INITIAL_FORM);
  }

  return (
    <main className="page container info-page">
      <header className="info-hero">
        <p className="section-kicker">TASACIONES</p>
        <h1 className="page-title">Conoce el valor real de tu propiedad</h1>
        <p className="page-text">
          Recibi una valuacion profesional con analisis comparativo de zona,
          absorcion de mercado y estrategia de salida.
        </p>
      </header>

      <section className="split-section">
        <article className="info-card">
          <h3>Que incluye la tasacion</h3>
          <ul className="feature-list">
            <li>Relevamiento comercial y estado general del inmueble.</li>
            <li>Analisis de propiedades comparables publicadas y vendidas.</li>
            <li>Rango de valor sugerido para publicar.</li>
            <li>Plan comercial para acelerar la colocacion.</li>
          </ul>
        </article>

        <form className="form-card" onSubmit={handleSubmit}>
          <h2>Solicitar tasacion</h2>
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
              WhatsApp
              <input
                name="phone"
                value={form.phone}
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
              Operacion
              <select
                name="operationType"
                value={form.operationType}
                onChange={handleChange}
              >
                <option value="venta">Venta</option>
                <option value="alquiler">Alquiler</option>
              </select>
            </label>
            <label>
              Tipo de propiedad
              <select
                name="propertyType"
                value={form.propertyType}
                onChange={handleChange}
              >
                <option value="departamento">Departamento</option>
                <option value="casa">Casa</option>
                <option value="ph">PH</option>
                <option value="lote">Lote</option>
              </select>
            </label>
            <label>
              Barrio / zona
              <input
                name="neighborhood"
                value={form.neighborhood}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Metros cuadrados estimados
              <input
                type="number"
                min="1"
                name="estimatedM2"
                value={form.estimatedM2}
                onChange={handleChange}
                required
              />
            </label>
          </div>
          <label>
            Comentarios
            <textarea
              name="message"
              rows="4"
              value={form.message}
              onChange={handleChange}
              placeholder="Ej: piso alto, estado general, amenities, cochera..."
            />
          </label>
          <button type="submit" className="btn-primary">Enviar solicitud</button>
          {sent ? (
            <p className="success-text">
              Solicitud enviada. Te contactamos dentro de las proximas 24 hs.
            </p>
          ) : null}
        </form>
      </section>
    </main>
  );
}
