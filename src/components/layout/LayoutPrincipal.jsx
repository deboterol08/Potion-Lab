import { Outlet } from "react-router-dom";
import FondoAlquimico from "../common/FondoAlquimico";
import BarraLateral from "./BarraLateral";
import BarraSuperior from "./BarraSuperior";
import NavegacionMovil from "./NavegacionMovil";

function LayoutPrincipal({ usuario, onLogout }) {
  return (
    <div className="min-h-screen text-slate-100">
      <FondoAlquimico />
      <BarraLateral />
      <div className="min-h-screen lg:pl-64">
        <BarraSuperior usuario={usuario} onLogout={onLogout} />
        <main className="mx-auto w-full max-w-[1500px] px-4 pt-8 pb-28 sm:px-6 lg:px-8 lg:pt-10 lg:pb-12">
          <Outlet />
        </main>
      </div>
      <NavegacionMovil />
    </div>
  );
}

export default LayoutPrincipal;
