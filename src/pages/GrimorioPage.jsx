import { useState } from "react";
import { FiBookOpen, FiCalendar, FiSearch, FiStar } from "react-icons/fi";
import { GiPotionBall } from "react-icons/gi";
import EncabezadoPagina from "../components/common/EncabezadoPagina";
import EstadoVacio from "../components/common/EstadoVacio";
import Modal from "../components/common/Modal";
import { formatearFecha } from "../utils/formatters";

function GrimorioPage({ grimorio, gremios }) {
  const [busqueda, setBusqueda] = useState("");
  const [gremioId, setGremioId] = useState("todos");
  const [seleccionada, setSeleccionada] = useState(null);

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
                <button className="grimorio-boton-consultar-ficha-completa" onClick={() => setSeleccionada(pocion)} type="button">Consultar ficha completa</button>
              </article>
            );
          })}
        </section>
      ) : (
        <EstadoVacio descripcion="No hay resultados que coincidan con tu búsqueda actual." icono={FiBookOpen} titulo="El grimorio no encontró esa poción" />
      )}

      <Modal abierto={Boolean(seleccionada)} descripcion="Registro permanente generado a partir de los votos ganadores." onCerrar={() => setSeleccionada(null)} titulo="Ficha de destilación">
        {seleccionada && (
          <div>
            <div className="grimorio-contenedor-flexible-composicion-final-nombre">
              <span className="grimorio-insignia-pocion-final"><GiPotionBall aria-hidden="true" /></span>
              <div><p className="grimorio-descripcion-composicion-final">Composición final</p><h3 className="grimorio-titulo-tarjeta-nombre">{seleccionada.nombre}</h3></div>
            </div>
            <dl className="grimorio-lista-datos-rareza-rareza-dificultad-dificultad">
              <div className="grimorio-panel-rareza-rareza"><dt className="grimorio-nombre-dato-rareza">Rareza</dt><dd className="grimorio-valor-dato-rareza">{seleccionada.rareza}</dd></div>
              <div className="grimorio-panel-dificultad-dificultad-real"><dt className="grimorio-nombre-dato-dificultad">Dificultad</dt><dd className="grimorio-valor-dificultad-real">{seleccionada.dificultadReal}</dd></div>
              <div className="grimorio-panel-fecha-calendar-fecha"><dt className="grimorio-nombre-dato-fecha">Fecha</dt><dd className="grimorio-valor-dato-calendar-fecha"><FiCalendar aria-hidden="true" /> {formatearFecha(seleccionada.fechaDestilacion)}</dd></div>
            </dl>
            <div className="grimorio-contenedor-efecto-documentado-efecto"><h4 className="grimorio-titulo-menor-efecto-documentado">Efecto documentado</h4><p className="grimorio-descripcion-efecto-documentado">{seleccionada.efecto}</p></div>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default GrimorioPage;
