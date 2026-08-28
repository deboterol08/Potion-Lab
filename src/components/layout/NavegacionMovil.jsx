import { NavLink } from "react-router-dom";
import enlacesNavegacion from "./enlacesNavegacion";

function NavegacionMovil() {
  return (
    <nav
      aria-label="Navegación móvil"
      className="fixed right-3 bottom-3 left-3 z-40 mx-auto grid max-w-lg grid-cols-5 rounded-2xl border border-white/10 bg-[#101329]/95 p-1.5 pb-[max(0.375rem,env(safe-area-inset-bottom))] shadow-2xl shadow-black/40 backdrop-blur-xl lg:hidden"
    >
      {enlacesNavegacion.map(({ to, etiqueta, icono: Icono, exacto }) => (
        <NavLink
          aria-label={etiqueta}
          className={({ isActive }) =>
            `focus-ring relative flex min-h-12 flex-col items-center justify-center gap-1 rounded-xl text-[9px] font-bold transition ${
              isActive
                ? "bg-violet-400/14 text-violet-100 ring-1 ring-violet-300/12"
                : "text-slate-500 hover:bg-white/4 hover:text-slate-300"
            }`
          }
          end={exacto}
          key={to}
          to={to}
        >
          <Icono aria-hidden="true" className="text-lg" />
          <span className="hidden min-[380px]:block">{etiqueta}</span>
        </NavLink>
      ))}
    </nav>
  );
}

export default NavegacionMovil;
