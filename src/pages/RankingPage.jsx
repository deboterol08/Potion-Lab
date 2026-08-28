import { FiAlertTriangle, FiAward, FiTarget, FiTrendingUp } from "react-icons/fi";
import { GiLaurelsTrophy } from "react-icons/gi";
import EncabezadoPagina from "../components/common/EncabezadoPagina";
import { obtenerIniciales } from "../utils/formatters";

function RankingPage({ usuarios, usuarioActivo }) {
  const ranking = [...usuarios].sort((a, b) => b.puntos - a.puntos);
  const podio = ranking.slice(0, 3);

  return (
    <div className="space-y-8">
      <EncabezadoPagina descripcion="Compara puntos, rareza acumulada, precisión de catador y participación de los alquimistas." etiqueta="Temporada actual" titulo="Ranking alquímico" />

      <section className="grid gap-4 md:grid-cols-3">
        {podio.map((usuario, indice) => {
          const tonos = ["from-amber-300/20 to-amber-300/5 border-amber-300/20", "from-slate-300/15 to-slate-300/4 border-slate-300/15", "from-orange-400/15 to-orange-400/4 border-orange-300/15"];
          return (
            <article className={`relative overflow-hidden rounded-2xl border bg-gradient-to-br p-6 ${tonos[indice]} ${indice === 0 ? "md:-translate-y-2" : ""}`} key={usuario.id}>
              <span className="absolute top-4 right-4 text-4xl font-black text-white/5">0{indice + 1}</span>
              <span className="grid size-12 place-items-center rounded-2xl bg-black/15 text-xs font-extrabold text-white ring-1 ring-white/10">{obtenerIniciales(usuario.nombreCompleto)}</span>
              <div className="mt-5"><p className="text-[10px] font-bold tracking-[0.15em] text-slate-500 uppercase">{usuario.especialidad}</p><h2 className="mt-1 text-sm font-bold text-white">{usuario.nombreCompleto}</h2></div>
              <div className="mt-5 flex items-end justify-between"><div><span className="text-[10px] text-slate-500">Puntos</span><strong className="block text-3xl text-white">{usuario.puntos}</strong></div>{indice === 0 && <GiLaurelsTrophy className="text-3xl text-amber-200" aria-hidden="true" />}</div>
            </article>
          );
        })}
      </section>

      <section className="glass-panel overflow-hidden rounded-2xl">
        <div className="flex items-center justify-between border-b border-white/8 px-5 py-5 sm:px-6"><div><p className="text-[10px] font-extrabold tracking-[0.16em] text-violet-300 uppercase">Clasificación completa</p><h2 className="font-display mt-1 text-xl font-semibold text-white">Alquimistas destacados</h2></div><FiAward className="text-2xl text-amber-200" aria-hidden="true" /></div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left">
            <thead><tr className="border-b border-white/8 text-[10px] font-extrabold tracking-[0.14em] text-slate-600 uppercase"><th className="px-5 py-3">Posición</th><th className="px-5 py-3">Alquimista</th><th className="px-5 py-3 text-center">Puntos</th><th className="px-5 py-3 text-center">Rareza</th><th className="px-5 py-3 text-center">Precisión</th><th className="px-5 py-3 text-center">Participación</th></tr></thead>
            <tbody>
              {ranking.map((usuario, indice) => (
                <tr className={`border-b border-white/6 text-xs last:border-0 ${usuario.id === usuarioActivo.id ? "bg-violet-300/[0.055]" : ""}`} key={usuario.id}>
                  <td className="px-5 py-4"><strong className={indice < 3 ? "text-amber-200" : "text-slate-600"}>#{indice + 1}</strong></td>
                  <td className="px-5 py-4"><div className="flex items-center gap-3"><span className="grid size-9 place-items-center rounded-xl bg-white/5 text-[10px] font-extrabold text-slate-300 ring-1 ring-white/8">{obtenerIniciales(usuario.nombreCompleto)}</span><span><strong className="block text-xs text-slate-200">{usuario.nombreCompleto}{usuario.id === usuarioActivo.id && <small className="ml-2 text-violet-300">Tú</small>}</strong><small className="text-[10px] text-slate-600">{usuario.especialidad}</small></span></div></td>
                  <td className="px-5 py-4 text-center font-bold text-white">{usuario.puntos}</td>
                  <td className="px-5 py-4 text-center text-slate-400">{usuario.rarezaTotal}</td>
                  <td className="px-5 py-4 text-center"><span className="inline-flex items-center gap-1 text-slate-400"><FiTarget aria-hidden="true" /> {usuario.precisionCatador}%</span></td>
                  <td className="px-5 py-4 text-center"><span className={`inline-flex items-center gap-1 font-bold ${usuario.participacion < 30 ? "text-rose-300" : "text-emerald-300"}`}>{usuario.participacion < 30 ? <FiAlertTriangle aria-hidden="true" /> : <FiTrendingUp aria-hidden="true" />}{usuario.participacion}%</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <p className="rounded-xl border border-amber-300/12 bg-amber-300/5 px-4 py-3 text-xs leading-5 text-slate-500"><FiAlertTriangle className="mr-2 inline text-amber-300" aria-hidden="true" />Quien tenga menos de 30% de participación en sus últimas cinco fórmulas pierde durante 7 días la posibilidad de crear nuevas propuestas.</p>
    </div>
  );
}

export default RankingPage;
