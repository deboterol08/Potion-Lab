import { Link } from "react-router-dom";
import { FiArrowRight, FiLock, FiUsers } from "react-icons/fi";
import { GiHerbsBundle } from "react-icons/gi";
import { obtenerRol } from "../../utils/roles";

function TarjetaGremio({ gremio, usuarioId, onJoin }) {
  const pertenece = gremio.miembros.some((miembro) => miembro.usuarioId === usuarioId);
  const rol = obtenerRol(gremio, usuarioId);

  return (
    <article className="tarjeta-gremio-tarjeta-publico-nombre-lema">
      <div className="tarjeta-gremio-franja-color" style={{ background: gremio.acento }} />
      <div className="tarjeta-gremio-contenedor-flexible-publico-nombre-lema">
        <div className="tarjeta-gremio-contenedor-flexible-publico">
          <span
            className="tarjeta-gremio-insignia"
            style={{ backgroundColor: `${gremio.acento}18`, color: gremio.acento }}
          >
            <GiHerbsBundle aria-hidden="true" />
          </span>
          <span className="tarjeta-gremio-texto-publico">
            {gremio.tipo === "privado" && <FiLock aria-hidden="true" />}
            {gremio.tipo === "publico" ? "Público" : "Privado"}
          </span>
        </div>

        <div className="tarjeta-gremio-contenedor-flexible-nombre-lema">
          <h2 className="tarjeta-gremio-titulo-seccion-nombre">{gremio.nombre}</h2>
          <p className="tarjeta-gremio-descripcion-lema">“{gremio.lema}”</p>
          <p className="tarjeta-gremio-descripcion">
            {gremio.descripcion}
          </p>
        </div>

        <div className="tarjeta-gremio-contenedor-flexible-users-length-miembros">
          <span className="tarjeta-gremio-texto-users-length-miembros">
            <FiUsers aria-hidden="true" /> {gremio.miembros.length} miembros
          </span>
          {pertenece && <span className="tarjeta-gremio-texto-rol">{rol}</span>}
        </div>

        {pertenece ? (
          <Link
            className="tarjeta-gremio-enlace-gremios"
            to={`/gremios/${gremio.id}`}
          >
            Entrar al gremio <FiArrowRight aria-hidden="true" />
          </Link>
        ) : (
          <button
            className="tarjeta-gremio-boton-unirme-al-gremio"
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
