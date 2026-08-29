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
      <section className="formula-detalle-seccion-formula-no-encontrada-volver">
        <h1 className="formula-detalle-titulo-principal-formula-no-encontrada">Fórmula no encontrada</h1>
        <Link className="formula-detalle-enlace-formulas" to="/formulas">Volver a fórmulas</Link>
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
    <div className="formula-detalle-lista-vertical-arrow-left-volver-a">
      <Link className="formula-detalle-enlace-volver-formulas" to="/formulas">
        <FiArrowLeft aria-hidden="true" /> Volver a fórmulas
      </Link>

      <section className="formula-detalle-seccion-nombre-pocion-efecto-deseado">
        <div className="formula-detalle-contenedor-nombre-nombre-pocion-efecto">
          <div className="formula-detalle-contenedor-flexible-nombre-nombre-pocion-efecto">
            <div className="formula-detalle-informacion-principal-formula">
              <div className="formula-detalle-contenedor-flexible-nombre">
                <InsigniaEstado estado={formula.estado} />
                <Link className="formula-detalle-enlace-gremios" to={`/gremios/${gremio.id}`}>{gremio.nombre}</Link>
              </div>
              <h1 className="formula-detalle-titulo-principal-nombre-pocion">{formula.nombrePocion}</h1>
              <p className="formula-detalle-descripcion-efecto-deseado">{formula.efectoDeseado}</p>
            </div>

            <div className="formula-detalle-contenedor-flexible">
              {formula.estado === "proposal" && puedeGestionar && (
                <button className="formula-detalle-boton-zap-abrir-votacion" onClick={() => onTransition(formula.id, "voting")} type="button">
                  <FiZap aria-hidden="true" /> Abrir votación
                </button>
              )}
              {formula.estado === "voting" && puedeGestionar && (
                <button className="formula-detalle-boton-lock-cerrar-votacion" onClick={() => onTransition(formula.id, "closed")} type="button">
                  <FiLock aria-hidden="true" /> Cerrar votación
                </button>
              )}
              {formula.estado === "closed" && puedeGestionar && (
                <button className="formula-detalle-boton-destilar-resultado" onClick={() => onDistill(formula.id)} type="button">
                  <GiPotionBall aria-hidden="true" /> Destilar resultado
                </button>
              )}
            </div>
          </div>

          <dl className="formula-detalle-lista-datos-user-creada-por-activity">
            <div className="formula-detalle-contenedor-flexible-user-creada-por">
              <FiUser className="formula-detalle-icono-user" aria-hidden="true" />
              <div><dt className="formula-detalle-nombre-dato-creada-por">Creada por</dt><dd className="formula-detalle-valor-dato">{creador?.nombreCompleto}</dd></div>
            </div>
            <div className="formula-detalle-contenedor-flexible-activity-dificultad-nivel-dificultad">
              <FiActivity className="formula-detalle-icono-activity" aria-hidden="true" />
              <div><dt className="formula-detalle-nombre-dato-dificultad">Dificultad</dt><dd className="formula-detalle-valor-dato-nivel-dificultad-de-4">Nivel {formula.dificultad} de 4</dd></div>
            </div>
            <div className="formula-detalle-contenedor-flexible-calendar-fecha-de-cierre">
              <FiCalendar className="formula-detalle-icono-calendar" aria-hidden="true" />
              <div><dt className="formula-detalle-nombre-dato-fecha-de-cierre">Fecha de cierre</dt><dd className="formula-detalle-valor-dato-fecha">{formatearFecha(formula.fechaCierre, true)}</dd></div>
            </div>
            <div className="formula-detalle-contenedor-flexible-clock-disponibilidad-tiempo-restante">
              <FiClock className="formula-detalle-icono-clock" aria-hidden="true" />
              <div><dt className="formula-detalle-nombre-dato-disponibilidad">Disponibilidad</dt><dd className="formula-detalle-valor-dato-tiempo-restante">{formula.estado === "voting" ? tiempoRestante(formula.fechaCierre) : "Etapa completada"}</dd></div>
            </div>
          </dl>
        </div>

        <div className="formula-detalle-panel">
          <PasosEstadoFormula estado={formula.estado} />
        </div>
      </section>

      {formula.estado === "distilled" && pocion ? (
        <section className="formula-detalle-seccion-check-circle-resultado-destilado">
          <div className="formula-detalle-contenedor-flexible-check-circle-resultado-destilado">
            <div className="formula-detalle-contenedor-check-circle-resultado-destilado">
              <p className="formula-detalle-descripcion-check-circle-resultado-destilado"><FiCheckCircle aria-hidden="true" /> Resultado destilado</p>
              <h2 className="formula-detalle-titulo-seccion-nombre">{pocion.nombre}</h2>
              <p className="formula-detalle-descripcion-efecto">{pocion.efecto}</p>
            </div>
            <div className="formula-detalle-cuadricula-dificultad-real-dificultad-real">
              <div className="formula-detalle-panel-dificultad-real-dificultad-real"><span className="formula-detalle-texto-dificultad-real">Dificultad real</span><strong className="formula-detalle-dato-destacado-dificultad-real">{pocion.dificultadReal}</strong></div>
              <div className="formula-detalle-panel-rareza-rareza"><span className="formula-detalle-texto-rareza">Rareza</span><strong className="formula-detalle-dato-destacado-rareza">{pocion.rareza}</strong></div>
            </div>
          </div>
          <Link className="formula-detalle-enlace-grimorio" to="/grimorio"><FiBookOpen aria-hidden="true" /> Abrir en el grimorio</Link>
        </section>
      ) : (
        <div className="formula-detalle-cuadricula-mesa-de-votacion-decide">
          <section className="formula-detalle-seccion-mesa-de-votacion-decide">
            <div className="formula-detalle-contenedor-flexible-mesa-de-votacion-decide">
              <div>
                <p className="formula-detalle-descripcion-mesa-de-votacion">Mesa de votación</p>
                <h2 className="formula-detalle-titulo-seccion-decide-la-composicion">Decide la composición</h2>
              </div>
              <span className="formula-detalle-texto-length-3-categorias-completadas">{Object.keys(votosFormula).length}/3 categorías completadas</span>
            </div>

            {!puedeVotar && formula.estado !== "voting" && (
              <p className="formula-detalle-descripcion-la-votacion-no-esta">La votación no está abierta. Los resultados actuales se muestran en modo de consulta.</p>
            )}

            <div className="formula-detalle-lista-vertical-map">
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

          <aside className="formula-detalle-panel-lateral-tu-influencia-rol-especialidad">
            <section className="formula-detalle-seccion-tu-influencia-rol-especialidad">
              <p className="formula-detalle-descripcion-tu-influencia">Tu influencia</p>
              <h2 className="formula-detalle-titulo-seccion-rol">{rol}</h2>
              <p className="formula-detalle-descripcion-especialidad-especialidad">Especialidad: <strong className="formula-detalle-dato-destacado-especialidad">{usuario.especialidad}</strong></p>
              {catadorOficial && (
                <div className="formula-detalle-panel-shield-catador-oficial-tu">
                  <p className="formula-detalle-descripcion-shield-catador-oficial"><FiShield aria-hidden="true" /> Catador Oficial</p>
                  <p className="formula-detalle-descripcion-tu-voto-vale-doble">Tu voto vale doble y tienes un veto disponible por fórmula.</p>
                </div>
              )}
              {formula.veto && (
                <p className="formula-detalle-descripcion-el-veto-de-esta">El veto de esta fórmula ya fue utilizado.</p>
              )}
            </section>

            <section className="formula-detalle-seccion-registro-de-auditoria-map">
              <p className="formula-detalle-descripcion-registro-de-auditoria">Registro de auditoría</p>
              <div className="formula-detalle-lista-auditoria">
                {eventos.length > 0 ? eventos.map((evento) => (
                  <article className="formula-detalle-tarjeta-titulo-detalle-fecha" key={evento.id}>
                    <span className="formula-detalle-indicador" />
                    <h3 className="formula-detalle-titulo-tarjeta">{evento.titulo}</h3>
                    <p className="formula-detalle-descripcion-detalle">{evento.detalle}</p>
                    <time className="formula-detalle-elemento-time-fecha">{formatearFecha(evento.fecha, true)}</time>
                  </article>
                )) : <p className="formula-detalle-descripcion-aun-no-hay-eventos">Aún no hay eventos registrados.</p>}
              </div>
            </section>
          </aside>
        </div>
      )}
    </div>
  );
}

export default FormulaDetallePage;
