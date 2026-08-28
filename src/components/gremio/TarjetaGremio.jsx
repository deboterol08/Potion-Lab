import { Link } from "react-router-dom";
import { FiArrowRight, FiLock, FiUsers } from "react-icons/fi";
import { GiHerbsBundle } from "react-icons/gi";
import { obtenerRol } from "../../utils/roles";

function TarjetaGremio({ gremio, usuarioId, onJoin }) {
  const pertenece = gremio.miembros.some((miembro) => miembro.usuarioId === usuarioId);
  const rol = obtenerRol(gremio, usuarioId);

  return (
    <article className="glass-panel group flex h-full flex-col overflow-hidden rounded-2xl">
      <div className="h-1.5" style={{ background: gremio.acento }} />
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-4">
          <span
            className="grid size-12 place-items-center rounded-2xl text-xl ring-1 ring-white/10"
            style={{ backgroundColor: `${gremio.acento}18`, color: gremio.acento }}
          >
            <GiHerbsBundle aria-hidden="true" />
          </span>
          <span className="flex items-center gap-1.5 rounded-full bg-white/5 px-2.5 py-1 text-[10px] font-bold text-slate-400 ring-1 ring-white/8">
            {gremio.tipo === "privado" && <FiLock aria-hidden="true" />}
            {gremio.tipo === "publico" ? "Público" : "Privado"}
          </span>
        </div>

        <div className="mt-5 flex-1">
          <h2 className="font-display text-xl font-semibold text-white">{gremio.nombre}</h2>
          <p className="mt-2 text-xs italic text-slate-500">“{gremio.lema}”</p>
          <p className="mt-4 line-clamp-2 text-sm leading-6 text-slate-400">
            {gremio.descripcion}
          </p>
        </div>

        <div className="mt-6 flex items-center justify-between border-t border-white/8 pt-4 text-xs">
          <span className="flex items-center gap-2 text-slate-500">
            <FiUsers aria-hidden="true" /> {gremio.miembros.length} miembros
          </span>
          {pertenece && <span className="font-bold text-violet-200">{rol}</span>}
        </div>

        {pertenece ? (
          <Link
            className="focus-ring mt-4 flex items-center justify-between rounded-xl bg-white/[0.035] px-4 py-3 text-xs font-bold text-slate-300 transition group-hover:bg-violet-400/10 group-hover:text-white"
            to={`/gremios/${gremio.id}`}
          >
            Entrar al gremio <FiArrowRight aria-hidden="true" />
          </Link>
        ) : (
          <button
            className="focus-ring mt-4 rounded-xl border border-violet-300/20 bg-violet-300/8 px-4 py-3 text-xs font-bold text-violet-200 transition hover:bg-violet-300/14"
            onClick={() => onJoin(gremio)}
            type="button"
          >
            {gremio.tipo === "publico" ? "Unirme al gremio" : "Ingresar código"}
          </button>
        )}
      </div>
    </article>
  );
}

export default TarjetaGremio;
