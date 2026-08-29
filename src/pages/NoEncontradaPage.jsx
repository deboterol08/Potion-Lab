import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { GiBrokenBottle } from "react-icons/gi";

function NoEncontradaPage() {
  return (
    <section className="pagina-no-encontrada-seccion-error-404-esta-formula">
      <span className="pagina-no-encontrada-insignia"><GiBrokenBottle aria-hidden="true" /></span>
      <p className="pagina-no-encontrada-descripcion-error-404">Error 404</p>
      <h1 className="pagina-no-encontrada-titulo-principal-esta-formula-se-evaporo">Esta fórmula se evaporó</h1>
      <p className="pagina-no-encontrada-descripcion-la-pagina-que-buscas">La página que buscas no existe o cambió de ubicación dentro del laboratorio.</p>
      <Link className="pagina-no-encontrada-enlace-arrow-left-volver-al" to="/"><FiArrowLeft aria-hidden="true" /> Volver al resumen</Link>
    </section>
  );
}

export default NoEncontradaPage;
