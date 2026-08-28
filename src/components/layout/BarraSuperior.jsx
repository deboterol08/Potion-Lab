import { Link } from "react-router-dom";
import { FiBell, FiChevronDown, FiLogOut } from "react-icons/fi";
import { GiPotionBall } from "react-icons/gi";
import { obtenerIniciales } from "../../utils/formatters";

function BarraSuperior({ usuario, onLogout }) {
  return (
    <header className="sticky top-0 z-20 border-b border-white/8 bg-[#080a16]/82 backdrop-blur-xl">
      <div className="flex h-20 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link className="focus-ring flex items-center gap-3 rounded-xl lg:hidden" to="/">
          <span className="grid size-10 place-items-center rounded-xl bg-violet-400/15 text-xl text-cyan-100 ring-1 ring-white/10">
            <GiPotionBall aria-hidden="true" />
          </span>
          <strong className="font-display text-sm text-white">Potion Lab</strong>
        </Link>

        <div className="hidden lg:block">
          <p className="flex items-center gap-2 text-xs font-bold tracking-[0.16em] text-slate-500 uppercase">
            <span className="size-1.5 rounded-full bg-emerald-300 shadow-[0_0_10px_rgba(110,231,183,0.8)]" />
            Laboratorio conectado
          </p>
          <p className="mt-1 text-sm text-slate-300">
            Todo listo para una nueva destilación.
          </p>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            aria-label="Notificaciones"
            className="focus-ring relative grid size-10 place-items-center rounded-xl text-slate-400 transition hover:bg-white/5 hover:text-white"
            type="button"
          >
            <FiBell aria-hidden="true" />
            <span className="absolute top-2 right-2 size-2 rounded-full bg-amber-300 ring-2 ring-[#080a16]" />
          </button>

          <Link
            className="focus-ring flex items-center gap-3 rounded-xl border border-transparent px-2 py-1.5 transition hover:border-white/8 hover:bg-white/4"
            to="/perfil"
          >
            {usuario.avatarUrl ? (
              <img
                alt={`Avatar de ${usuario.nombreCompleto}`}
                className="size-10 rounded-xl object-cover ring-1 ring-white/15"
                src={usuario.avatarUrl}
              />
            ) : (
              <span className="grid size-10 place-items-center rounded-xl bg-gradient-to-br from-violet-400/25 to-cyan-300/15 text-xs font-extrabold text-white ring-1 ring-white/12">
                {obtenerIniciales(usuario.nombreCompleto)}
              </span>
            )}
            <span className="hidden text-left sm:block">
              <strong className="block max-w-40 truncate text-xs text-white">
                {usuario.nombreCompleto}
              </strong>
              <small className="text-[11px] text-slate-500">{usuario.especialidad}</small>
            </span>
            <FiChevronDown aria-hidden="true" className="hidden text-slate-600 sm:block" />
          </Link>

          <button
            aria-label="Cerrar sesión"
            className="focus-ring grid size-10 place-items-center rounded-xl text-slate-500 transition hover:bg-rose-400/10 hover:text-rose-300"
            onClick={onLogout}
            title="Cerrar sesión"
            type="button"
          >
            <FiLogOut aria-hidden="true" />
          </button>
        </div>
      </div>
    </header>
  );
}

export default BarraSuperior;
