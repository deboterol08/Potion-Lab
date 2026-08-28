function EncabezadoPagina({ etiqueta, titulo, descripcion, acciones }) {
  return (
    <header className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
      <div className="max-w-3xl">
        {etiqueta && (
          <p className="mb-2 text-xs font-extrabold tracking-[0.22em] text-cyan-300 uppercase">
            {etiqueta}
          </p>
        )}
        <h1 className="font-display text-3xl font-semibold tracking-tight text-white md:text-4xl">
          {titulo}
        </h1>
        {descripcion && (
          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-400 md:text-base">
            {descripcion}
          </p>
        )}
      </div>
      {acciones && <div className="flex flex-wrap gap-3">{acciones}</div>}
    </header>
  );
}

export default EncabezadoPagina;
