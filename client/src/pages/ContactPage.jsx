import { useState } from "react";

const INITIAL_FORM = {
  fullName: "",
  phone: "",
  email: "",
  reason: "compra",
  message: ""
};

export default function ContactPage() {
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
        <p className="section-kicker">CONTACTO</p>
        <h1 className="page-title">Hablemos de tu proxima operacion</h1>
        <p className="page-text">
          Nuestro equipo comercial responde consultas de compra, venta, alquiler
          y administracion.
        </p>
      </header>

      <section className="split-section">
        <article className="info-card">
          <h3>Canales directos</h3>
          <p><strong>WhatsApp:</strong> 011 3360-0537</p>
          <p><strong>Email:</strong> info@lauragutierrezpropiedades.com.ar</p>
        </article>

        <form className="form-card" onSubmit={handleSubmit}>
          <h2>Enviar consulta</h2>
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
              Motivo
              <select
                name="reason"
                value={form.reason}
                onChange={handleChange}
              >
                <option value="compra">Comprar</option>
                <option value="venta">Vender</option>
                <option value="alquiler">Alquilar</option>
                <option value="inversion">Invertir</option>
              </select>
            </label>
          </div>
          <label>
            Mensaje
            <textarea
              name="message"
              rows="5"
              value={form.message}
              onChange={handleChange}
              placeholder="Contanos que propiedad buscas o que operacion queres realizar."
              required
            />
          </label>
          <button type="submit" className="btn-primary">Enviar mensaje</button>
          {sent ? (
            <p className="success-text">
              Consulta enviada. Te respondemos a la brevedad.
            </p>
          ) : null}
        </form>
      </section>
    </main>
  );
}
