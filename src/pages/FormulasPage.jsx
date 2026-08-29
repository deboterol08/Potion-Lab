import { useState } from "react";
import { Link } from "react-router-dom";
import { FiFilter, FiLayers, FiPlus, FiSearch } from "react-icons/fi";
import EncabezadoPagina from "../components/common/EncabezadoPagina";
import EstadoVacio from "../components/common/EstadoVacio";
import TarjetaFormula from "../components/formula/TarjetaFormula";
import { ESTADOS_FORMULA } from "../data/seedData";

function FormulasPage({ formulas, gremios, usuarios, votos }) {
  const [busqueda, setBusqueda] = useState("");
  const [estado, setEstado] = useState("todos");
  const [gremioId, setGremioId] = useState("todos");

  const formulasFiltradas = formulas.filter((formula) => {
    const coincideTexto = `${formula.nombrePocion} ${formula.efectoDeseado}`
      .toLowerCase()
      .includes(busqueda.toLowerCase());
    const coincideEstado = estado === "todos" || formula.estado === estado;
    const coincideGremio = gremioId === "todos" || formula.gremioId === gremioId;
    return coincideTexto && coincideEstado && coincideGremio;
  });

  return (
    <div className="formulas-lista-vertical-buscar-formulas-search-filter">
      <EncabezadoPagina
        acciones={
          <Link className="formulas-enlace-formulas-nueva" to="/formulas/nueva">
            <FiPlus aria-hidden="true" /> Nueva fórmula
          </Link>
        }
        descripcion="Consulta propuestas, participa en votaciones y sigue cada fórmula hasta su destilación."
        etiqueta="Máquina de estados"
        titulo="Fórmulas"
      />

      <section className="formulas-cuadricula-buscar-formulas-search-filter">
        <label className="formulas-etiqueta-campo-buscar-formulas-search">
          <span className="formulas-texto-buscar-formulas">Buscar fórmulas</span>
          <FiSearch className="formulas-icono-search" aria-hidden="true" />
          <input
            className="formulas-campo-buscar-formula-o-efecto"
            onChange={(evento) => setBusqueda(evento.target.value)}
            placeholder="Buscar fórmula o efecto..."
            value={busqueda}
          />
        </label>
        <label className="formulas-etiqueta-campo-filter-filtrar-por-estado">
          <FiFilter className="formulas-icono-filter" aria-hidden="true" />
          <span className="formulas-texto-filtrar-por-estado">Filtrar por estado</span>
          <select className="formulas-selector-todos-los-estados-map" onChange={(evento) => setEstado(evento.target.value)} value={estado}>
            <option value="todos">Todos los estados</option>
            {Object.entries(ESTADOS_FORMULA).map(([id, datos]) => (
              <option key={id} value={id}>{datos.etiqueta}</option>
            ))}
          </select>
        </label>
        <label>
          <span className="formulas-texto-filtrar-por-gremio">Filtrar por gremio</span>
          <select className="formulas-selector-todos-los-gremios-map" onChange={(evento) => setGremioId(evento.target.value)} value={gremioId}>
            <option value="todos">Todos los gremios</option>
            {gremios.map((gremio) => <option key={gremio.id} value={gremio.id}>{gremio.nombre}</option>)}
          </select>
        </label>
      </section>

      <div className="formulas-contenedor-flexible-length-formulas-encontradas-ordenadas">
        <span>{formulasFiltradas.length} fórmulas encontradas</span>
        <span>Ordenadas por creación reciente</span>
      </div>

      {formulasFiltradas.length > 0 ? (
        <section className="formulas-cuadricula-map">
          {[...formulasFiltradas]
            .sort((a, b) => new Date(b.fechaCreacion) - new Date(a.fechaCreacion))
            .map((formula) => (
              <TarjetaFormula
                creador={usuarios.find((item) => item.id === formula.creadaPorId)}
                formula={formula}
                gremio={gremios.find((item) => item.id === formula.gremioId)}
                key={formula.id}
                votosCompletados={Object.keys(votos[formula.id] ?? {}).length}
              />
            ))}
        </section>
      ) : (
        <EstadoVacio descripcion="Cambia los filtros o crea una nueva propuesta para tu gremio." icono={FiLayers} titulo="No hay fórmulas con esos criterios" />
      )}
    </div>
  );
}

export default FormulasPage;
