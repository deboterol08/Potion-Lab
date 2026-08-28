function TarjetaEstadistica({ icono: Icono, etiqueta, valor, detalle, tono = "violet" }) {
  const tonos = {
    violet: "bg-violet-400/12 text-violet-300 ring-violet-300/20",
    cyan: "bg-cyan-400/12 text-cyan-300 ring-cyan-300/20",
    amber: "bg-amber-400/12 text-amber-300 ring-amber-300/20",
    emerald: "bg-emerald-400/12 text-emerald-300 ring-emerald-300/20",
  };

  return (
    <article className="glass-panel rounded-2xl p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold tracking-[0.14em] text-slate-500 uppercase">
            {etiqueta}
          </p>
          <strong className="mt-3 block text-3xl font-extrabold text-white">
            {valor}
          </strong>
          {detalle && <p className="mt-1 text-xs text-slate-400">{detalle}</p>}
        </div>
        <span className={`grid size-11 shrink-0 place-items-center rounded-xl ring-1 ${tonos[tono]}`}>
          <Icono aria-hidden="true" className="text-xl" />
        </span>
      </div>
    </article>
  );
}

export default TarjetaEstadistica;
