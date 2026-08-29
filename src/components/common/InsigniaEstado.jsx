import { ESTADOS_FORMULA } from "../../data/seedData";

function InsigniaEstado({ estado }) {
  const configuracion = ESTADOS_FORMULA[estado] ?? ESTADOS_FORMULA.proposal;
  const tonos = {
    slate: "insignia-estado-tono-neutro",
    cyan: "insignia-estado-tono-cian",
    amber: "insignia-estado-tono-ambar",
    violet: "insignia-estado-tono-violeta",
  };

  return (
    <span className={`insignia-estado-etiqueta ${tonos[configuracion.tono]}`}>
      <span className="insignia-estado-indicador" />
      {configuracion.etiqueta}
    </span>
  );
}

export default InsigniaEstado;
