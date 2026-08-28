import { Link } from "react-router-dom";
import { FiArrowUpRight, FiCalendar, FiLayers, FiUser } from "react-icons/fi";
import { formatearFecha, tiempoRestante } from "../../utils/formatters";
import InsigniaEstado from "../common/InsigniaEstado";

function TarjetaFormula({ formula, gremio, creador, votosCompletados = 0 }) {
  return (
    <article className="glass-panel group flex h-full flex-col rounded-2xl p-5 transition duration-300 hover:-translate-y-1 hover:border-violet-300/20">
      <div className="flex items-start justify-between gap-3">
        <InsigniaEstado estado={formula.estado} />
        <span className="flex items-center gap-1 text-[10px] font-bold text-slate-600">
          <FiLayers aria-hidden="true" /> Nivel {formula.dificultad}
        </span>
      </div>

      <div className="mt-5 flex-1">
        <p className="text-[10px] font-extrabold tracking-[0.16em] text-violet-300/75 uppercase">
          {gremio?.nombre ?? "Gremio desconocido"}
        </p>
        <h2 className="font-display mt-2 text-xl font-semibold text-white">
          {formula.nombrePocion}
        </h2>
        <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-400">
          {formula.efectoDeseado}
        </p>
      </div>

      <div className="mt-6 grid gap-2 border-y border-white/8 py-4 text-xs text-slate-500">
        <span className="flex items-center gap-2">
          <FiUser aria-hidden="true" className="text-slate-600" />
          {creador?.nombreCompleto ?? "Alquimista desconocido"}
        </span>
        <span className="flex items-center gap-2">
          <FiCalendar aria-hidden="true" className="text-slate-600" />
          {formula.estado === "voting"
            ? tiempoRestante(formula.fechaCierre)
            : formatearFecha(formula.fechaCierre)}
        </span>
      </div>

      {formula.estado === "voting" && (
        <div className="mt-4">
          <div className="mb-2 flex justify-between text-[10px] font-bold text-slate-500">
            <span>Tu participación</span>
            <span>{votosCompletados}/3</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-white/5">
            <span
              className="block h-full rounded-full bg-gradient-to-r from-violet-400 to-cyan-300 transition-all"
              style={{ width: `${(votosCompletados / 3) * 100}%` }}
            />
          </div>
        </div>
      )}

      <Link
        className="focus-ring mt-5 flex items-center justify-between rounded-xl bg-white/[0.035] px-4 py-3 text-xs font-bold text-slate-300 transition group-hover:bg-violet-400/10 group-hover:text-violet-100"
        to={`/formulas/${formula.id}`}
      >
        {formula.estado === "voting" ? "Abrir mesa de votación" : "Ver expediente"}
        <FiArrowUpRight aria-hidden="true" className="text-base" />
      </Link>
    </article>
  );
}

export default TarjetaFormula;
