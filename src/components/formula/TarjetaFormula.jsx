import { Link } from "react-router-dom";
import { FiArrowUpRight, FiCalendar, FiLayers, FiUser } from "react-icons/fi";
import { formatearFecha, tiempoRestante } from "../../utils/formatters";
import InsigniaEstado from "../common/InsigniaEstado";

function TarjetaFormula({ formula, gremio, creador, votosCompletados = 0 }) {
  return (
    <article className="tarjeta-formula-tarjeta-layers-nivel-dificultad-nombre">
      <div className="tarjeta-formula-contenedor-flexible-layers-nivel-dificultad">
        <InsigniaEstado estado={formula.estado} />
        <span className="tarjeta-formula-texto-layers-nivel-dificultad">
          <FiLayers /> Nivel {formula.dificultad}
        </span>
      </div>

      <div className="tarjeta-formula-contenedor-flexible-nombre-pocion-efecto-deseado">
        <p className="tarjeta-formula-descripcion">
          {gremio?.nombre ?? "Gremio desconocido"}
        </p>
        <h2 className="tarjeta-formula-titulo-seccion-nombre-pocion">
          {formula.nombrePocion}
        </h2>
        <p className="tarjeta-formula-descripcion-efecto-deseado">
          {formula.efectoDeseado}
        </p>
      </div>

      <div className="tarjeta-formula-cuadricula-user-calendar-tiempo-restante">
        <span className="tarjeta-formula-texto-user">
          <FiUser className="tarjeta-formula-icono-user" />
          {creador?.nombreCompleto ?? "Alquimista desconocido"}
        </span>
        <span className="tarjeta-formula-texto-calendar-tiempo-restante">
          <FiCalendar className="tarjeta-formula-icono-calendar" />
          {formula.estado === "voting"
            ? tiempoRestante(formula.fechaCierre)
            : formatearFecha(formula.fechaCierre)}
        </span>
      </div>

      {formula.estado === "voting" && (
        <div className="tarjeta-formula-contenedor-tu-participacion-votos-completados">
          <div className="tarjeta-formula-contenedor-flexible-tu-participacion-votos-completados">
            <span>Tu participación</span>
            <span>{votosCompletados}/3</span>
          </div>
          <div className="tarjeta-formula-barra-progreso">
            <span
              className="tarjeta-formula-relleno-progreso"
              style={{ width: `${(votosCompletados / 3) * 100}%` }}
            />
          </div>
        </div>
      )}

      <Link
        className="tarjeta-formula-enlace-formulas"
        to={`/formulas/${formula.id}`}
      >
        {formula.estado === "voting" ? "Abrir mesa de votación" : "Ver expediente"}
        <FiArrowUpRight className="tarjeta-formula-icono-arrow-up-right" />
      </Link>
    </article>
  );
}

export default TarjetaFormula;
