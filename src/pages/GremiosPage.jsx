import { useState } from "react";
import { FiLock, FiPlus, FiSearch, FiUsers } from "react-icons/fi";
import EncabezadoPagina from "../components/common/EncabezadoPagina";
import EstadoVacio from "../components/common/EstadoVacio";
import Modal from "../components/common/Modal";
import TarjetaGremio from "../components/gremio/TarjetaGremio";

const formularioInicial = {
  nombre: "",
  lema: "",
  descripcion: "",
  tipo: "publico",
  emblemaUrl: "",
};

function GremiosPage({ usuario, gremios, onCreateGuild, onJoinGuild }) {
  const [busqueda, setBusqueda] = useState("");
  const [soloMios, setSoloMios] = useState(false);
  const [modalCrear, setModalCrear] = useState(false);
  const [gremioParaUnirse, setGremioParaUnirse] = useState(null);
  const [codigo, setCodigo] = useState("");
  const [error, setError] = useState("");
  const [formulario, setFormulario] = useState(formularioInicial);

  const gremiosFiltrados = gremios.filter((gremio) => {
    const coincideTexto = `${gremio.nombre} ${gremio.lema}`
      .toLowerCase()
      .includes(busqueda.toLowerCase());
    const pertenece = gremio.miembros.some(
      (miembro) => miembro.usuarioId === usuario.id,
    );
    return coincideTexto && (!soloMios || pertenece);
  });

  function manejarCrear(evento) {
    evento.preventDefault();
    const resultado = onCreateGuild(formulario);
    if (!resultado.ok) {
      setError(resultado.mensaje);
      return;
    }
    setFormulario(formularioInicial);
    setError("");
    setModalCrear(false);
  }

  function abrirUnion(gremio) {
    if (gremio.tipo === "publico") {
      onJoinGuild(gremio.id, "");
      return;
    }
    setGremioParaUnirse(gremio);
    setCodigo("");
    setError("");
  }

  function manejarUnion(evento) {
    evento.preventDefault();
    const resultado = onJoinGuild(gremioParaUnirse.id, codigo);
    if (!resultado.ok) {
      setError(resultado.mensaje);
      return;
    }
    setGremioParaUnirse(null);
    setError("");
  }

  return (
    <div className="space-y-8">
      <EncabezadoPagina
        acciones={
          <button
            className="focus-ring flex items-center gap-2 rounded-xl bg-violet-500 px-4 py-3 text-xs font-extrabold text-white transition hover:-translate-y-0.5 hover:bg-violet-400"
            onClick={() => setModalCrear(true)}
            type="button"
          >
            <FiPlus aria-hidden="true" /> Crear gremio
          </button>
        }
        descripcion="Encuentra una comunidad, revisa sus especialidades o funda tu propio círculo alquímico."
        etiqueta="Comunidad alquímica"
        titulo="Gremios"
      />

      <section className="glass-panel flex flex-col gap-3 rounded-2xl p-3 sm:flex-row sm:items-center">
        <label className="relative flex-1">
          <span className="sr-only">Buscar gremios</span>
          <FiSearch className="absolute top-1/2 left-4 -translate-y-1/2 text-slate-600" aria-hidden="true" />
          <input
            className="focus-ring w-full rounded-xl border border-white/8 bg-black/15 py-3 pr-4 pl-11 text-sm text-white outline-none placeholder:text-slate-600"
            onChange={(evento) => setBusqueda(evento.target.value)}
            placeholder="Buscar por nombre o lema..."
            value={busqueda}
          />
        </label>
        <button
          aria-pressed={soloMios}
          className={`focus-ring rounded-xl px-4 py-3 text-xs font-bold transition ${
            soloMios
              ? "bg-cyan-300/12 text-cyan-200 ring-1 ring-cyan-300/20"
              : "bg-white/[0.035] text-slate-400 hover:text-white"
          }`}
          onClick={() => setSoloMios((valor) => !valor)}
          type="button"
        >
          Mostrar solo mis gremios
        </button>
      </section>

      {gremiosFiltrados.length > 0 ? (
        <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {gremiosFiltrados.map((gremio) => (
            <TarjetaGremio
              gremio={gremio}
              key={gremio.id}
              onJoin={abrirUnion}
              usuarioId={usuario.id}
            />
          ))}
        </section>
      ) : (
        <EstadoVacio
          descripcion="Prueba con otro término o muestra todos los gremios disponibles."
          icono={FiUsers}
          titulo="No encontramos gremios"
        />
      )}

      <Modal
        abierto={modalCrear}
        descripcion="Serás Gran Maestre y podrás administrar roles y fórmulas."
        onCerrar={() => {
          setModalCrear(false);
          setError("");
        }}
        titulo="Fundar un gremio"
      >
        <form className="space-y-4" onSubmit={manejarCrear}>
          <label className="block">
            <span className="mb-2 block text-xs font-bold text-slate-300">Nombre del gremio</span>
            <input
              className="focus-ring w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none"
              maxLength="50"
              onChange={(evento) => setFormulario((anterior) => ({ ...anterior, nombre: evento.target.value }))}
              required
              value={formulario.nombre}
            />
          </label>
          <label className="block">
            <span className="mb-2 block text-xs font-bold text-slate-300">Lema</span>
            <input
              className="focus-ring w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none"
              maxLength="90"
              onChange={(evento) => setFormulario((anterior) => ({ ...anterior, lema: evento.target.value }))}
              required
              value={formulario.lema}
            />
          </label>
          <label className="block">
            <span className="mb-2 block text-xs font-bold text-slate-300">Descripción</span>
            <textarea
              className="focus-ring min-h-24 w-full resize-y rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none"
              maxLength="180"
              onChange={(evento) => setFormulario((anterior) => ({ ...anterior, descripcion: evento.target.value }))}
              required
              value={formulario.descripcion}
            />
          </label>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-xs font-bold text-slate-300">Visibilidad</span>
              <select
                className="focus-ring w-full rounded-xl border border-white/10 bg-[#15182e] px-4 py-3 text-sm text-white"
                onChange={(evento) => setFormulario((anterior) => ({ ...anterior, tipo: evento.target.value }))}
                value={formulario.tipo}
              >
                <option value="publico">Público</option>
                <option value="privado">Privado</option>
              </select>
            </label>
            <label className="block">
              <span className="mb-2 block text-xs font-bold text-slate-300">URL del emblema</span>
              <input
                className="focus-ring w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none"
                onChange={(evento) => setFormulario((anterior) => ({ ...anterior, emblemaUrl: evento.target.value }))}
                placeholder="Opcional"
                type="url"
                value={formulario.emblemaUrl}
              />
            </label>
          </div>
          {error && <p className="rounded-xl bg-rose-300/8 px-4 py-3 text-xs text-rose-200" role="alert">{error}</p>}
          <button className="focus-ring w-full rounded-xl bg-violet-500 px-5 py-3.5 text-sm font-extrabold text-white hover:bg-violet-400" type="submit">
            Crear gremio
          </button>
        </form>
      </Modal>

      <Modal
        abierto={Boolean(gremioParaUnirse)}
        descripcion={`Solicita el código de 6 caracteres de ${gremioParaUnirse?.nombre ?? "este gremio"}.`}
        onCerrar={() => setGremioParaUnirse(null)}
        titulo="Unirse a gremio privado"
      >
        <form className="space-y-4" onSubmit={manejarUnion}>
          <label className="block">
            <span className="mb-2 flex items-center gap-2 text-xs font-bold text-slate-300">
              <FiLock aria-hidden="true" /> Código de invitación
            </span>
            <input
              autoFocus
              className="focus-ring w-full rounded-xl border border-white/10 bg-white/5 px-4 py-4 text-center font-mono text-lg font-bold tracking-[0.35em] text-white uppercase outline-none"
              maxLength="6"
              onChange={(evento) => {
                setCodigo(evento.target.value.toUpperCase());
                setError("");
              }}
              required
              value={codigo}
            />
          </label>
          {error && <p className="rounded-xl bg-rose-300/8 px-4 py-3 text-xs text-rose-200" role="alert">{error}</p>}
          <button className="focus-ring w-full rounded-xl bg-violet-500 px-5 py-3.5 text-sm font-extrabold text-white hover:bg-violet-400" type="submit">
            Validar y unirme
          </button>
        </form>
      </Modal>
    </div>
  );
}

export default GremiosPage;
