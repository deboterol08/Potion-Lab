import { FiAlertTriangle, FiAward, FiTarget, FiTrendingUp } from "react-icons/fi";
import { GiLaurelsTrophy } from "react-icons/gi";
import EncabezadoPagina from "../components/common/EncabezadoPagina";
import { obtenerIniciales } from "../utils/formatters";

function RankingPage({ usuarios, usuarioActivo }) {
  const ranking = [...usuarios].sort((a, b) => b.puntos - a.puntos);
  const podio = ranking.slice(0, 3);

  return (
    <div className="ranking-lista-vertical-map-clasificacion-completa-alquimistas">
      <EncabezadoPagina descripcion="Compara puntos, rareza acumulada, precisión de catador y participación de los alquimistas." etiqueta="Temporada actual" titulo="Ranking alquímico" />

      <section className="ranking-cuadricula-map">
        {podio.map((usuario, indice) => {
          const tonos = ["ranking-podio-primero", "ranking-podio-segundo", "ranking-podio-tercero"];
          return (
            <article className={`ranking-tarjeta-podio ${tonos[indice]}`} key={usuario.id}>
              <span className="ranking-numero-posicion">0{indice + 1}</span>
              <span className="ranking-insignia-iniciales">{obtenerIniciales(usuario.nombreCompleto)}</span>
              <div className="ranking-contenedor-especialidad-nombre-completo"><p className="ranking-descripcion-especialidad">{usuario.especialidad}</p><h2 className="ranking-titulo-seccion-nombre-completo">{usuario.nombreCompleto}</h2></div>
              <div className="ranking-contenedor-flexible-puntos-puntos"><div><span className="ranking-texto-puntos">Puntos</span><strong className="ranking-dato-destacado-puntos">{usuario.puntos}</strong></div>{indice === 0 && <GiLaurelsTrophy className="ranking-elemento-gi-laurels-trophy" aria-hidden="true" />}</div>
            </article>
          );
        })}
      </section>

      <section className="ranking-seccion-clasificacion-completa-alquimistas-destacados">
        <div className="ranking-contenedor-flexible-clasificacion-completa-alquimistas-destacados"><div><p className="ranking-descripcion-clasificacion-completa">Clasificación completa</p><h2 className="ranking-titulo-seccion-alquimistas-destacados">Alquimistas destacados</h2></div><FiAward className="ranking-icono-award" aria-hidden="true" /></div>
        <div className="ranking-contenedor-posicion-alquimista-puntos-rareza">
          <table className="ranking-tabla-posicion-alquimista-puntos-rareza">
            <thead><tr className="ranking-fila-tabla-posicion-alquimista-puntos-rareza"><th className="ranking-titulo-columna-posicion">Posición</th><th className="ranking-titulo-columna-alquimista">Alquimista</th><th className="ranking-titulo-columna-puntos">Puntos</th><th className="ranking-titulo-columna-rareza">Rareza</th><th className="ranking-titulo-columna-precision">Precisión</th><th className="ranking-titulo-columna-participacion">Participación</th></tr></thead>
            <tbody>
              {ranking.map((usuario, indice) => (
                <tr className={`ranking-fila-clasificacion ${usuario.id === usuarioActivo.id ? "ranking-fila-usuario-activo" : ""}`} key={usuario.id}>
                  <td className="ranking-celda-posicion"><strong className={indice < 3 ? "ranking-posicion-podio" : "ranking-posicion-normal"}>#{indice + 1}</strong></td>
                  <td className="ranking-celda-iniciales-nombre-completo-especialidad"><div className="ranking-contenedor-flexible-iniciales-nombre-completo-especialidad"><span className="ranking-avatar-clasificacion">{obtenerIniciales(usuario.nombreCompleto)}</span><span><strong className="ranking-dato-destacado-nombre-completo">{usuario.nombreCompleto}{usuario.id === usuarioActivo.id && <small className="ranking-detalle-tu">Tú</small>}</strong><small className="ranking-detalle-especialidad">{usuario.especialidad}</small></span></div></td>
                  <td className="ranking-celda-puntos">{usuario.puntos}</td>
                  <td className="ranking-celda-rareza-total">{usuario.rarezaTotal}</td>
                  <td className="ranking-celda-target-precision-catador"><span className="ranking-texto-target-precision-catador"><FiTarget aria-hidden="true" /> {usuario.precisionCatador}%</span></td>
                  <td className="ranking-celda-participacion"><span className={`ranking-indicador-participacion ${usuario.participacion < 30 ? "ranking-participacion-baja" : "ranking-participacion-adecuada"}`}>{usuario.participacion < 30 ? <FiAlertTriangle aria-hidden="true" /> : <FiTrendingUp aria-hidden="true" />}{usuario.participacion}%</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <p className="ranking-descripcion-alert-triangle-quien-tenga"><FiAlertTriangle className="ranking-icono-alert-triangle" aria-hidden="true" />Quien tenga menos de 30% de participación en sus últimas cinco fórmulas pierde durante 7 días la posibilidad de crear nuevas propuestas.</p>
    </div>
  );
}

export default RankingPage;
