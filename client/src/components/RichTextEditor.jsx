import { useEffect, useRef } from "react";
import { sanitizeRichText } from "../lib/richText";

const toolbarActions = [
  { label: "Párrafo", command: "formatBlock", value: "p" },
  { label: "Título", command: "formatBlock", value: "h3" },
  { label: "Negrita", command: "bold", shortLabel: "B" },
  { label: "Cursiva", command: "italic", shortLabel: "I" },
  { label: "Subrayado", command: "underline", shortLabel: "U" },
  { label: "Lista", command: "insertUnorderedList", shortLabel: "• Lista" },
  { label: "Lista numerada", command: "insertOrderedList", shortLabel: "1. Lista" },
  { label: "Cita", command: "formatBlock", value: "blockquote" },
  { label: "Quitar formato", command: "removeFormat", shortLabel: "Limpiar" }
];

export default function RichTextEditor({ value, onChange }) {
  const editorRef = useRef(null);

  useEffect(() => {
    const editor = editorRef.current;
    if (!editor || document.activeElement === editor) return;
    const safeValue = sanitizeRichText(value);
    if (editor.innerHTML !== safeValue) editor.innerHTML = safeValue;
  }, [value]);

  function emitChange() {
    onChange(sanitizeRichText(editorRef.current?.innerHTML || ""));
  }

  function applyAction(event, action) {
    event.preventDefault();
    editorRef.current?.focus();
    document.execCommand(action.command, false, action.value || null);
    emitChange();
  }

  return (
    <div className="rich-text-editor">
      <div className="rich-text-toolbar" role="toolbar" aria-label="Formato de descripción">
        {toolbarActions.map((action) => (
          <button
            key={action.label}
            type="button"
            title={action.label}
            aria-label={action.label}
            onMouseDown={(event) => applyAction(event, action)}
          >
            {action.shortLabel || action.label}
          </button>
        ))}
      </div>
      <div
        ref={editorRef}
        className="rich-text-content"
        contentEditable
        suppressContentEditableWarning
        role="textbox"
        aria-label="Descripción"
        aria-multiline="true"
        data-placeholder="Escribí la descripción de la propiedad..."
        onInput={emitChange}
        onBlur={emitChange}
      />
    </div>
  );
}
