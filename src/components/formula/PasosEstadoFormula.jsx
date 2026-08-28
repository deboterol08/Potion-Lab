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
    <ol aria-label="Progreso de la fórmula" className="grid grid-cols-4 gap-1">
      {pasos.map(([id, etiqueta], indice) => {
        const completado = indice < indiceActual;
        const activo = indice === indiceActual;

        return (
          <li className="relative text-center" key={id}>
            {indice > 0 && (
              <span
                aria-hidden="true"
                className={`absolute top-4 right-1/2 h-px w-full ${
                  indice <= indiceActual ? "bg-violet-300/50" : "bg-white/10"
                }`}
              />
            )}
            <span
              className={`relative mx-auto grid size-8 place-items-center rounded-full border text-xs font-bold ${
                completado
                  ? "border-violet-300/40 bg-violet-400/20 text-violet-200"
                  : activo
                    ? "border-cyan-300/50 bg-cyan-300/15 text-cyan-200 shadow-lg shadow-cyan-950/30"
                    : "border-white/10 bg-white/[0.03] text-slate-600"
              }`}
            >
              {completado ? <FiCheck aria-hidden="true" /> : indice + 1}
            </span>
            <span className={`mt-2 block text-[10px] font-bold ${activo ? "text-slate-200" : "text-slate-600"}`}>
              {etiqueta}
            </span>
          </li>
        );
      })}
    </ol>
  );
}

export default PasosEstadoFormula;
