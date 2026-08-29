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
      className="modal-cuadricula-titulo-x-children"
      role="presentation"
      onMouseDown={(evento) => {
        if (evento.target === evento.currentTarget) onCerrar();
      }}
    >
      <section
        aria-describedby={descripcion ? "modal-description" : undefined}
        aria-labelledby="modal-title"
        aria-modal="true"
        className="modal-seccion-titulo-x-children"
        role="dialog"
      >
        <div className="modal-contenedor-flexible-titulo-x">
          <div>
            <h2 id="modal-title" className="modal-titulo-seccion">
              {titulo}
            </h2>
            {descripcion && (
              <p id="modal-description" className="modal-descripcion">
                {descripcion}
              </p>
            )}
          </div>
          <button
            aria-label="Cerrar ventana"
            className="modal-boton-cerrar-ventana"
            onClick={onCerrar}
            type="button"
          >
            <FiX aria-hidden="true" />
          </button>
        </div>
        <div className="modal-contenedor-children">{children}</div>
      </section>
    </div>
  );
}

export default Modal;
