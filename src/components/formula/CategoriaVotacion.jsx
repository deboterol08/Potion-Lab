import { FiCheck, FiShield, FiSlash } from "react-icons/fi";
import { calcularResultados } from "../../utils/voting";

function CategoriaVotacion({
  categoria,
  opcionSeleccionada,
  pesoVoto,
  veto,
  puedeVotar,
  puedeVetar,
  onVote,
  onVeto,
}) {
  const resultados = calcularResultados(
    categoria,
    opcionSeleccionada,
    pesoVoto,
    veto,
  );

  return (
    <fieldset className="rounded-2xl border border-white/8 bg-black/10 p-4 sm:p-5">
      <legend className="w-full px-1">
        <span className="flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
          <span>
            <strong className="block text-sm text-white">{categoria.nombre}</strong>
            <small className="mt-1 block text-xs font-normal text-slate-500">
              {categoria.descripcion}
            </small>
          </span>
          <span className="w-fit rounded-full bg-violet-300/8 px-2.5 py-1 text-[10px] font-bold text-violet-200 ring-1 ring-violet-300/15">
            Peso de tu voto: {pesoVoto.toFixed(1)}×
          </span>
        </span>
      </legend>

      <div className="mt-5 grid gap-3 md:grid-cols-2">
        {resultados.map((opcion) => {
          const seleccionada = opcion.id === opcionSeleccionada;

          return (
            <article
              className={`relative overflow-hidden rounded-xl border p-4 transition ${
                opcion.vetada
                  ? "border-rose-300/15 bg-rose-300/[0.035] opacity-65"
                  : seleccionada
                    ? "border-cyan-300/35 bg-cyan-300/[0.07] shadow-lg shadow-cyan-950/15"
                    : "border-white/8 bg-white/[0.025] hover:border-white/15"
              }`}
              key={opcion.id}
            >
              <button
                aria-pressed={seleccionada}
                className="focus-ring flex w-full items-center gap-3 rounded-lg text-left"
                disabled={!puedeVotar || opcion.vetada}
                onClick={() => onVote(categoria.id, opcion.id)}
                type="button"
              >
                <span className={`grid size-11 shrink-0 place-items-center rounded-xl text-xs font-extrabold ring-1 ${
                  seleccionada
                    ? "bg-cyan-300/15 text-cyan-200 ring-cyan-300/30"
                    : "bg-white/5 text-slate-400 ring-white/10"
                }`}>
                  {opcion.vetada ? <FiSlash aria-hidden="true" /> : opcion.sigla}
                </span>
                <span className="min-w-0 flex-1">
                  <strong className="block text-sm text-slate-100">{opcion.nombre}</strong>
                  <small className="mt-1 flex items-center gap-1 text-[10px] text-slate-500">
                    {opcion.vetada ? (
                      "Opción vetada"
                    ) : seleccionada ? (
                      <><FiCheck aria-hidden="true" /> Tu elección</>
                    ) : puedeVotar ? (
                      "Elegir opción"
                    ) : (
                      "Votación no disponible"
                    )}
                  </small>
                </span>
              </button>

              <div className="mt-4">
                <div className="mb-2 flex items-center justify-between text-[10px]">
                  <span className="text-slate-500">
                    {opcion.totalVotos.toFixed(1)} votos ponderados
                  </span>
                  <strong className="text-slate-300">{opcion.porcentaje}%</strong>
                </div>
                <div
                  aria-label={`${opcion.nombre}: ${opcion.porcentaje}%`}
                  aria-valuemax="100"
                  aria-valuemin="0"
                  aria-valuenow={opcion.porcentaje}
                  className="h-1.5 overflow-hidden rounded-full bg-black/25"
                  role="progressbar"
                >
                  <span
                    className={`block h-full rounded-full transition-all ${
                      seleccionada
                        ? "bg-gradient-to-r from-violet-400 to-cyan-300"
                        : "bg-slate-600"
                    }`}
                    style={{ width: `${opcion.porcentaje}%` }}
                  />
                </div>
              </div>

              {puedeVetar && !veto && (
                <button
                  className="focus-ring mt-4 flex items-center gap-2 rounded-lg px-2 py-1.5 text-[10px] font-bold text-rose-300 transition hover:bg-rose-300/8"
                  onClick={() => onVeto(categoria.id, opcion.id)}
                  type="button"
                >
                  <FiShield aria-hidden="true" /> Aplicar veto de Catador
                </button>
              )}
            </article>
          );
        })}
      </div>
    </fieldset>
  );
}

export default CategoriaVotacion;
