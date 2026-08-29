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
      <div className="gremio-detalle-contenedor-gremio-no-encontrado-volver">
        <h1 className="gremio-detalle-titulo-principal-gremio-no-encontrado">Gremio no encontrado</h1>
        <Link className="gremio-detalle-enlace-gremios" to="/gremios">
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
    <div className="gremio-detalle-lista-vertical-arrow-left-volver-a">
      <Link className="gremio-detalle-enlace-volver-gremios" to="/gremios">
        <FiArrowLeft aria-hidden="true" /> Volver a gremios
      </Link>

      <section className="gremio-detalle-seccion-gremio-publico-nombre">
        <div className="gremio-detalle-franja-color" style={{ background: gremio.acento }} />
        <div className="gremio-detalle-contenedor-flexible-gremio-publico-nombre">
          <div className="gremio-detalle-identidad-gremio">
            {gremio.emblemaUrl ? (
              <img alt={`Emblema de ${gremio.nombre}`} className="gremio-detalle-imagen" src={gremio.emblemaUrl} />
            ) : (
              <span className="gremio-detalle-insignia" style={{ backgroundColor: `${gremio.acento}16`, color: gremio.acento }}>
                <GiHerbsBundle aria-hidden="true" />
              </span>
            )}
            <div>
              <p className="gremio-detalle-descripcion-gremio-publico">
                {gremio.tipo === "privado" && <FiLock aria-hidden="true" />}
                Gremio {gremio.tipo === "publico" ? "público" : "privado"}
              </p>
              <h1 className="gremio-detalle-titulo-principal-nombre">{gremio.nombre}</h1>
              <p className="gremio-detalle-descripcion-lema">“{gremio.lema}”</p>
              <p className="gremio-detalle-descripcion">{gremio.descripcion}</p>
            </div>
          </div>
          {puedeCrear && (
            <Link className="gremio-detalle-enlace-formulas-nueva-gremio" to={`/formulas/nueva?gremio=${gremio.id}`}>
              <FiPlus aria-hidden="true" /> Nueva fórmula
            </Link>
          )}
        </div>
      </section>

      <section className="gremio-detalle-cuadricula">
        <TarjetaEstadistica detalle="alquimistas activos" etiqueta="Miembros" icono={FiUsers} tono="cyan" valor={gremio.miembros.length} />
        <TarjetaEstadistica detalle="en todos los estados" etiqueta="Fórmulas" icono={FiLayers} tono="violet" valor={formulasGremio.length} />
        <TarjetaEstadistica detalle="guardadas en el grimorio" etiqueta="Destiladas" icono={FiBookOpen} tono="amber" valor={destiladas} />
      </section>

      <section className="gremio-detalle-seccion-sala-del-gremio-miembros">
        <div className="gremio-detalle-contenedor-flexible-sala-del-gremio-miembros">
          <div>
            <p className="gremio-detalle-descripcion-sala-del-gremio">Sala del gremio</p>
            <h2 className="gremio-detalle-titulo-seccion-miembros-y-roles">Miembros y roles</h2>
          </div>
          {puedeAdministrar && (
            <span className="gremio-detalle-texto-controles-de-gran-maestre">
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
        <div className="gremio-detalle-contenedor-flexible-mesa-de-trabajo-formulas">
          <div>
            <p className="gremio-detalle-descripcion-mesa-de-trabajo">Mesa de trabajo</p>
            <h2 className="gremio-detalle-titulo-seccion-formulas-del-gremio">Fórmulas del gremio</h2>
          </div>
          <Link className="gremio-detalle-enlace-formulas" to="/formulas">Ver todas</Link>
        </div>
        <div className="gremio-detalle-cuadricula-map">
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
