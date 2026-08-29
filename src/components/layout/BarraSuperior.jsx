import { useContext } from "react";
import { Link } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { GiPotionBall } from "react-icons/gi";
import UsuarioContext from "../../context/UsuarioContext";
import { obtenerIniciales } from "../../utils/formatters";

function BarraSuperior({ onLogout }) {
  const usuario = useContext(UsuarioContext);
  return (
    <header className="barra-superior-encabezado-potion-lab-laboratorio-conectado">
      <div className="barra-superior-contenedor-flexible-potion-lab-laboratorio-conectado">
        <Link className="barra-superior-enlace-potion-lab" to="/">
          <span className="barra-superior-insignia">
            <GiPotionBall />
          </span>
          <strong className="barra-superior-dato-destacado-potion-lab">Potion Lab</strong>
        </Link>

        <div className="barra-superior-contenedor-laboratorio-conectado-todo-listo">
          <p className="barra-superior-descripcion-laboratorio-conectado">
            <span className="barra-superior-indicador" />
            Laboratorio conectado
          </p>
          <p className="barra-superior-descripcion-todo-listo-para-una">
            Todo listo para una nueva destilación.
          </p>
        </div>

        <div className="barra-superior-contenedor-flexible-bell-nombre-completo-especialidad">
          <Link
            className="barra-superior-enlace-perfil"
            to="/perfil"
          >
            {usuario.avatarUrl ? (
              <img
                alt={`Avatar de ${usuario.nombreCompleto}`}
                className="barra-superior-imagen"
                src={usuario.avatarUrl}
              />
            ) : (
              <span className="barra-superior-insignia-iniciales">
                {obtenerIniciales(usuario.nombreCompleto)}
              </span>
            )}
            <span className="barra-superior-texto-nombre-completo-especialidad">
              <strong className="barra-superior-dato-destacado-nombre-completo">
                {usuario.nombreCompleto}
              </strong>
              <small className="barra-superior-detalle-especialidad">{usuario.especialidad}</small>
            </span>
          </Link>

          <button
            aria-label="Cerrar sesión"
            className="barra-superior-boton-cerrar-sesion"
            onClick={onLogout}
            title="Cerrar sesión"
            type="button"
          >
            <FiLogOut />
          </button>
        </div>
      </div>
    </header>
  );
}

export default BarraSuperior;
