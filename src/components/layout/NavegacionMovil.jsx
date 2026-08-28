import { NavLink } from "react-router-dom";
import enlacesNavegacion from "./enlacesNavegacion";

function NavegacionMovil() {
  return (
    <nav
      aria-label="Navegación móvil"
      className="fixed right-3 bottom-3 left-3 z-40 grid grid-cols-5 rounded-2xl border border-white/10 bg-[#101329]/94 p-1.5 shadow-2xl backdrop-blur-xl lg:hidden"
    >
      {enlacesNavegacion.map(({ to, etiqueta, icono: Icono, exacto }) => (
        <NavLink
          aria-label={etiqueta}
          className={({ isActive }) =>
            `focus-ring flex min-h-12 flex-col items-center justify-center gap-1 rounded-xl text-[9px] font-bold transition ${
              isActive ? "bg-violet-400/14 text-violet-200" : "text-slate-500"
            }`
          }
          end={exacto}
          key={to}
          to={to}
        >
          <Icono aria-hidden="true" className="text-lg" />
          <span>{etiqueta}</span>
        </NavLink>
      ))}
    </nav>
  );
}

export default NavegacionMovil;
