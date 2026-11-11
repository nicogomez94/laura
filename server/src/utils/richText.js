import sanitizeHtml from "sanitize-html";

const SANITIZE_OPTIONS = {
  allowedTags: ["p", "br", "strong", "em", "u", "ul", "ol", "li", "h2", "h3", "h4", "blockquote", "a"],
  allowedAttributes: { a: ["href", "target", "rel"] },
  allowedSchemes: ["http", "https", "mailto", "tel"],
  transformTags: {
    div: "p",
    b: "strong",
    i: "em",
    a: (tagName, attribs) => ({
      tagName,
      attribs: {
        ...attribs,
        ...(attribs.target === "_blank" ? { rel: "noopener noreferrer" } : {})
      }
    })
  }
};

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export function normalizeRichText(value, fallback = "") {
  const text = String(value || fallback || "")
    .replace(/\\n/g, "\n")
    .replace(/\r/g, "")
    .trim();

  if (!text) return "";
  if (/<\/?[a-z][\s\S]*>/i.test(text)) {
    return sanitizeHtml(text, SANITIZE_OPTIONS).trim();
  }

  return text
    .split(/\n{2,}/)
    .map((paragraph) => `<p>${escapeHtml(paragraph).replace(/\n/g, "<br>")}</p>`)
    .join("");
}

export function richTextIsEmpty(value) {
  return sanitizeHtml(String(value || ""), {
    allowedTags: [],
    allowedAttributes: {}
  })
    .replace(/&nbsp;/gi, " ")
    .trim().length === 0;
}
