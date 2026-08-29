import { Outlet } from "react-router-dom";
import FondoAlquimico from "../common/FondoAlquimico";
import BarraLateral from "./BarraLateral";
import BarraSuperior from "./BarraSuperior";

function LayoutPrincipal({ onLogout }) {
  return (
    <div className="layout-principal-aplicacion">
      <FondoAlquimico />
      <BarraLateral />
      <div className="layout-principal-contenido-con-barra">
        <BarraSuperior onLogout={onLogout} />
        <main className="layout-principal-pantalla">
          <Outlet />
        </main>
      </div>
      <NavegacionMovil />
    </div>
  );
}

export default LayoutPrincipal;
