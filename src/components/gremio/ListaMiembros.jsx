import { FiChevronDown, FiShield, FiStar } from "react-icons/fi";
import { formatearFecha, obtenerIniciales } from "../../utils/formatters";

function ListaMiembros({ gremio, usuarios, puedeAdministrar, onChangeRole, onAppointTaster }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[680px] border-collapse text-left">
        <thead>
          <tr className="border-b border-white/8 text-[10px] font-extrabold tracking-[0.15em] text-slate-600 uppercase">
            <th className="px-4 py-3">Alquimista</th>
            <th className="px-4 py-3">Especialidad</th>
            <th className="px-4 py-3">Ingreso</th>
            <th className="px-4 py-3">Rol</th>
            {puedeAdministrar && <th className="px-4 py-3 text-right">Acciones</th>}
          </tr>
        </thead>
        <tbody>
          {gremio.miembros.map((miembro) => {
            const usuario = usuarios.find((item) => item.id === miembro.usuarioId);
            if (!usuario) return null;

            return (
              <tr className="border-b border-white/6 text-sm last:border-0" key={miembro.usuarioId}>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    <span className="grid size-9 place-items-center rounded-xl bg-white/5 text-[10px] font-extrabold text-slate-300 ring-1 ring-white/8">
                      {obtenerIniciales(usuario.nombreCompleto)}
                    </span>
                    <span>
                      <strong className="block text-xs text-slate-200">{usuario.nombreCompleto}</strong>
                      <small className="text-[10px] text-slate-600">{usuario.email}</small>
                    </span>
                  </div>
                </td>
                <td className="px-4 py-4 text-xs text-slate-400">{usuario.especialidad}</td>
                <td className="px-4 py-4 text-xs text-slate-500">{formatearFecha(miembro.fechaIngreso)}</td>
                <td className="px-4 py-4">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/5 px-2.5 py-1 text-[10px] font-bold text-slate-300 ring-1 ring-white/8">
                    {miembro.rol === "Gran Maestre" && <FiStar aria-hidden="true" className="text-amber-300" />}
                    {miembro.rol === "Catador oficial" && <FiShield aria-hidden="true" className="text-cyan-300" />}
                    {miembro.rol}
                  </span>
                </td>
                {puedeAdministrar && (
                  <td className="px-4 py-4 text-right">
                    {miembro.rol !== "Gran Maestre" && (
                      <div className="inline-flex items-center gap-2">
                        <label className="relative">
                          <span className="sr-only">Cambiar rol de {usuario.nombreCompleto}</span>
                          <select
                            className="focus-ring appearance-none rounded-lg border border-white/8 bg-[#15182e] py-2 pr-8 pl-3 text-[10px] font-bold text-slate-300"
                            onChange={(evento) => onChangeRole(miembro.usuarioId, evento.target.value)}
                            value={miembro.rol === "Catador oficial" ? "Aprendiz" : miembro.rol}
                          >
                            <option>Aprendiz</option>
                            <option>Alquimista sénior</option>
                          </select>
                          <FiChevronDown className="pointer-events-none absolute top-1/2 right-2 -translate-y-1/2 text-slate-600" aria-hidden="true" />
                        </label>
                        {miembro.rol !== "Catador oficial" && (
                          <button
                            className="focus-ring rounded-lg border border-cyan-300/15 bg-cyan-300/6 px-3 py-2 text-[10px] font-bold text-cyan-200 transition hover:bg-cyan-300/10"
                            onClick={() => onAppointTaster(miembro.usuarioId)}
                            type="button"
                          >
                            Nombrar catador
                          </button>
                        )}
                      </div>
                    )}
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default ListaMiembros;
