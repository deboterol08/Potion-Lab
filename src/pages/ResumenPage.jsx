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

function ResumenPage({
  usuario,
  gremios,
  formulas,
  votos,
  usuarios,
  grimorio,
}) {
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
    <div className="resumen-lista-vertical-ver-todas-arrow-right">
      <EncabezadoPagina
        etiqueta="Panel principal"
        titulo={`Buenas noches, ${usuario.nombreCompleto.split(" ")[0]}`}
        descripcion="Tu laboratorio está sincronizado. Revisa las fórmulas abiertas y participa en las decisiones de tus gremios."
        acciones={
          <Link
            className="resumen-enlace-formulas-nueva"
            to="/formulas/nueva"
          >
            <FiPlus aria-hidden="true" /> Nueva fórmula
          </Link>
        }
      />

      <section
        aria-label="Indicadores personales"
        className="resumen-cuadricula-indicadores-personales"
      >
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

      <div className="resumen-cuadricula-prioridad-del-laboratorio-formulas">
        <section>
          <div className="resumen-contenedor-flexible-prioridad-del-laboratorio-formulas">
            <div>
              <p className="resumen-descripcion-prioridad-del-laboratorio">
                Prioridad del laboratorio
              </p>
              <h2 className="resumen-titulo-seccion-formulas-que-requieren-atencion">
                Fórmulas que requieren atención
              </h2>
            </div>
            <Link
              className="resumen-enlace-formulas"
              to="/formulas"
            >
              Ver todas <FiArrowRight aria-hidden="true" />
            </Link>
          </div>

          <div className="resumen-cuadricula-map">
            {formulasActivas.slice(0, 2).map((formula) => (
              <TarjetaFormula
                creador={usuarios.find(
                  (item) => item.id === formula.creadaPorId,
                )}
                formula={formula}
                gremio={gremios.find((item) => item.id === formula.gremioId)}
                key={formula.id}
                votosCompletados={Object.keys(votos[formula.id] ?? {}).length}
              />
            ))}
          </div>
        </section>

        <aside className="resumen-panel-lateral-grimorio-ultimas-destilaciones-book">
          <div className="resumen-contenedor-flexible-grimorio-ultimas-destilaciones-book">
            <div>
              <p className="resumen-descripcion-grimorio">
                Grimorio
              </p>
              <h2 className="resumen-titulo-seccion-ultimas-destilaciones">
                Últimas destilaciones
              </h2>
            </div>
            <span className="resumen-insignia-book-open">
              <FiBookOpen aria-hidden="true" />
            </span>
          </div>

          <div className="resumen-lista-vertical-map">
            {grimorio.slice(0, 3).map((pocion, indice) => (
              <article
                className="resumen-tarjeta-pad-start-nombre-rareza"
                key={pocion.id}
              >
                <div className="resumen-contenedor-flexible-pad-start-nombre-rareza">
                  <span className="resumen-insignia-pad-start">
                    {String(indice + 1).padStart(2, "0")}
                  </span>
                  <div className="resumen-contenedor-nombre-rareza-rareza">
                    <h3 className="resumen-titulo-tarjeta-nombre">
                      {pocion.nombre}
                    </h3>
                    <p className="resumen-descripcion-rareza-rareza">
                      Rareza {pocion.rareza}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <Link
            className="resumen-enlace-grimorio"
            to="/grimorio"
          >
            Explorar el grimorio <FiArrowRight aria-hidden="true" />
          </Link>
        </aside>
      </div>

      <section>
        <div className="resumen-contenedor-flexible-comunidad-tus-gremios-explorar">
          <div>
            <p className="resumen-descripcion-comunidad">
              Comunidad
            </p>
            <h2 className="resumen-titulo-seccion-tus-gremios">
              Tus gremios
            </h2>
          </div>
          <Link
            className="resumen-enlace-gremios"
            to="/gremios"
          >
            Explorar <FiArrowRight aria-hidden="true" />
          </Link>
        </div>
        <div className="resumen-cuadricula-mis-gremios">
          {misGremios.slice(0, 3).map((gremio) => (
            <TarjetaGremio
              gremio={gremio}
              key={gremio.id}
              usuarioId={usuario.id}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

export default ResumenPage;
