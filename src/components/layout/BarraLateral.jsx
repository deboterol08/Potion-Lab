import { NavLink } from "react-router-dom";
import { FiZap } from "react-icons/fi";
import { GiPotionBall } from "react-icons/gi";
import enlacesNavegacion from "./enlacesNavegacion";

function BarraLateral({ usuario }) {
  const puntos = usuario?.puntos ?? 0;
  const nivel = Math.floor(puntos / 100) + 1;
  const progresoNivel = puntos % 100;

  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-[17rem] border-r border-white/8 bg-[#090c1c]/92 backdrop-blur-xl lg:flex lg:flex-col">
      <div className="flex h-20 items-center gap-3 border-b border-white/8 px-6">
        <span className="grid size-11 place-items-center rounded-2xl bg-gradient-to-br from-violet-400/25 to-cyan-300/15 text-2xl text-cyan-100 shadow-lg shadow-violet-950/30 ring-1 ring-white/12">
          <GiPotionBall aria-hidden="true" />
        </span>
        <span>
          <strong className="font-display block text-base tracking-wide text-white">
            Potion Lab
          </strong>
          <small className="text-[10px] font-bold tracking-[0.2em] text-slate-500 uppercase">
            Academia arcana
          </small>
        </span>
      </div>

      <nav aria-label="Navegación principal" className="flex-1 space-y-1 px-4 py-7">
        <p className="mb-3 px-3 text-[10px] font-extrabold tracking-[0.2em] text-slate-600 uppercase">
          Laboratorio
        </p>
        {enlacesNavegacion.map(({ to, etiqueta, icono: Icono, exacto }) => (
          <NavLink
            className={({ isActive }) =>
              `focus-ring relative flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition ${
                isActive
                  ? "bg-violet-400/12 text-white ring-1 ring-violet-300/20 before:absolute before:top-2.5 before:bottom-2.5 before:left-0 before:w-0.5 before:rounded-full before:bg-cyan-300"
                  : "text-slate-400 hover:bg-white/5 hover:text-slate-100"
              }`
            }
            end={exacto}
            key={to}
            to={to}
          >
            <Icono aria-hidden="true" className="text-lg text-violet-200" />
            {etiqueta}
          </NavLink>
        ))}
      </nav>

      <div className="m-4 space-y-3">
        <section className="surface-soft rounded-2xl p-4" aria-label="Progreso del alquimista">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-xs font-bold text-slate-200">
              <FiZap className="text-amber-200" aria-hidden="true" /> Nivel {nivel}
            </span>
            <small className="text-[10px] text-slate-500">{progresoNivel}/100 PX</small>
          </div>
          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/6">
            <span
              className="block h-full rounded-full bg-gradient-to-r from-violet-400 to-cyan-300"
              style={{ width: `${progresoNivel}%` }}
            />
          </div>
        </section>

        <section className="rounded-2xl border border-amber-300/15 bg-amber-300/6 p-4">
          <p className="text-xs font-bold text-amber-200">Consejo del día</p>
          <p className="mt-2 text-xs leading-5 text-slate-400">
            Puedes cambiar tu elección mientras una fórmula siga abierta.
          </p>
        </section>
      </div>
    </aside>
  );
}

export default BarraLateral;
