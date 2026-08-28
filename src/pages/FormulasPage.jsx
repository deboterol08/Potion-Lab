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
    <div className="space-y-8">
      <EncabezadoPagina
        acciones={
          <Link className="focus-ring flex items-center gap-2 rounded-xl bg-violet-500 px-4 py-3 text-xs font-extrabold text-white transition hover:-translate-y-0.5 hover:bg-violet-400" to="/formulas/nueva">
            <FiPlus aria-hidden="true" /> Nueva fórmula
          </Link>
        }
        descripcion="Consulta propuestas, participa en votaciones y sigue cada fórmula hasta su destilación."
        etiqueta="Máquina de estados"
        titulo="Fórmulas"
      />

      <section className="glass-panel grid gap-3 rounded-2xl p-3 md:grid-cols-[1fr_auto_auto]">
        <label className="relative">
          <span className="sr-only">Buscar fórmulas</span>
          <FiSearch className="absolute top-1/2 left-4 -translate-y-1/2 text-slate-600" aria-hidden="true" />
          <input
            className="focus-ring w-full rounded-xl border border-white/8 bg-black/15 py-3 pr-4 pl-11 text-sm text-white outline-none placeholder:text-slate-600"
            onChange={(evento) => setBusqueda(evento.target.value)}
            placeholder="Buscar fórmula o efecto..."
            value={busqueda}
          />
        </label>
        <label className="relative">
          <FiFilter className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-slate-600" aria-hidden="true" />
          <span className="sr-only">Filtrar por estado</span>
          <select className="focus-ring min-w-44 appearance-none rounded-xl border border-white/8 bg-[#15182e] py-3 pr-8 pl-10 text-xs font-bold text-slate-300" onChange={(evento) => setEstado(evento.target.value)} value={estado}>
            <option value="todos">Todos los estados</option>
            {Object.entries(ESTADOS_FORMULA).map(([id, datos]) => (
              <option key={id} value={id}>{datos.etiqueta}</option>
            ))}
          </select>
        </label>
        <label>
          <span className="sr-only">Filtrar por gremio</span>
          <select className="focus-ring min-w-44 rounded-xl border border-white/8 bg-[#15182e] px-4 py-3 text-xs font-bold text-slate-300" onChange={(evento) => setGremioId(evento.target.value)} value={gremioId}>
            <option value="todos">Todos los gremios</option>
            {gremios.map((gremio) => <option key={gremio.id} value={gremio.id}>{gremio.nombre}</option>)}
          </select>
        </label>
      </section>

      <div className="flex items-center justify-between text-xs text-slate-600">
        <span>{formulasFiltradas.length} fórmulas encontradas</span>
        <span>Ordenadas por creación reciente</span>
      </div>

      {formulasFiltradas.length > 0 ? (
        <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
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
