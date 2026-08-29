import { FiCheck } from "react-icons/fi";

const pasos = [
  ["proposal", "Propuesta"],
  ["voting", "Votación"],
  ["closed", "Cierre"],
  ["distilled", "Destilación"],
];

function PasosEstadoFormula({ estado }) {
  const indiceActual = pasos.findIndex(([id]) => id === estado);

  return (
    <ol aria-label="Progreso de la fórmula" className="pasos-formula-lista-ordenada-progreso-de-la-formula">
      {pasos.map(([id, etiqueta], indice) => {
        const completado = indice < indiceActual;
        const activo = indice === indiceActual;

        return (
          <li className="pasos-formula-elemento-lista-etiqueta" key={id}>
            <span
              className={`pasos-formula-indicador-etapa ${
                completado
                  ? "pasos-formula-etapa-completada"
                  : activo
                    ? "pasos-formula-etapa-activa"
                    : "pasos-formula-etapa-pendiente"
              }`}
            >
              {completado ? <FiCheck aria-hidden="true" /> : indice + 1}
            </span>
            <span className={`pasos-formula-nombre-etapa ${activo ? "pasos-formula-nombre-activo" : "pasos-formula-nombre-inactivo"}`}>
              {etiqueta}
            </span>
          </li>
        );
      })}
    </ol>
  );
}

export default PasosEstadoFormula;
