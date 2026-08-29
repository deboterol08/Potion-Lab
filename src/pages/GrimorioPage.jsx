import { useState } from "react";
import { FiBookOpen, FiSearch, FiStar } from "react-icons/fi";
import { GiPotionBall } from "react-icons/gi";
import EncabezadoPagina from "../components/common/EncabezadoPagina";
import EstadoVacio from "../components/common/EstadoVacio";
import { formatearFecha } from "../utils/formatters";

function GrimorioPage({ grimorio, gremios }) {
  const [busqueda, setBusqueda] = useState("");
  const [gremioId, setGremioId] = useState("todos");

  const pociones = grimorio.filter((pocion) => {
    const coincideTexto = `${pocion.nombre} ${pocion.efecto}`
      .toLowerCase()
      .includes(busqueda.toLowerCase());
    return coincideTexto && (gremioId === "todos" || pocion.gremioId === gremioId);
  });

  return (
    <div className="grimorio-lista-vertical-buscar-en-el-grimorio">
      <EncabezadoPagina descripcion="Archivo permanente y consultable de todas las combinaciones que llegaron a la etapa de destilación." etiqueta="Memoria del laboratorio" titulo="Grimorio de pociones" />

      <section className="grimorio-cuadricula-buscar-en-el-grimorio">
        <label className="grimorio-etiqueta-campo-buscar-en-el-grimorio">
          <span className="grimorio-texto-buscar-en-el-grimorio">Buscar en el grimorio</span>
          <FiSearch className="grimorio-icono-search" aria-hidden="true" />
          <input className="grimorio-campo-buscar-por-combinacion-o" onChange={(evento) => setBusqueda(evento.target.value)} placeholder="Buscar por combinación o efecto..." value={busqueda} />
        </label>
        <select className="grimorio-selector-todos-los-gremios-map" onChange={(evento) => setGremioId(evento.target.value)} value={gremioId}>
          <option value="todos">Todos los gremios</option>
          {gremios.map((gremio) => <option key={gremio.id} value={gremio.id}>{gremio.nombre}</option>)}
        </select>
      </section>

      {pociones.length > 0 ? (
        <section className="grimorio-cuadricula-map">
          {pociones.map((pocion) => {
            const gremio = gremios.find((item) => item.id === pocion.gremioId);
            return (
              <article className="grimorio-tarjeta-star-rareza-rareza-nombre" key={pocion.id}>
                <div className="grimorio-contenedor-flexible-star-rareza-rareza">
                  <span className="grimorio-insignia">
                    <GiPotionBall aria-hidden="true" />
                  </span>
                  <span className="grimorio-texto-star-rareza-rareza"><FiStar aria-hidden="true" /> Rareza {pocion.rareza}</span>
                </div>
                <div className="grimorio-contenedor-nombre-efecto">
                  <p className="grimorio-descripcion">{gremio?.nombre}</p>
                  <h2 className="grimorio-titulo-seccion-nombre">{pocion.nombre}</h2>
                  <p className="grimorio-descripcion-efecto">{pocion.efecto}</p>
                </div>
                <dl className="grimorio-lista-datos-dificultad-real-dificultad-real">
                  <div><dt className="grimorio-nombre-dato-dificultad-real">Dificultad real</dt><dd className="grimorio-valor-dato-dificultad-real">{pocion.dificultadReal}</dd></div>
                  <div><dt className="grimorio-nombre-dato-destilacion">Destilación</dt><dd className="grimorio-valor-dato-fecha">{formatearFecha(pocion.fechaDestilacion)}</dd></div>
                </dl>
              </article>
            );
          })}
        </section>
      ) : (
        <EstadoVacio descripcion="No hay resultados que coincidan con tu búsqueda actual." icono={FiBookOpen} titulo="El grimorio no encontró esa poción" />
      )}
    </div>
  );
}

export default GrimorioPage;
