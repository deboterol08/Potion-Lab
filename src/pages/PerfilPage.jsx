import { useState } from "react";
import { FiAward, FiImage, FiMail, FiSave, FiTrendingUp, FiUser } from "react-icons/fi";
import { ESPECIALIDADES } from "../data/seedData";
import { obtenerIniciales } from "../utils/formatters";

function PerfilPage({ usuario, onSaveProfile }) {
  const [formulario, setFormulario] = useState(usuario);
  const [guardado, setGuardado] = useState(false);

  function manejarCambio(evento) {
    const { name, value } = evento.target;
    setFormulario((anterior) => ({ ...anterior, [name]: value }));
    setGuardado(false);
  }

  function manejarEnvio(evento) {
    evento.preventDefault();
    onSaveProfile(formulario);
    setGuardado(true);
  }

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <header><p className="text-xs font-extrabold tracking-[0.2em] text-cyan-300 uppercase">Identidad alquímica</p><h1 className="font-display mt-2 text-3xl font-semibold text-white md:text-4xl">Mi perfil</h1><p className="mt-3 text-sm leading-7 text-slate-400">Actualiza los datos visibles para tus compañeros de gremio.</p></header>

      <div className="grid gap-6 lg:grid-cols-[0.65fr_1.35fr]">
        <aside className="glass-panel h-fit rounded-2xl p-6 text-center">
          {formulario.avatarUrl ? <img alt={`Avatar de ${formulario.nombreCompleto}`} className="mx-auto size-28 rounded-3xl object-cover ring-2 ring-violet-300/25" src={formulario.avatarUrl} /> : <span className="mx-auto grid size-28 place-items-center rounded-3xl bg-gradient-to-br from-violet-400/22 to-cyan-300/12 text-2xl font-extrabold text-white ring-1 ring-white/12">{obtenerIniciales(formulario.nombreCompleto)}</span>}
          <h2 className="font-display mt-5 text-xl font-semibold text-white">{formulario.nombreCompleto}</h2><p className="mt-1 text-xs text-violet-300">{formulario.especialidad}</p>
          <div className="mt-6 grid grid-cols-2 gap-3 border-t border-white/8 pt-5"><div><FiAward className="mx-auto text-amber-300" aria-hidden="true" /><strong className="mt-2 block text-lg text-white">{usuario.puntos}</strong><span className="text-[9px] text-slate-600">Puntos</span></div><div><FiTrendingUp className="mx-auto text-emerald-300" aria-hidden="true" /><strong className="mt-2 block text-lg text-white">{usuario.participacion}%</strong><span className="text-[9px] text-slate-600">Participación</span></div></div>
        </aside>

        <form className="glass-panel rounded-2xl p-6 sm:p-8" onSubmit={manejarEnvio}>
          <div className="border-b border-white/8 pb-5"><h2 className="font-display text-xl font-semibold text-white">Información personal</h2><p className="mt-2 text-xs leading-5 text-slate-500">La autenticación sigue siendo una simulación local del frontend.</p></div>
          <div className="mt-6 space-y-5">
            <label className="block"><span className="mb-2 flex items-center gap-2 text-xs font-bold text-slate-300"><FiUser aria-hidden="true" /> Nombre completo</span><input className="focus-ring w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none" name="nombreCompleto" onChange={manejarCambio} required value={formulario.nombreCompleto} /></label>
            <label className="block"><span className="mb-2 flex items-center gap-2 text-xs font-bold text-slate-300"><FiMail aria-hidden="true" /> Correo universitario</span><input className="focus-ring w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none" name="email" onChange={manejarCambio} required type="email" value={formulario.email} /></label>
            <label className="block"><span className="mb-2 block text-xs font-bold text-slate-300">Especialidad</span><select className="focus-ring w-full rounded-xl border border-white/10 bg-[#15182e] px-4 py-3 text-sm text-white" name="especialidad" onChange={manejarCambio} value={formulario.especialidad}>{ESPECIALIDADES.map((especialidad) => <option key={especialidad}>{especialidad}</option>)}</select></label>
            <label className="block"><span className="mb-2 flex items-center gap-2 text-xs font-bold text-slate-300"><FiImage aria-hidden="true" /> URL del avatar <small className="font-normal text-slate-600">(opcional)</small></span><input className="focus-ring w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none" name="avatarUrl" onChange={manejarCambio} placeholder="https://..." type="url" value={formulario.avatarUrl} /></label>
          </div>
          <div className="mt-7 flex flex-col items-stretch gap-3 border-t border-white/8 pt-6 sm:flex-row sm:items-center sm:justify-between"><span className={`text-xs ${guardado ? "text-emerald-300" : "text-slate-600"}`}>{guardado ? "Cambios guardados correctamente." : "Los cambios se guardan en este navegador."}</span><button className="focus-ring flex items-center justify-center gap-2 rounded-xl bg-violet-500 px-5 py-3 text-xs font-extrabold text-white hover:bg-violet-400" type="submit"><FiSave aria-hidden="true" /> Guardar cambios</button></div>
        </form>
      </div>
    </div>
  );
}

export default PerfilPage;
