import { NavLink } from "react-router-dom";
import enlacesNavegacion from "./enlacesNavegacion";

function NavegacionMovil() {
  return (
    <nav
      aria-label="Navegación móvil"
      className="navegacion-movil-navegacion-movil"
    >
      {enlacesNavegacion.map((enlace) => {
        const Icono = enlace.icono;

        return (
          <NavLink
            className={({ isActive }) =>
              `navegacion-movil-enlace-opcion ${
                isActive ? "navegacion-movil-enlace-activo" : "navegacion-movil-enlace-inactivo"
              }`
            }
            end={enlace.exacto}
            key={enlace.to}
            to={enlace.to}
          >
            <Icono aria-hidden="true" className="navegacion-movil-icono-decorativo" />
            <span>{enlace.etiqueta}</span>
          </NavLink>
        );
      })}
    </nav>
  );
}

export default NavegacionMovil;
