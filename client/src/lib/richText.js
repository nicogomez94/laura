const ALLOWED_TAGS = new Set([
  "P", "BR", "STRONG", "B", "EM", "I", "U", "UL", "OL", "LI",
  "H2", "H3", "H4", "BLOCKQUOTE", "A"
]);

function escapeHtml(value) {
  const element = document.createElement("div");
  element.textContent = value;
  return element.innerHTML;
}

function plainTextToHtml(value) {
  return value
    .split(/\n{2,}/)
    .map((paragraph) => `<p>${escapeHtml(paragraph).replace(/\n/g, "<br>")}</p>`)
    .join("");
}

export function sanitizeRichText(value) {
  const text = String(value || "")
    .replace(/\\n/g, "\n")
    .replace(/\r/g, "")
    .trim();

  if (!text) return "";
  if (!/<\/?[a-z][\s\S]*>/i.test(text)) return plainTextToHtml(text);

  const parsed = new DOMParser().parseFromString(text, "text/html");
  const elements = [...parsed.body.querySelectorAll("*")].reverse();

  for (const element of elements) {
    if (!ALLOWED_TAGS.has(element.tagName)) {
      element.replaceWith(...element.childNodes);
      continue;
    }

    for (const attribute of [...element.attributes]) {
      const keepLinkAttribute =
        element.tagName === "A" && ["href", "target", "rel"].includes(attribute.name);
      if (!keepLinkAttribute) element.removeAttribute(attribute.name);
    }

    if (element.tagName === "A") {
      const href = element.getAttribute("href") || "";
      if (!/^(https?:|mailto:|tel:|#)/i.test(href)) element.removeAttribute("href");
      if (element.getAttribute("target") === "_blank") {
        element.setAttribute("rel", "noopener noreferrer");
      }
    }
  }

  return parsed.body.innerHTML;
}
