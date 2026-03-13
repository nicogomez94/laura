import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api, API_BASE_URL } from "../lib/api";

function formatCurrency(value, currency) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: currency || "USD",
    maximumFractionDigits: 0
  }).format(Number(value));
}

function listingPath(property) {
  const section = property.category === "EMPRENDIMIENTOS"
    ? "emprendimientos"
    : "propiedades";

  const statusMap = {
    EN_VENTA: "en-venta",
    EN_ALQUILER: "en-alquiler",
    ALQUILER_TEMPORARIO: "alquiler-temporario",
    EN_CONSTRUCCION: "en-construccion",
    EN_POZO: "en-pozo",
    LISTO_PARA_VIVIR: "listos-para-vivir"
  };

  return `/${section}/${statusMap[property.operationStatus] || "en-venta"}`;
}

function imageUrl(image) {
  if (!image?.url) {
    return "";
  }
  return image.url.startsWith("http") ? image.url : `${API_BASE_URL}${image.url}`;
}

export default function PropertyDetailPage() {
  const { slug } = useParams();
  const [property, setProperty] = useState(null);
  const [activeImage, setActiveImage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const run = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await api.getPublicProperty(slug);
        setProperty(response);
        setActiveImage(0);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    run();
  }, [slug]);

  const gallery = useMemo(() => property?.images || [], [property?.images]);
  const mainImage = gallery[activeImage] || null;

  if (loading) {
    return (
      <main className="page container">
        <p>Cargando propiedad...</p>
      </main>
    );
  }

  if (error || !property) {
    return (
      <main className="page container">
        <h1 className="page-title">Propiedad no encontrada</h1>
        <p className="error-text">{error || "No se encontro la propiedad solicitada."}</p>
      </main>
    );
  }

  return (
    <main className="page container detail-page">
      <div className="detail-topbar">
        <Link to={listingPath(property)} className="detail-back">
          ← Volver al listado
        </Link>
      </div>

      <section className="detail-grid">
        <div className="detail-gallery">
          {mainImage ? (
            <img
              className="detail-main-image"
              src={imageUrl(mainImage)}
              alt={mainImage.alt || property.title}
            />
          ) : (
            <div className="detail-main-image img-placeholder">Sin imagen</div>
          )}

          {gallery.length > 1 ? (
            <div className="detail-thumbs">
              {gallery.map((image, index) => (
                <button
                  key={image.id}
                  type="button"
                  className={`detail-thumb${index === activeImage ? " active" : ""}`}
                  onClick={() => setActiveImage(index)}
                >
                  <img src={imageUrl(image)} alt={image.alt || `${property.title} ${index + 1}`} />
                </button>
              ))}
            </div>
          ) : null}
        </div>

        <aside className="detail-summary">
          <h1>{property.title}</h1>
          <p className="price">{formatCurrency(property.price, property.currency)}</p>
          <p className="detail-location">
            {property.address}, {property.neighborhood}, {property.city}
          </p>

          <div className="detail-tags">
            <span>{property.category}</span>
            <span>{property.operationStatus.replaceAll("_", " ")}</span>
            <span>Sucursal: {property.branch}</span>
          </div>

          <div className="detail-specs">
            <p><strong>{property.totalM2} m2</strong> totales</p>
            <p><strong>{property.coveredM2} m2</strong> cubiertos</p>
            <p><strong>{property.rooms}</strong> ambientes</p>
            <p><strong>{property.bathrooms}</strong> banos</p>
            <p><strong>{property.garageSpots}</strong> cocheras</p>
          </div>
        </aside>
      </section>

      <section className="detail-description">
        <h2>Descripcion</h2>
        <p>{property.description}</p>
      </section>
    </main>
  );
}
