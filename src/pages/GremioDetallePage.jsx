import { Link, useParams } from "react-router-dom";
import { FiArrowLeft, FiBookOpen, FiLayers, FiLock, FiPlus, FiUsers } from "react-icons/fi";
import { GiHerbsBundle } from "react-icons/gi";
import TarjetaEstadistica from "../components/common/TarjetaEstadistica";
import TarjetaFormula from "../components/formula/TarjetaFormula";
import ListaMiembros from "../components/gremio/ListaMiembros";
import { puedeAdministrarGremio, puedeCrearFormula } from "../utils/roles";

function GremioDetallePage({
  usuario,
  usuarios,
  gremios,
  formulas,
  votos,
  onChangeRole,
  onAppointTaster,
}) {
  const { gremioId } = useParams();
  const gremio = gremios.find((item) => item.id === gremioId);

  if (!gremio) {
    return (
      <div className="glass-panel rounded-2xl p-8 text-center">
        <h1 className="font-display text-2xl text-white">Gremio no encontrado</h1>
        <Link className="mt-5 inline-flex text-sm font-bold text-violet-300" to="/gremios">
          Volver a gremios
        </Link>
      </div>
    );
  }

  const formulasGremio = formulas.filter((formula) => formula.gremioId === gremio.id);
  const destiladas = formulasGremio.filter((formula) => formula.estado === "distilled").length;
  const puedeAdministrar = puedeAdministrarGremio(gremio, usuario.id);
  const puedeCrear = puedeCrearFormula(gremio, usuario);

  return (
    <div className="space-y-8">
      <Link className="focus-ring inline-flex items-center gap-2 rounded-lg text-xs font-bold text-slate-500 transition hover:text-white" to="/gremios">
        <FiArrowLeft aria-hidden="true" /> Volver a gremios
      </Link>

      <section className="glass-panel relative overflow-hidden rounded-3xl p-6 sm:p-8">
        <div className="absolute inset-x-0 top-0 h-1.5" style={{ background: gremio.acento }} />
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-5">
            {gremio.emblemaUrl ? (
              <img alt={`Emblema de ${gremio.nombre}`} className="size-20 rounded-2xl object-cover ring-1 ring-white/15" src={gremio.emblemaUrl} />
            ) : (
              <span className="grid size-20 shrink-0 place-items-center rounded-2xl text-3xl ring-1 ring-white/12" style={{ backgroundColor: `${gremio.acento}16`, color: gremio.acento }}>
                <GiHerbsBundle aria-hidden="true" />
              </span>
            )}
            <div>
              <p className="flex items-center gap-2 text-[10px] font-extrabold tracking-[0.16em] text-slate-500 uppercase">
                {gremio.tipo === "privado" && <FiLock aria-hidden="true" />}
                Gremio {gremio.tipo === "publico" ? "público" : "privado"}
              </p>
              <h1 className="font-display mt-2 text-3xl font-semibold text-white sm:text-4xl">{gremio.nombre}</h1>
              <p className="mt-2 text-sm italic text-slate-400">“{gremio.lema}”</p>
              <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-500">{gremio.descripcion}</p>
            </div>
          </div>
          {puedeCrear && (
            <Link className="focus-ring flex shrink-0 items-center justify-center gap-2 rounded-xl bg-violet-500 px-4 py-3 text-xs font-extrabold text-white hover:bg-violet-400" to={`/formulas/nueva?gremio=${gremio.id}`}>
              <FiPlus aria-hidden="true" /> Nueva fórmula
            </Link>
          )}
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        <TarjetaEstadistica detalle="alquimistas activos" etiqueta="Miembros" icono={FiUsers} tono="cyan" valor={gremio.miembros.length} />
        <TarjetaEstadistica detalle="en todos los estados" etiqueta="Fórmulas" icono={FiLayers} tono="violet" valor={formulasGremio.length} />
        <TarjetaEstadistica detalle="guardadas en el grimorio" etiqueta="Destiladas" icono={FiBookOpen} tono="amber" valor={destiladas} />
      </section>

      <section className="glass-panel overflow-hidden rounded-2xl">
        <div className="flex items-center justify-between border-b border-white/8 px-5 py-5 sm:px-6">
          <div>
            <p className="text-[10px] font-extrabold tracking-[0.16em] text-cyan-300 uppercase">Sala del gremio</p>
            <h2 className="font-display mt-1 text-xl font-semibold text-white">Miembros y roles</h2>
          </div>
          {puedeAdministrar && (
            <span className="rounded-full bg-amber-300/8 px-3 py-1 text-[10px] font-bold text-amber-200 ring-1 ring-amber-300/15">
              Controles de Gran Maestre
            </span>
          )}
        </div>
        <ListaMiembros
          gremio={gremio}
          onAppointTaster={(usuarioId) => onAppointTaster(gremio.id, usuarioId)}
          onChangeRole={(usuarioId, rol) => onChangeRole(gremio.id, usuarioId, rol)}
          puedeAdministrar={puedeAdministrar}
          usuarios={usuarios}
        />
      </section>

      <section>
        <div className="mb-4 flex items-end justify-between gap-4">
          <div>
            <p className="text-[10px] font-extrabold tracking-[0.16em] text-violet-300 uppercase">Mesa de trabajo</p>
            <h2 className="font-display mt-1 text-2xl font-semibold text-white">Fórmulas del gremio</h2>
          </div>
          <Link className="focus-ring text-xs font-bold text-slate-500 hover:text-white" to="/formulas">Ver todas</Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {formulasGremio.slice(0, 6).map((formula) => (
            <TarjetaFormula
              creador={usuarios.find((item) => item.id === formula.creadaPorId)}
              formula={formula}
              gremio={gremio}
              key={formula.id}
              votosCompletados={Object.keys(votos[formula.id] ?? {}).length}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

export default GremioDetallePage;
