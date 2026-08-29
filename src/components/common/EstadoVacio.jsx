function EstadoVacio({ icono: Icono, titulo, descripcion, accion }) {
  return (
    <div className="estado-vacio-contenedor-flexible-titulo-descripcion">
      <span className="estado-vacio-insignia">
        <Icono aria-hidden="true" />
      </span>
      <h2 className="estado-vacio-titulo-seccion">{titulo}</h2>
      <p className="estado-vacio-descripcion">{descripcion}</p>
      {accion && <div className="estado-vacio-contenedor-accion">{accion}</div>}
    </div>
  );
}

export default EstadoVacio;
