import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { GiBrokenBottle } from "react-icons/gi";

function NoEncontradaPage() {
  return (
    <section className="glass-panel mx-auto max-w-2xl rounded-3xl px-6 py-16 text-center">
      <span className="mx-auto grid size-16 place-items-center rounded-2xl bg-rose-300/8 text-3xl text-rose-200 ring-1 ring-rose-300/15"><GiBrokenBottle aria-hidden="true" /></span>
      <p className="mt-6 text-xs font-extrabold tracking-[0.2em] text-slate-600 uppercase">Error 404</p>
      <h1 className="font-display mt-2 text-3xl font-semibold text-white">Esta fórmula se evaporó</h1>
      <p className="mt-3 text-sm leading-6 text-slate-400">La página que buscas no existe o cambió de ubicación dentro del laboratorio.</p>
      <Link className="focus-ring mt-7 inline-flex items-center gap-2 rounded-xl bg-violet-500 px-5 py-3 text-xs font-extrabold text-white hover:bg-violet-400" to="/"><FiArrowLeft aria-hidden="true" /> Volver al resumen</Link>
    </section>
  );
}

export default NoEncontradaPage;
