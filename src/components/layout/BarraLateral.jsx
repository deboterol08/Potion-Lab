import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { FiZap } from "react-icons/fi";
import { GiPotionBall } from "react-icons/gi";
import UsuarioContext from "../../context/UsuarioContext";
import enlacesNavegacion from "./enlacesNavegacion";

function BarraLateral() {
  const usuario = useContext(UsuarioContext);
  const puntos = usuario?.puntos ?? 0;
  const nivel = Math.floor(puntos / 100) + 1;
  const progresoNivel = puntos % 100;

  return (
    <aside className="barra-lateral-panel-lateral-potion-lab-academia-arcana">
      <div className="barra-lateral-contenedor-flexible-potion-lab-academia-arcana">
        <span className="barra-lateral-insignia">
          <GiPotionBall />
        </span>
        <span>
          <strong className="barra-lateral-dato-destacado-potion-lab">
            Potion Lab
          </strong>
          <small className="barra-lateral-detalle-academia-arcana">
            Academia arcana
          </small>
        </span>
      </div>

      <nav aria-label="Navegación principal" className="barra-lateral-navegacion-principal">
        <p className="barra-lateral-descripcion-laboratorio">
          Laboratorio
        </p>
        {enlacesNavegacion.map(({ to, etiqueta, icono: Icono, exacto }) => (
          <NavLink
            className={({ isActive }) =>
              `barra-lateral-enlace-opcion ${
                isActive
                  ? "barra-lateral-enlace-activo"
                  : "barra-lateral-enlace-inactivo"
              }`
            }
            end={exacto}
            key={to}
            to={to}
          >
            <Icono className="barra-lateral-icono-decorativo" />
            {etiqueta}
          </NavLink>
        ))}
      </nav>

      <div className="barra-lateral-lista-vertical-zap-nivel-nivel-progreso">
        <section className="barra-lateral-seccion-progreso-del-alquimista" aria-label="Progreso del alquimista">
          <div className="barra-lateral-contenedor-flexible-zap-nivel-nivel-progreso">
            <span className="barra-lateral-texto-zap-nivel-nivel">
              <FiZap className="barra-lateral-icono-zap" /> Nivel {nivel}
            </span>
            <small className="barra-lateral-detalle-progreso-nivel-100-px">{progresoNivel}/100 PX</small>
          </div>
          <div className="barra-lateral-barra-progreso">
            <span
              className="barra-lateral-relleno-progreso"
              style={{ width: `${progresoNivel}%` }}
            />
          </div>
        </section>

        <section className="barra-lateral-seccion-consejo-del-dia-puedes">
          <p className="barra-lateral-descripcion-consejo-del-dia">Consejo del día</p>
          <p className="barra-lateral-descripcion-puedes-cambiar-tu-eleccion">
            Puedes cambiar tu elección mientras una fórmula siga abierta.
          </p>
        </section>
      </div>
    </aside>
  );
}

export default BarraLateral;
