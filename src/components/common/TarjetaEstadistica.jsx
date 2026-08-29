function TarjetaEstadistica({ icono: Icono, etiqueta, valor, detalle, tono = "violet" }) {
  const tonos = {
    violet: "tarjeta-estadistica-tono-violeta",
    cyan: "tarjeta-estadistica-tono-cian",
    amber: "tarjeta-estadistica-tono-ambar",
    emerald: "tarjeta-estadistica-tono-verde",
  };

  return (
    <article className="tarjeta-estadistica-tarjeta-etiqueta-valor">
      <div className="tarjeta-estadistica-contenedor-flexible-etiqueta-valor">
        <div>
          <p className="tarjeta-estadistica-descripcion-etiqueta">
            {etiqueta}
          </p>
          <strong className="tarjeta-estadistica-dato-destacado-valor">
            {valor}
          </strong>
          {detalle && <p className="tarjeta-estadistica-descripcion-detalle">{detalle}</p>}
        </div>
        <span className={`tarjeta-estadistica-insignia-icono ${tonos[tono]}`}>
          <Icono aria-hidden="true" className="tarjeta-estadistica-icono-decorativo" />
        </span>
      </div>
    </article>
  );
}

export default TarjetaEstadistica;
