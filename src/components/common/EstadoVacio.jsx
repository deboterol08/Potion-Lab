function EstadoVacio({ icono: Icono, titulo, descripcion, accion }) {
  return (
    <div className="glass-panel flex min-h-64 flex-col items-center justify-center rounded-2xl px-6 py-12 text-center">
      <span className="grid size-14 place-items-center rounded-2xl bg-white/5 text-2xl text-violet-300 ring-1 ring-white/10">
        <Icono aria-hidden="true" />
      </span>
      <h2 className="mt-5 text-lg font-bold text-white">{titulo}</h2>
      <p className="mt-2 max-w-md text-sm leading-6 text-slate-400">{descripcion}</p>
      {accion && <div className="mt-6">{accion}</div>}
    </div>
  );
}

export default EstadoVacio;
