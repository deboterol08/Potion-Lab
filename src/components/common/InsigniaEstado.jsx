import { ESTADOS_FORMULA } from "../../data/seedData";

function InsigniaEstado({ estado }) {
  const configuracion = ESTADOS_FORMULA[estado] ?? ESTADOS_FORMULA.proposal;
  const tonos = {
    slate: "border-slate-400/20 bg-slate-400/10 text-slate-300",
    cyan: "border-cyan-300/20 bg-cyan-300/10 text-cyan-200",
    amber: "border-amber-300/20 bg-amber-300/10 text-amber-200",
    violet: "border-violet-300/20 bg-violet-300/10 text-violet-200",
  };

  return (
    <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-bold ${tonos[configuracion.tono]}`}>
      <span className="size-1.5 rounded-full bg-current" />
      {configuracion.etiqueta}
    </span>
  );
}

export default InsigniaEstado;
