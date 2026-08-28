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
    <div className="space-y-8">
      <EncabezadoPagina descripcion="Archivo permanente y consultable de todas las combinaciones que llegaron a la etapa de destilación." etiqueta="Memoria del laboratorio" titulo="Grimorio de pociones" />

      <section className="glass-panel grid gap-3 rounded-2xl p-3 md:grid-cols-[1fr_auto]">
        <label className="relative">
          <span className="sr-only">Buscar en el grimorio</span>
          <FiSearch className="absolute top-1/2 left-4 -translate-y-1/2 text-slate-600" aria-hidden="true" />
          <input className="focus-ring w-full rounded-xl border border-white/8 bg-black/15 py-3 pr-4 pl-11 text-sm text-white outline-none placeholder:text-slate-600" onChange={(evento) => setBusqueda(evento.target.value)} placeholder="Buscar por combinación o efecto..." value={busqueda} />
        </label>
        <select className="focus-ring rounded-xl border border-white/8 bg-[#15182e] px-4 py-3 text-xs font-bold text-slate-300" onChange={(evento) => setGremioId(evento.target.value)} value={gremioId}>
          <option value="todos">Todos los gremios</option>
          {gremios.map((gremio) => <option key={gremio.id} value={gremio.id}>{gremio.nombre}</option>)}
        </select>
      </section>

      {pociones.length > 0 ? (
        <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {pociones.map((pocion) => {
            const gremio = gremios.find((item) => item.id === pocion.gremioId);
            return (
              <article className="glass-panel group relative overflow-hidden rounded-2xl p-5 transition hover:-translate-y-1 hover:border-amber-300/20" key={pocion.id}>
                <div className="absolute -top-16 -right-16 size-36 rounded-full bg-amber-300/7 blur-3xl" aria-hidden="true" />
                <div className="relative flex items-start justify-between gap-4">
                  <span className="grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-violet-400/18 to-cyan-300/10 text-2xl text-cyan-200 ring-1 ring-white/10">
                    <GiPotionBall aria-hidden="true" />
                  </span>
                  <span className="flex items-center gap-1.5 rounded-full bg-amber-300/8 px-2.5 py-1 text-[10px] font-bold text-amber-200 ring-1 ring-amber-300/15"><FiStar aria-hidden="true" /> Rareza {pocion.rareza}</span>
                </div>
                <div className="relative mt-5">
                  <p className="text-[10px] font-extrabold tracking-[0.15em] text-violet-300 uppercase">{gremio?.nombre}</p>
                  <h2 className="font-display mt-2 line-clamp-3 text-lg leading-7 font-semibold text-white">{pocion.nombre}</h2>
                  <p className="mt-3 line-clamp-2 text-xs leading-5 text-slate-500">{pocion.efecto}</p>
                </div>
                <dl className="relative mt-5 grid grid-cols-2 gap-3 border-t border-white/8 pt-4 text-xs">
                  <div><dt className="text-[9px] text-slate-600">Dificultad real</dt><dd className="mt-1 font-bold text-cyan-200">{pocion.dificultadReal}</dd></div>
                  <div><dt className="text-[9px] text-slate-600">Destilación</dt><dd className="mt-1 font-bold text-slate-300">{formatearFecha(pocion.fechaDestilacion)}</dd></div>
                </dl>
                <button className="focus-ring relative mt-5 w-full rounded-xl bg-white/[0.035] px-4 py-3 text-xs font-bold text-slate-300 transition group-hover:bg-violet-300/9 group-hover:text-white" onClick={() => setSeleccionada(pocion)} type="button">Consultar ficha completa</button>
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
            <div className="flex items-start gap-4 rounded-2xl border border-violet-300/15 bg-violet-300/6 p-5">
              <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-violet-300/10 text-2xl text-cyan-200"><GiPotionBall aria-hidden="true" /></span>
              <div><p className="text-[10px] font-bold tracking-[0.14em] text-violet-300 uppercase">Composición final</p><h3 className="font-display mt-2 text-xl leading-7 text-white">{seleccionada.nombre}</h3></div>
            </div>
            <dl className="mt-5 grid gap-3 sm:grid-cols-3">
              <div className="rounded-xl bg-white/[0.035] p-4"><dt className="text-[10px] text-slate-600">Rareza</dt><dd className="mt-1 text-xl font-extrabold text-amber-200">{seleccionada.rareza}</dd></div>
              <div className="rounded-xl bg-white/[0.035] p-4"><dt className="text-[10px] text-slate-600">Dificultad</dt><dd className="mt-1 text-xl font-extrabold text-cyan-200">{seleccionada.dificultadReal}</dd></div>
              <div className="rounded-xl bg-white/[0.035] p-4"><dt className="text-[10px] text-slate-600">Fecha</dt><dd className="mt-2 flex items-center gap-1 text-xs font-bold text-slate-300"><FiCalendar aria-hidden="true" /> {formatearFecha(seleccionada.fechaDestilacion)}</dd></div>
            </dl>
            <div className="mt-5"><h4 className="text-xs font-bold text-slate-300">Efecto documentado</h4><p className="mt-2 text-sm leading-7 text-slate-500">{seleccionada.efecto}</p></div>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default GrimorioPage;
