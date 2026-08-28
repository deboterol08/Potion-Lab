import { Link, useParams } from "react-router-dom";
import {
  FiActivity,
  FiArrowLeft,
  FiBookOpen,
  FiCalendar,
  FiCheckCircle,
  FiClock,
  FiLock,
  FiShield,
  FiUser,
  FiZap,
} from "react-icons/fi";
import { GiPotionBall } from "react-icons/gi";
import InsigniaEstado from "../components/common/InsigniaEstado";
import CategoriaVotacion from "../components/formula/CategoriaVotacion";
import PasosEstadoFormula from "../components/formula/PasosEstadoFormula";
import { formatearFecha, tiempoRestante } from "../utils/formatters";
import { esCatadorOficial, obtenerRol } from "../utils/roles";
import { obtenerPesoVoto } from "../utils/voting";

function FormulaDetallePage({
  usuario,
  usuarios,
  gremios,
  formulas,
  votos,
  grimorio,
  auditoria,
  onVote,
  onVeto,
  onTransition,
  onDistill,
}) {
  const { formulaId } = useParams();
  const formula = formulas.find((item) => item.id === formulaId);

  if (!formula) {
    return (
      <section className="glass-panel rounded-2xl p-8 text-center">
        <h1 className="font-display text-2xl text-white">Fórmula no encontrada</h1>
        <Link className="mt-5 inline-flex text-sm font-bold text-violet-300" to="/formulas">Volver a fórmulas</Link>
      </section>
    );
  }

  const gremio = gremios.find((item) => item.id === formula.gremioId);
  const creador = usuarios.find((item) => item.id === formula.creadaPorId);
  const rol = obtenerRol(gremio, usuario.id);
  const esMiembro = rol !== "Visitante";
  const catadorOficial = esCatadorOficial(gremio, usuario.id);
  const puedeGestionar = ["Gran Maestre", "Alquimista sénior"].includes(rol);
  const puedeVotar = formula.estado === "voting" && esMiembro;
  const puedeVetar = formula.estado === "voting" && catadorOficial;
  const votosFormula = votos[formula.id] ?? {};
  const pocion = grimorio.find((item) => item.formulaId === formula.id);
  const eventos = auditoria
    .filter((evento) => evento.formulaId === formula.id)
    .sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

  return (
    <div className="space-y-7">
      <Link className="focus-ring inline-flex items-center gap-2 rounded-lg text-xs font-bold text-slate-500 hover:text-white" to="/formulas">
        <FiArrowLeft aria-hidden="true" /> Volver a fórmulas
      </Link>

      <section className="glass-panel overflow-hidden rounded-3xl">
        <div className="border-b border-white/8 p-6 sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl">
              <div className="flex flex-wrap items-center gap-3">
                <InsigniaEstado estado={formula.estado} />
                <Link className="text-xs font-bold text-slate-500 hover:text-violet-200" to={`/gremios/${gremio.id}`}>{gremio.nombre}</Link>
              </div>
              <h1 className="font-display mt-5 text-3xl font-semibold text-white md:text-4xl">{formula.nombrePocion}</h1>
              <p className="mt-4 text-sm leading-7 text-slate-400 md:text-base">{formula.efectoDeseado}</p>
            </div>

            <div className="flex flex-wrap gap-3">
              {formula.estado === "proposal" && puedeGestionar && (
                <button className="focus-ring flex items-center gap-2 rounded-xl bg-cyan-400 px-4 py-3 text-xs font-extrabold text-slate-950 hover:bg-cyan-300" onClick={() => onTransition(formula.id, "voting")} type="button">
                  <FiZap aria-hidden="true" /> Abrir votación
                </button>
              )}
              {formula.estado === "voting" && puedeGestionar && (
                <button className="focus-ring flex items-center gap-2 rounded-xl border border-amber-300/25 bg-amber-300/10 px-4 py-3 text-xs font-extrabold text-amber-100 hover:bg-amber-300/15" onClick={() => onTransition(formula.id, "closed")} type="button">
                  <FiLock aria-hidden="true" /> Cerrar votación
                </button>
              )}
              {formula.estado === "closed" && puedeGestionar && (
                <button className="focus-ring flex items-center gap-2 rounded-xl bg-violet-500 px-4 py-3 text-xs font-extrabold text-white hover:bg-violet-400" onClick={() => onDistill(formula.id)} type="button">
                  <GiPotionBall aria-hidden="true" /> Destilar resultado
                </button>
              )}
            </div>
          </div>

          <dl className="mt-7 grid gap-3 border-t border-white/8 pt-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex items-center gap-3">
              <FiUser className="text-slate-600" aria-hidden="true" />
              <div><dt className="text-[10px] text-slate-600">Creada por</dt><dd className="mt-1 text-xs font-bold text-slate-300">{creador?.nombreCompleto}</dd></div>
            </div>
            <div className="flex items-center gap-3">
              <FiActivity className="text-slate-600" aria-hidden="true" />
              <div><dt className="text-[10px] text-slate-600">Dificultad</dt><dd className="mt-1 text-xs font-bold text-slate-300">Nivel {formula.dificultad} de 4</dd></div>
            </div>
            <div className="flex items-center gap-3">
              <FiCalendar className="text-slate-600" aria-hidden="true" />
              <div><dt className="text-[10px] text-slate-600">Fecha de cierre</dt><dd className="mt-1 text-xs font-bold text-slate-300">{formatearFecha(formula.fechaCierre, true)}</dd></div>
            </div>
            <div className="flex items-center gap-3">
              <FiClock className="text-slate-600" aria-hidden="true" />
              <div><dt className="text-[10px] text-slate-600">Disponibilidad</dt><dd className="mt-1 text-xs font-bold text-slate-300">{formula.estado === "voting" ? tiempoRestante(formula.fechaCierre) : "Etapa completada"}</dd></div>
            </div>
          </dl>
        </div>

        <div className="bg-black/10 px-6 py-6 sm:px-8">
          <PasosEstadoFormula estado={formula.estado} />
        </div>
      </section>

      {formula.estado === "distilled" && pocion ? (
        <section className="relative overflow-hidden rounded-3xl border border-violet-300/20 bg-gradient-to-br from-violet-500/14 via-[#151832] to-cyan-300/7 p-6 sm:p-8">
          <div className="absolute -top-16 -right-16 size-52 rounded-full bg-violet-400/10 blur-3xl" aria-hidden="true" />
          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-3xl">
              <p className="flex items-center gap-2 text-[10px] font-extrabold tracking-[0.18em] text-amber-200 uppercase"><FiCheckCircle aria-hidden="true" /> Resultado destilado</p>
              <h2 className="font-display mt-3 text-2xl font-semibold text-white md:text-3xl">{pocion.nombre}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-400">{pocion.efecto}</p>
            </div>
            <div className="grid shrink-0 grid-cols-2 gap-3">
              <div className="rounded-2xl bg-black/15 px-5 py-4 text-center ring-1 ring-white/8"><span className="text-[10px] text-slate-500">Dificultad real</span><strong className="mt-1 block text-2xl text-cyan-200">{pocion.dificultadReal}</strong></div>
              <div className="rounded-2xl bg-black/15 px-5 py-4 text-center ring-1 ring-white/8"><span className="text-[10px] text-slate-500">Rareza</span><strong className="mt-1 block text-2xl text-amber-200">{pocion.rareza}</strong></div>
            </div>
          </div>
          <Link className="focus-ring relative mt-6 inline-flex items-center gap-2 rounded-xl bg-white/8 px-4 py-3 text-xs font-bold text-white hover:bg-white/12" to="/grimorio"><FiBookOpen aria-hidden="true" /> Abrir en el grimorio</Link>
        </section>
      ) : (
        <div className="grid gap-6 xl:grid-cols-[1.55fr_0.65fr]">
          <section className="glass-panel rounded-2xl p-5 sm:p-7">
            <div className="flex flex-col gap-4 border-b border-white/8 pb-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-[10px] font-extrabold tracking-[0.16em] text-cyan-300 uppercase">Mesa de votación</p>
                <h2 className="font-display mt-1 text-xl font-semibold text-white">Decide la composición</h2>
              </div>
              <span className="w-fit rounded-full bg-white/5 px-3 py-1.5 text-[10px] font-bold text-slate-400 ring-1 ring-white/8">{Object.keys(votosFormula).length}/3 categorías completadas</span>
            </div>

            {!puedeVotar && formula.estado !== "voting" && (
              <p className="mt-5 rounded-xl border border-amber-300/15 bg-amber-300/6 px-4 py-3 text-xs leading-5 text-amber-100">La votación no está abierta. Los resultados actuales se muestran en modo de consulta.</p>
            )}

            <div className="mt-5 space-y-4">
              {formula.categorias.map((categoria) => (
                <CategoriaVotacion
                  categoria={categoria}
                  key={categoria.id}
                  onVeto={(categoriaId, opcionId) => onVeto(formula.id, categoriaId, opcionId)}
                  onVote={(categoriaId, opcionId) => onVote(formula.id, categoriaId, opcionId)}
                  opcionSeleccionada={votosFormula[categoria.id]}
                  pesoVoto={obtenerPesoVoto(usuario, categoria.id, catadorOficial)}
                  puedeVetar={puedeVetar}
                  puedeVotar={puedeVotar}
                  veto={formula.veto}
                />
              ))}
            </div>
          </section>

          <aside className="space-y-5">
            <section className="glass-panel rounded-2xl p-5">
              <p className="text-[10px] font-extrabold tracking-[0.16em] text-violet-300 uppercase">Tu influencia</p>
              <h2 className="font-display mt-1 text-lg font-semibold text-white">{rol}</h2>
              <p className="mt-3 text-xs leading-5 text-slate-500">Especialidad: <strong className="text-slate-300">{usuario.especialidad}</strong></p>
              {catadorOficial && (
                <div className="mt-4 rounded-xl border border-cyan-300/15 bg-cyan-300/6 p-4">
                  <p className="flex items-center gap-2 text-xs font-bold text-cyan-200"><FiShield aria-hidden="true" /> Catador Oficial</p>
                  <p className="mt-2 text-[11px] leading-5 text-slate-400">Tu voto vale doble y tienes un veto disponible por fórmula.</p>
                </div>
              )}
              {formula.veto && (
                <p className="mt-4 rounded-xl bg-rose-300/7 px-3 py-3 text-[11px] leading-5 text-rose-200">El veto de esta fórmula ya fue utilizado.</p>
              )}
            </section>

            <section className="glass-panel rounded-2xl p-5">
              <p className="text-[10px] font-extrabold tracking-[0.16em] text-slate-500 uppercase">Registro de auditoría</p>
              <div className="mt-5 space-y-5">
                {eventos.length > 0 ? eventos.map((evento) => (
                  <article className="relative border-l border-white/10 pl-4" key={evento.id}>
                    <span className="absolute top-1 -left-1 size-2 rounded-full bg-violet-300 ring-4 ring-[#11142b]" />
                    <h3 className="text-xs font-bold text-slate-300">{evento.titulo}</h3>
                    <p className="mt-1 text-[10px] leading-5 text-slate-500">{evento.detalle}</p>
                    <time className="mt-2 block text-[9px] text-slate-700">{formatearFecha(evento.fecha, true)}</time>
                  </article>
                )) : <p className="text-xs text-slate-600">Aún no hay eventos registrados.</p>}
              </div>
            </section>
          </aside>
        </div>
      )}
    </div>
  );
}

export default FormulaDetallePage;
