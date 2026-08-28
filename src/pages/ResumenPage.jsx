import { Link } from "react-router-dom";
import {
  FiArrowRight,
  FiBookOpen,
  FiLayers,
  FiPlus,
  FiTrendingUp,
  FiUsers,
} from "react-icons/fi";
import { GiSparkles } from "react-icons/gi";
import EncabezadoPagina from "../components/common/EncabezadoPagina";
import TarjetaEstadistica from "../components/common/TarjetaEstadistica";
import TarjetaFormula from "../components/formula/TarjetaFormula";
import TarjetaGremio from "../components/gremio/TarjetaGremio";

function ResumenPage({ usuario, gremios, formulas, votos, usuarios, grimorio }) {
  const misGremios = gremios.filter((gremio) =>
    gremio.miembros.some((miembro) => miembro.usuarioId === usuario.id),
  );
  const formulasActivas = formulas.filter(
    (formula) =>
      formula.estado === "voting" &&
      misGremios.some((gremio) => gremio.id === formula.gremioId),
  );
  const votosCompletados = Object.values(votos).reduce(
    (total, votosFormula) => total + Object.keys(votosFormula).length,
    0,
  );

  return (
    <div className="space-y-9">
      <EncabezadoPagina
        etiqueta="Panel principal"
        titulo={`Buenas noches, ${usuario.nombreCompleto.split(" ")[0]}`}
        descripcion="Tu laboratorio está sincronizado. Revisa las fórmulas abiertas y participa en las decisiones de tus gremios."
        acciones={
          <Link
            className="focus-ring flex items-center gap-2 rounded-xl bg-violet-500 px-4 py-3 text-xs font-extrabold text-white shadow-lg shadow-violet-950/30 transition hover:-translate-y-0.5 hover:bg-violet-400"
            to="/formulas/nueva"
          >
            <FiPlus aria-hidden="true" /> Nueva fórmula
          </Link>
        }
      />

      <section aria-label="Indicadores personales" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <TarjetaEstadistica
          detalle="en tu perfil"
          etiqueta="Puntos de alquimia"
          icono={GiSparkles}
          tono="violet"
          valor={usuario.puntos}
        />
        <TarjetaEstadistica
          detalle={`${misGremios.length === 1 ? "gremio activo" : "gremios activos"}`}
          etiqueta="Tus gremios"
          icono={FiUsers}
          tono="cyan"
          valor={misGremios.length}
        />
        <TarjetaEstadistica
          detalle="esperan tu criterio"
          etiqueta="Votaciones abiertas"
          icono={FiLayers}
          tono="amber"
          valor={formulasActivas.length}
        />
        <TarjetaEstadistica
          detalle={`${votosCompletados} elecciones guardadas`}
          etiqueta="Participación"
          icono={FiTrendingUp}
          tono="emerald"
          valor={`${usuario.participacion}%`}
        />
      </section>

      <div className="grid gap-6 xl:grid-cols-[1.55fr_0.75fr]">
        <section>
          <div className="mb-4 flex items-end justify-between gap-4">
            <div>
              <p className="text-[10px] font-extrabold tracking-[0.17em] text-cyan-300 uppercase">
                Prioridad del laboratorio
              </p>
              <h2 className="font-display mt-1 text-2xl font-semibold text-white">
                Fórmulas que requieren atención
              </h2>
            </div>
            <Link className="focus-ring hidden items-center gap-2 rounded-lg text-xs font-bold text-slate-400 hover:text-white sm:flex" to="/formulas">
              Ver todas <FiArrowRight aria-hidden="true" />
            </Link>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {formulasActivas.slice(0, 2).map((formula) => (
              <TarjetaFormula
                creador={usuarios.find((item) => item.id === formula.creadaPorId)}
                formula={formula}
                gremio={gremios.find((item) => item.id === formula.gremioId)}
                key={formula.id}
                votosCompletados={Object.keys(votos[formula.id] ?? {}).length}
              />
            ))}
          </div>
        </section>

        <aside className="glass-panel rounded-2xl p-5 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] font-extrabold tracking-[0.16em] text-violet-300 uppercase">
                Grimorio
              </p>
              <h2 className="font-display mt-1 text-xl font-semibold text-white">
                Últimas destilaciones
              </h2>
            </div>
            <span className="grid size-10 place-items-center rounded-xl bg-amber-300/8 text-amber-200 ring-1 ring-amber-300/15">
              <FiBookOpen aria-hidden="true" />
            </span>
          </div>

          <div className="mt-6 space-y-3">
            {grimorio.slice(0, 3).map((pocion, indice) => (
              <article className="rounded-xl border border-white/7 bg-white/[0.025] p-4" key={pocion.id}>
                <div className="flex items-start gap-3">
                  <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-violet-300/8 text-[10px] font-extrabold text-violet-200">
                    {String(indice + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0">
                    <h3 className="line-clamp-2 text-xs leading-5 font-bold text-slate-200">
                      {pocion.nombre}
                    </h3>
                    <p className="mt-1 text-[10px] text-slate-600">Rareza {pocion.rareza}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <Link className="focus-ring mt-5 flex items-center justify-center gap-2 rounded-xl border border-white/8 px-4 py-3 text-xs font-bold text-slate-300 transition hover:bg-white/5 hover:text-white" to="/grimorio">
            Explorar el grimorio <FiArrowRight aria-hidden="true" />
          </Link>
        </aside>
      </div>

      <section>
        <div className="mb-4 flex items-end justify-between">
          <div>
            <p className="text-[10px] font-extrabold tracking-[0.17em] text-cyan-300 uppercase">
              Comunidad
            </p>
            <h2 className="font-display mt-1 text-2xl font-semibold text-white">Tus gremios</h2>
          </div>
          <Link className="focus-ring flex items-center gap-2 rounded-lg text-xs font-bold text-slate-400 hover:text-white" to="/gremios">
            Explorar <FiArrowRight aria-hidden="true" />
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {misGremios.slice(0, 3).map((gremio) => (
            <TarjetaGremio gremio={gremio} key={gremio.id} usuarioId={usuario.id} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default ResumenPage;
