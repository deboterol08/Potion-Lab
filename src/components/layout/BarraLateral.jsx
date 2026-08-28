import { NavLink } from "react-router-dom";
import { GiPotionBall } from "react-icons/gi";
import enlacesNavegacion from "./enlacesNavegacion";

function BarraLateral() {
  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 border-r border-white/8 bg-[#0a0d1d]/88 backdrop-blur-xl lg:flex lg:flex-col">
      <div className="flex h-20 items-center gap-3 border-b border-white/8 px-6">
        <span className="grid size-11 place-items-center rounded-2xl bg-gradient-to-br from-violet-400/25 to-cyan-300/15 text-2xl text-cyan-200 ring-1 ring-white/12">
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
              `focus-ring flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition ${
                isActive
                  ? "bg-violet-400/12 text-white ring-1 ring-violet-300/20"
                  : "text-slate-400 hover:bg-white/5 hover:text-slate-100"
              }`
            }
            end={exacto}
            key={to}
            to={to}
          >
            <Icono aria-hidden="true" className="text-lg" />
            {etiqueta}
          </NavLink>
        ))}
      </nav>

      <div className="m-4 rounded-2xl border border-amber-300/15 bg-amber-300/6 p-4">
        <p className="text-xs font-bold text-amber-200">Consejo del día</p>
        <p className="mt-2 text-xs leading-5 text-slate-400">
          Puedes cambiar tu elección mientras una fórmula siga abierta.
        </p>
      </div>
    </aside>
  );
}

export default BarraLateral;
