import { useEffect, useMemo, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { categories, operationStatuses } from "../data/menu";
import { api, API_BASE_URL } from "../lib/api";
import { clearSession, getUser, isLoggedIn } from "../lib/auth";
import { getDebugPropertyDraft } from "../lib/debugPrefill";

const emptyProperty = {
  title: "",
  description: "",
  category: "PROPIEDADES",
  operationStatus: "EN_VENTA",
  price: 0,
  currency: "USD",
  totalM2: 0,
  coveredM2: 0,
  rooms: 0,
  bathrooms: 0,
  garageSpots: 0,
  address: "",
  neighborhood: "",
  city: "Buenos Aires",
  branch: "Capital Federal",
  published: true,
  images: []
};

function mapFormData(form) {
  return {
    ...form,
    price: Number(form.price),
    totalM2: Number(form.totalM2),
    coveredM2: Number(form.coveredM2),
    rooms: Number(form.rooms),
    bathrooms: Number(form.bathrooms),
    garageSpots: Number(form.garageSpots)
  };
}

export default function AdminDashboardPage() {
  const navigate = useNavigate();
  const debugMode = String(import.meta.env.VITE_DEBUG_MODE).toLowerCase() === "true";
  const [items, setItems] = useState([]);
  const [loadingList, setLoadingList] = useState(true);
  const [saving, setSaving] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [form, setForm] = useState(emptyProperty);
  const [imageUrl, setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const user = useMemo(() => getUser(), []);

  useEffect(() => {
    if (!isLoggedIn()) {
      return;
    }

    const run = async () => {
      setLoadingList(true);
      try {
        const data = await api.listAdminProperties();
        setItems(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoadingList(false);
      }
    };
    run();
  }, []);

  if (!isLoggedIn()) {
    return <Navigate to="/admin/login" replace />;
  }

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function startCreate() {
    setSelectedId(null);
    setForm(emptyProperty);
    setError("");
  }

  function startEdit(item) {
    setSelectedId(item.id);
    setForm({
      title: item.title,
      description: item.description,
      category: item.category,
      operationStatus: item.operationStatus,
      price: Number(item.price),
      currency: item.currency,
      totalM2: item.totalM2,
      coveredM2: item.coveredM2,
      rooms: item.rooms,
      bathrooms: item.bathrooms,
      garageSpots: item.garageSpots,
      address: item.address,
      neighborhood: item.neighborhood,
      city: item.city,
      branch: item.branch,
      published: item.published,
      images: item.images || []
    });
    setError("");
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSaving(true);
    setError("");

    try {
      const payload = mapFormData(form);
      if (selectedId) {
        await api.updateProperty(selectedId, payload);
      } else {
        await api.createProperty(payload);
      }
      const data = await api.listAdminProperties();
      setItems(data);
      startCreate();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Eliminar propiedad?")) {
      return;
    }
    try {
      await api.deleteProperty(id);
      setItems((current) => current.filter((item) => item.id !== id));
      if (selectedId === id) {
        startCreate();
      }
    } catch (err) {
      setError(err.message);
    }
  }

  function addImageFromUrl() {
    if (!imageUrl.trim()) {
      return;
    }
    setForm((current) => ({
      ...current,
      images: [
        ...current.images,
        {
          url: imageUrl.trim(),
          alt: current.title || "Foto propiedad",
          sortOrder: current.images.length
        }
      ]
    }));
    setImageUrl("");
  }

  async function uploadFile(event) {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }
    setUploading(true);
    try {
      const result = await api.uploadImage(file);
      const normalizedUrl = `${API_BASE_URL}${result.url}`;
      setForm((current) => ({
        ...current,
        images: [
          ...current.images,
          {
            url: normalizedUrl,
            alt: current.title || file.name,
            sortOrder: current.images.length
          }
        ]
      }));
    } catch (err) {
      setError(err.message);
    } finally {
      event.target.value = "";
      setUploading(false);
    }
  }

  function removeImage(indexToRemove) {
    setForm((current) => ({
      ...current,
      images: current.images
        .filter((_, index) => index !== indexToRemove)
        .map((image, index) => ({ ...image, sortOrder: index }))
    }));
  }

  return (
    <main className="page container admin-page">
      <div className="admin-header">
        <h1 className="page-title">Admin Propiedades</h1>
        <div className="admin-header-actions">
          <span>Usuario: {user?.username || "admin"}</span>
          <button
            className="btn-secondary"
            onClick={() => {
              clearSession();
              navigate("/admin/login");
            }}
            type="button"
          >
            Cerrar sesion
          </button>
        </div>
      </div>

      <section className="admin-grid">
        <article className="admin-list">
          <div className="admin-list-head">
            <h2>Propiedades</h2>
            <button className="btn-secondary" onClick={startCreate} type="button">
              Nueva
            </button>
          </div>
          {loadingList ? <p>Cargando...</p> : null}
          <div className="admin-list-items">
            {items.map((item) => (
              <div key={item.id} className="admin-list-item">
                <div>
                  <strong>{item.title}</strong>
                  <p>
                    {item.category} · {item.operationStatus}
                  </p>
                </div>
                <div className="admin-list-actions">
                  <button type="button" onClick={() => startEdit(item)}>
                    Editar
                  </button>
                  <button type="button" onClick={() => handleDelete(item.id)}>
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="admin-form-wrap">
          <div className="admin-list-head">
            <h2>{selectedId ? "Editar propiedad" : "Crear propiedad"}</h2>
            {debugMode ? (
              <button
                type="button"
                className="btn-secondary"
                onClick={() => setForm(getDebugPropertyDraft())}
              >
                Prefill debug
              </button>
            ) : null}
          </div>

          <form className="admin-form" onSubmit={handleSubmit}>
            <label>
              Titulo
              <input
                value={form.title}
                onChange={(event) => updateField("title", event.target.value)}
                required
              />
            </label>
            <label>
              Descripcion
              <textarea
                value={form.description}
                onChange={(event) => updateField("description", event.target.value)}
                rows={4}
                required
              />
            </label>
            <div className="inline-fields">
              <label>
                Categoria
                <select
                  value={form.category}
                  onChange={(event) => updateField("category", event.target.value)}
                >
                  {categories.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Estado
                <select
                  value={form.operationStatus}
                  onChange={(event) =>
                    updateField("operationStatus", event.target.value)
                  }
                >
                  {operationStatuses.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div className="inline-fields">
              <label>
                Precio
                <input
                  type="number"
                  value={form.price}
                  onChange={(event) => updateField("price", event.target.value)}
                  min="0"
                  required
                />
              </label>
              <label>
                Moneda
                <select
                  value={form.currency}
                  onChange={(event) => updateField("currency", event.target.value)}
                >
                  <option value="USD">USD</option>
                  <option value="ARS">ARS</option>
                </select>
              </label>
            </div>
            <div className="inline-fields">
              <label>
                m2 total
                <input
                  type="number"
                  value={form.totalM2}
                  onChange={(event) => updateField("totalM2", event.target.value)}
                  min="0"
                  required
                />
              </label>
              <label>
                m2 cubiertos
                <input
                  type="number"
                  value={form.coveredM2}
                  onChange={(event) => updateField("coveredM2", event.target.value)}
                  min="0"
                  required
                />
              </label>
            </div>
            <div className="inline-fields">
              <label>
                Ambientes
                <input
                  type="number"
                  value={form.rooms}
                  onChange={(event) => updateField("rooms", event.target.value)}
                  min="0"
                  required
                />
              </label>
              <label>
                Banos
                <input
                  type="number"
                  value={form.bathrooms}
                  onChange={(event) => updateField("bathrooms", event.target.value)}
                  min="0"
                  required
                />
              </label>
              <label>
                Cocheras
                <input
                  type="number"
                  value={form.garageSpots}
                  onChange={(event) => updateField("garageSpots", event.target.value)}
                  min="0"
                  required
                />
              </label>
            </div>
            <label>
              Direccion
              <input
                value={form.address}
                onChange={(event) => updateField("address", event.target.value)}
                required
              />
            </label>
            <div className="inline-fields">
              <label>
                Barrio
                <input
                  value={form.neighborhood}
                  onChange={(event) =>
                    updateField("neighborhood", event.target.value)
                  }
                  required
                />
              </label>
              <label>
                Ciudad
                <input
                  value={form.city}
                  onChange={(event) => updateField("city", event.target.value)}
                  required
                />
              </label>
              <label>
                Sucursal
                <input
                  value={form.branch}
                  onChange={(event) => updateField("branch", event.target.value)}
                  required
                />
              </label>
            </div>

            <label className="toggle-field">
              <input
                type="checkbox"
                checked={form.published}
                onChange={(event) => updateField("published", event.target.checked)}
              />
              Publicada
            </label>

            <div className="images-box">
              <h3>Fotos</h3>
              <div className="inline-fields">
                <input
                  value={imageUrl}
                  placeholder="https://..."
                  onChange={(event) => setImageUrl(event.target.value)}
                />
                <button type="button" onClick={addImageFromUrl}>
                  Agregar URL
                </button>
                <label className="upload-button">
                  {uploading ? "Subiendo..." : "Subir archivo"}
                  <input
                    type="file"
                    onChange={uploadFile}
                    accept="image/png,image/jpeg,image/webp"
                  />
                </label>
              </div>
              <div className="image-preview-grid">
                {form.images.map((image, index) => (
                  <div key={`${image.url}-${index}`} className="image-preview-item">
                    <img src={image.url} alt={image.alt || "Imagen"} />
                    <button type="button" onClick={() => removeImage(index)}>
                      Quitar
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {error ? <p className="error-text">{error}</p> : null}
            <button type="submit" className="btn-main" disabled={saving}>
              {saving ? "Guardando..." : "Guardar"}
            </button>
          </form>
        </article>
      </section>
    </main>
  );
}
