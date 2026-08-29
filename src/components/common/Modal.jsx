import { FiX } from "react-icons/fi";

// Componente reutilizable para mostrar una ventana emergente con contenido personalizado.
function Modal({ abierto, titulo, descripcion, onCerrar, children }) {
  if (!abierto) return null;

  return (
    <div
      className="modal-cuadricula-titulo-x-children"
      onMouseDown={(evento) => {
        if (evento.target === evento.currentTarget) onCerrar();
      }}
    >
      <section className="modal-seccion-titulo-x-children">
        <div className="modal-contenedor-flexible-titulo-x">
          <div>
            <h2 className="modal-titulo-seccion">{titulo}</h2>

            {descripcion && (
              <p className="modal-descripcion">{descripcion}</p>
            )}
          </div>

          <button
            className="modal-boton-cerrar-ventana"
            onClick={onCerrar}
            type="button"
          >
            <FiX />
          </button>
        </div>

        <div className="modal-contenedor-children">
          {children}
        </div>
      </section>
    </div>
  );
}

export default Modal;