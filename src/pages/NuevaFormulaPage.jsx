import { useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { FiArrowLeft, FiCalendar, FiCheck, FiInfo, FiLayers } from "react-icons/fi";
import { crearCategorias } from "../data/seedData";
import { puedeCrearFormula } from "../utils/roles";

function fechaParaInput(fecha) {
  const ajusteZona = fecha.getTimezoneOffset() * 60_000;
  return new Date(fecha.getTime() - ajusteZona).toISOString().slice(0, 10);
}

function NuevaFormulaPage({ usuario, gremios, onCreateFormula }) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const hoy = useMemo(() => new Date(), []);
  const fechaMaxima = useMemo(() => {
    const limite = new Date(hoy);
    limite.setDate(limite.getDate() + 7);
    limite.setHours(23, 59, 59, 999);
    return limite;
  }, [hoy]);
  const gremiosPermitidos = gremios.filter((gremio) => puedeCrearFormula(gremio, usuario));
  const gremioInicial = searchParams.get("gremio");
  const [error, setError] = useState("");
  const [formulario, setFormulario] = useState({
    gremioId: gremiosPermitidos.some((gremio) => gremio.id === gremioInicial)
      ? gremioInicial
      : (gremiosPermitidos[0]?.id ?? ""),
    nombrePocion: "",
    efectoDeseado: "",
    dificultad: "2",
    fechaCierre: fechaParaInput(fechaMaxima),
  });

  function manejarCambio(evento) {
    const { name, value } = evento.target;
    setFormulario((anterior) => ({ ...anterior, [name]: value }));
    setError("");
  }

  function manejarEnvio(evento) {
    evento.preventDefault();
    const cierre = new Date(`${formulario.fechaCierre}T23:59:00`);

    if (cierre < hoy || cierre > fechaMaxima) {
      setError("La fecha de cierre debe estar entre hoy y los próximos 7 días.");
      return;
    }

    const resultado = onCreateFormula({
      ...formulario,
      dificultad: Number(formulario.dificultad),
      fechaCierre: cierre.toISOString(),
      categorias: crearCategorias(),
    });

    if (!resultado.ok) {
      setError(resultado.mensaje);
      return;
    }

    navigate(`/formulas/${resultado.formulaId}`);
  }

  if (gremiosPermitidos.length === 0) {
    return (
      <div className="mx-auto max-w-2xl">
        <Link className="focus-ring inline-flex items-center gap-2 rounded-lg text-xs font-bold text-slate-500 hover:text-white" to="/formulas">
          <FiArrowLeft aria-hidden="true" /> Volver a fórmulas
        </Link>
        <section className="glass-panel mt-8 rounded-3xl p-8 text-center">
          <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-amber-300/8 text-amber-200 ring-1 ring-amber-300/15">
            <FiInfo aria-hidden="true" />
          </span>
          <h1 className="font-display mt-5 text-2xl font-semibold text-white">Aún no puedes crear fórmulas</h1>
          <p className="mt-3 text-sm leading-6 text-slate-400">
            Necesitas ser Gran Maestre o Alquimista sénior y mantener al menos 30% de participación.
          </p>
          <Link className="focus-ring mt-6 inline-flex rounded-xl bg-violet-500 px-5 py-3 text-xs font-extrabold text-white" to="/gremios">
            Revisar mis gremios
          </Link>
        </section>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-7">
      <Link className="focus-ring inline-flex items-center gap-2 rounded-lg text-xs font-bold text-slate-500 hover:text-white" to="/formulas">
        <FiArrowLeft aria-hidden="true" /> Volver a fórmulas
      </Link>

      <header>
        <p className="text-xs font-extrabold tracking-[0.2em] text-cyan-300 uppercase">Nueva propuesta</p>
        <h1 className="font-display mt-2 text-3xl font-semibold text-white md:text-4xl">Diseña una fórmula base</h1>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-400">
          Define el propósito y abre un expediente con las tres categorías oficiales de Potion Lab.
        </p>
      </header>

      <form className="space-y-6" onSubmit={manejarEnvio}>
        <section className="glass-panel rounded-2xl p-5 sm:p-7">
          <div className="mb-6 flex items-center gap-3 border-b border-white/8 pb-5">
            <span className="grid size-10 place-items-center rounded-xl bg-violet-300/10 text-violet-200 ring-1 ring-violet-300/15">
              <FiLayers aria-hidden="true" />
            </span>
            <div>
              <h2 className="text-sm font-bold text-white">Datos de la fórmula</h2>
              <p className="mt-1 text-xs text-slate-500">Todos los campos son obligatorios.</p>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block sm:col-span-2">
              <span className="mb-2 block text-xs font-bold text-slate-300">Gremio responsable</span>
              <select className="focus-ring w-full rounded-xl border border-white/10 bg-[#15182e] px-4 py-3 text-sm text-white" name="gremioId" onChange={manejarCambio} value={formulario.gremioId}>
                {gremiosPermitidos.map((gremio) => <option key={gremio.id} value={gremio.id}>{gremio.nombre}</option>)}
              </select>
            </label>
            <label className="block sm:col-span-2">
              <span className="mb-2 flex justify-between text-xs font-bold text-slate-300">
                Nombre de la poción <small className="font-normal text-slate-600">{formulario.nombrePocion.length}/50</small>
              </span>
              <input className="focus-ring w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none" maxLength="50" name="nombrePocion" onChange={manejarCambio} placeholder="Ej. Elixir de la Aurora" required value={formulario.nombrePocion} />
            </label>
            <label className="block sm:col-span-2">
              <span className="mb-2 flex justify-between text-xs font-bold text-slate-300">
                Efecto deseado <small className="font-normal text-slate-600">{formulario.efectoDeseado.length}/200</small>
              </span>
              <textarea className="focus-ring min-h-28 w-full resize-y rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none" maxLength="200" name="efectoDeseado" onChange={manejarCambio} placeholder="Describe qué debería lograr la poción..." required value={formulario.efectoDeseado} />
            </label>
            <label className="block">
              <span className="mb-2 block text-xs font-bold text-slate-300">Dificultad propuesta</span>
              <select className="focus-ring w-full rounded-xl border border-white/10 bg-[#15182e] px-4 py-3 text-sm text-white" name="dificultad" onChange={manejarCambio} value={formulario.dificultad}>
                <option value="1">Fácil · Nivel 1</option>
                <option value="2">Media · Nivel 2</option>
                <option value="3">Difícil · Nivel 3</option>
                <option value="4">Arcana · Nivel 4</option>
              </select>
            </label>
            <label className="block">
              <span className="mb-2 flex items-center gap-2 text-xs font-bold text-slate-300"><FiCalendar aria-hidden="true" /> Fecha de cierre</span>
              <input className="focus-ring w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none [color-scheme:dark]" max={fechaParaInput(fechaMaxima)} min={fechaParaInput(hoy)} name="fechaCierre" onChange={manejarCambio} required type="date" value={formulario.fechaCierre} />
            </label>
          </div>
        </section>

        <section className="glass-panel rounded-2xl p-5 sm:p-7">
          <div className="mb-5">
            <h2 className="text-sm font-bold text-white">Categorías oficiales</h2>
            <p className="mt-1 text-xs leading-5 text-slate-500">Cada fórmula comienza con exactamente dos opciones por categoría.</p>
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            {crearCategorias().map((categoria) => (
              <article className="rounded-xl border border-white/8 bg-white/[0.025] p-4" key={categoria.id}>
                <h3 className="text-xs font-bold text-slate-200">{categoria.nombre}</h3>
                <ul className="mt-3 space-y-2">
                  {categoria.opciones.map((opcion) => (
                    <li className="flex items-center gap-2 text-[11px] text-slate-500" key={opcion.id}>
                      <FiCheck className="text-cyan-300" aria-hidden="true" /> {opcion.nombre}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        {error && <p className="rounded-xl border border-rose-300/15 bg-rose-300/8 px-4 py-3 text-sm text-rose-200" role="alert">{error}</p>}

        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Link className="focus-ring rounded-xl border border-white/10 px-5 py-3 text-center text-xs font-bold text-slate-400 hover:bg-white/5 hover:text-white" to="/formulas">Cancelar</Link>
          <button className="focus-ring rounded-xl bg-violet-500 px-6 py-3 text-xs font-extrabold text-white shadow-lg shadow-violet-950/30 hover:bg-violet-400" type="submit">Guardar como propuesta</button>
        </div>
      </form>
    </div>
  );
}

export default NuevaFormulaPage;
