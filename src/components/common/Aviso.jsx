import { FiCheckCircle, FiX } from "react-icons/fi";

function Aviso({ mensaje, onCerrar }) {
  if (!mensaje) return null;

  return (
    <div className="aviso-contenedor-flexible-check-circle-mensaje-x">
      <FiCheckCircle
        className="aviso-icono-check-circle"
        aria-hidden="true"
      />
      <span className="aviso-texto-mensaje">{mensaje}</span>
      <button
        aria-label="Cerrar aviso"
        className="aviso-boton-cerrar-aviso"
        onClick={onCerrar}
        type="button"
      >
        <FiX aria-hidden="true" />
      </button>
    </div>
  );
}

export default Aviso;
