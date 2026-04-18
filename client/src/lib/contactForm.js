const CONTACT_FORM_URL = "https://contact-form-service-e8aa.onrender.com/api/contact";

export const CONTACT_TO = "info@lauragutierrezpropiedades.com.ar";
export const CONTACT_SITE = "https://lauragutierrezpropiedades.com.ar/";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function trimFormValues(values) {
  return Object.fromEntries(
    Object.entries(values).map(([key, value]) => [
      key,
      typeof value === "string" ? value.trim() : value
    ])
  );
}

export function isValidEmail(email) {
  return EMAIL_REGEX.test(email);
}

export async function submitContactForm({ name, email, message }) {
  const response = await fetch(CONTACT_FORM_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name,
      email,
      to: CONTACT_TO,
      message,
      site: CONTACT_SITE,
      company: ""
    })
  });

  const data = await response.json().catch(() => null);

  if (!response.ok || !data?.success) {
    throw new Error(data?.message || "No se pudo enviar el formulario.");
  }

  return data;
}
