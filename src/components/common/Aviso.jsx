import { FiCheckCircle, FiX } from "react-icons/fi";

function Aviso({ mensaje, onCerrar }) {
  if (!mensaje) return null;

  return (
    <div className="fixed right-4 bottom-24 z-[60] flex max-w-sm items-start gap-3 rounded-2xl border border-emerald-300/20 bg-slate-900/95 px-4 py-3 text-sm text-slate-200 shadow-2xl backdrop-blur md:bottom-6">
      <FiCheckCircle className="mt-0.5 shrink-0 text-lg text-emerald-300" aria-hidden="true" />
      <span className="flex-1 leading-6">{mensaje}</span>
      <button
        aria-label="Cerrar aviso"
        className="focus-ring rounded-md p-1 text-slate-500 hover:text-white"
        onClick={onCerrar}
        type="button"
      >
        <FiX aria-hidden="true" />
      </button>
    </div>
  );
}

export default Aviso;
