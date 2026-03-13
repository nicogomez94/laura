import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { api, API_BASE_URL } from "../lib/api";
import { listingFilters } from "../data/menu";

function formatCurrency(value, currency) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: currency || "USD",
    maximumFractionDigits: 0
  }).format(Number(value));
}

export default function ListingsPage() {
  const params = useParams();
  const key = `${params.section}/${params.status}`;
  const filterConfig = listingFilters[key];
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!filterConfig) {
      setLoading(false);
      setError("Seccion no encontrada");
      return;
    }

    const run = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await api.listPublicProperties({
          category: filterConfig.category,
          operationStatus: filterConfig.operationStatus
        });
        setProperties(response);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    run();
  }, [filterConfig]);

  return (
    <main className="page container">
      <h1 className="page-title">{filterConfig?.title || "Listado"}</h1>

      {loading ? <p>Cargando...</p> : null}
      {error ? <p className="error-text">{error}</p> : null}
      {!loading && !error && properties.length === 0 ? (
        <p>No hay propiedades publicadas para esta seccion.</p>
      ) : null}

      <section className="listing-grid">
        {properties.map((property) => {
          const image = property.images?.[0];
          const imageUrl = image?.url?.startsWith("http")
            ? image.url
            : `${API_BASE_URL}${image?.url || ""}`;

          return (
            <article key={property.id} className="property-card">
              {image ? (
                <img src={imageUrl} alt={image.alt || property.title} />
              ) : (
                <div className="img-placeholder">Sin imagen</div>
              )}
              <div className="property-card-content">
                <h3>{property.title}</h3>
                <p>{property.neighborhood}</p>
                <p className="price">
                  {formatCurrency(property.price, property.currency)}
                </p>
                <p className="specs">
                  {property.coveredM2}m2 cubiertos · {property.rooms} amb ·{" "}
                  {property.bathrooms} banos
                </p>
                <Link to={`/propiedades/ficha/${property.slug}`} className="card-link">
                  Ver detalle
                </Link>
              </div>
            </article>
          );
        })}
      </section>
    </main>
  );
}
