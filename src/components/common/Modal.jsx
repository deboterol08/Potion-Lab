import { useEffect } from "react";
import { FiX } from "react-icons/fi";

function Modal({ abierto, titulo, descripcion, onCerrar, children }) {
  useEffect(() => {
    if (!abierto) return undefined;

    function cerrarConEscape(evento) {
      if (evento.key === "Escape") onCerrar();
    }

    document.addEventListener("keydown", cerrarConEscape);
    return () => document.removeEventListener("keydown", cerrarConEscape);
  }, [abierto, onCerrar]);

  if (!abierto) return null;

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-end bg-slate-950/80 p-0 backdrop-blur-sm sm:place-items-center sm:p-6"
      role="presentation"
      onMouseDown={(evento) => {
        if (evento.target === evento.currentTarget) onCerrar();
      }}
    >
      <section
        aria-describedby={descripcion ? "modal-description" : undefined}
        aria-labelledby="modal-title"
        aria-modal="true"
        className="glass-panel max-h-[92vh] w-full max-w-xl overflow-y-auto rounded-t-3xl p-6 sm:rounded-3xl sm:p-8"
        role="dialog"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 id="modal-title" className="font-display text-2xl font-semibold text-white">
              {titulo}
            </h2>
            {descripcion && (
              <p id="modal-description" className="mt-2 text-sm leading-6 text-slate-400">
                {descripcion}
              </p>
            )}
          </div>
          <button
            aria-label="Cerrar ventana"
            className="focus-ring grid size-10 shrink-0 place-items-center rounded-xl bg-white/5 text-slate-300 transition hover:bg-white/10 hover:text-white"
            onClick={onCerrar}
            type="button"
          >
            <FiX aria-hidden="true" />
          </button>
        </div>
        <div className="mt-7">{children}</div>
      </section>
    </div>
  );
}

export default Modal;
