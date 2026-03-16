import { getToken, clearSession } from "./auth";

const rawApiBaseUrl =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";
const normalizedApiBaseUrl = /^https?:\/\//i.test(rawApiBaseUrl)
  ? rawApiBaseUrl
  : `https://${rawApiBaseUrl}`;
const API_BASE_URL = normalizedApiBaseUrl.replace(/\/+$/, "");

function buildQuery(params = {}) {
  const query = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value) {
      query.append(key, value);
    }
  }
  const result = query.toString();
  return result ? `?${result}` : "";
}

async function request(path, options = {}) {
  const token = getToken();
  const headers = {
    ...(options.headers || {})
  };

  if (!(options.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers
  });

  if (response.status === 401) {
    clearSession();
  }

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    throw new Error(errorBody.message || "Error de servidor");
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

export const api = {
  login(payload) {
    return request("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(payload)
    });
  },
  getHealth() {
    return request("/health");
  },
  listPublicProperties(filters) {
    return request(`/api/properties${buildQuery(filters)}`);
  },
  getPublicProperty(slug) {
    return request(`/api/properties/${slug}`);
  },
  listAdminProperties() {
    return request("/api/admin/properties");
  },
  createProperty(payload) {
    return request("/api/admin/properties", {
      method: "POST",
      body: JSON.stringify(payload)
    });
  },
  updateProperty(id, payload) {
    return request(`/api/admin/properties/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload)
    });
  },
  deleteProperty(id) {
    return request(`/api/admin/properties/${id}`, {
      method: "DELETE"
    });
  },
  uploadImage(file) {
    const formData = new FormData();
    formData.append("file", file);
    return request("/api/admin/upload", {
      method: "POST",
      body: formData
    });
  }
};

export { API_BASE_URL };
