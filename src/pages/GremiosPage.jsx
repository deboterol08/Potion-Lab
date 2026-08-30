// Importamos hooks de React, componentes visuales e íconos necesarios
import { useState } from "react";
import { FiLock, FiPlus, FiSearch, FiUsers } from "react-icons/fi";
import EncabezadoPagina from "../components/common/EncabezadoPagina";
import EstadoVacio from "../components/common/EstadoVacio";
import Modal from "../components/common/Modal";
import TarjetaGremio from "../components/gremio/TarjetaGremio";

// formulario de creación de gremios
const formularioInicial = {
  nombre: "",
  lema: "",
  descripcion: "",
  tipo: "publico",
  emblemaUrl: "",
};

function GremiosPage({ usuario, gremios, onCreateGuild, onJoinGuild }) {
  // Estados para búsqueda por texto, filtro de membresía y modales/formularios
  const [busqueda, setBusqueda] = useState("");
  const [soloMios, setSoloMios] = useState(false);
  const [modalCrear, setModalCrear] = useState(false);
  const [gremioParaUnirse, setGremioParaUnirse] = useState(null);
  const [codigo, setCodigo] = useState("");
  const [error, setError] = useState("");
  const [formulario, setFormulario] = useState(formularioInicial);

  // Filtra gremios por coincidencia en nombre/lema y por membresía 
  const gremiosFiltrados = gremios.filter((gremio) => {
    const coincideTexto = `${gremio.nombre} ${gremio.lema}`
      .toLowerCase()
      .includes(busqueda.toLowerCase());
    const pertenece = gremio.miembros.some(
      (miembro) => miembro.usuarioId === usuario.id,
    );
    return coincideTexto && (!soloMios || pertenece);
  });

  // para la creación de un nuevo gremio con manejo de errores
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

  // directa si es público o abre modal para código si es privado
  function abrirUnion(gremio) {
    if (gremio.tipo === "publico") {
      onJoinGuild(gremio.id, "");
      return;
    }
    setGremioParaUnirse(gremio);
    setCodigo("");
    setError("");
  }

  // para validar el código de acceso e ingresar a un gremio privado
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
    <div className="gremios-lista-vertical-buscar-gremios-search-mostrar">
      {/* Encabezado con título de la sección y botón para abrir el modal de creación */}
      <EncabezadoPagina
        acciones={
          <button
            className="gremios-boton-plus-crear-gremio"
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

      {/* Búsqueda textual y conmutador para mostrar solo gremios propios */}
      <section className="gremios-seccion-buscar-gremios-search-mostrar">
        <label className="gremios-etiqueta-campo-buscar-gremios-search">
          <span className="gremios-texto-buscar-gremios">Buscar gremios</span>
          <FiSearch className="gremios-icono-search" aria-hidden="true" />
          <input
            className="gremios-campo-buscar-por-nombre-o"
            onChange={(evento) => setBusqueda(evento.target.value)}
            placeholder="Buscar por nombre o lema..."
            value={busqueda}
          />
        </label>
        <button
          aria-pressed={soloMios}
          className={`gremios-boton-filtro ${
            soloMios
              ? "gremios-boton-filtro-activo"
              : "gremios-boton-filtro-inactivo"
          }`}
          onClick={() => setSoloMios((valor) => !valor)}
          type="button"
        >
          Mostrar solo mis gremios
        </button>
      </section>

      {/* Muestra la grilla de gremios o el estado vacío */}
      {gremiosFiltrados.length > 0 ? (
        <section className="gremios-cuadricula-map">
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

      {/* formulario para registrar y fundar un nuevo gremio */}
      <Modal
        abierto={modalCrear}
        descripcion="Serás Gran Maestre y podrás administrar roles y fórmulas."
        onCerrar={() => {
          setModalCrear(false);
          setError("");
        }}
        titulo="Fundar un gremio"
      >
        <form className="gremios-formulario-nombre-del-gremio-lema" onSubmit={manejarCrear}>
          <label className="gremios-etiqueta-campo-nombre-del-gremio">
            <span className="gremios-texto-nombre-del-gremio">Nombre del gremio</span>
            <input
              className="gremios-campo"
              maxLength="50"
              onChange={(evento) => setFormulario((anterior) => ({ ...anterior, nombre: evento.target.value }))}
              required
              value={formulario.nombre}
            />
          </label>
          <label className="gremios-etiqueta-campo-lema">
            <span className="gremios-texto-lema">Lema</span>
            <input
              className="gremios-campo-lema"
              maxLength="90"
              onChange={(evento) => setFormulario((anterior) => ({ ...anterior, lema: evento.target.value }))}
              required
              value={formulario.lema}
            />
          </label>
          <label className="gremios-etiqueta-campo-descripcion">
            <span className="gremios-texto-descripcion">Descripción</span>
            <textarea
              className="gremios-area-texto"
              maxLength="180"
              onChange={(evento) => setFormulario((anterior) => ({ ...anterior, descripcion: evento.target.value }))}
              required
              value={formulario.descripcion}
            />
          </label>
          <div className="gremios-cuadricula-visibilidad-publico-privado-url">
            <label className="gremios-etiqueta-campo-visibilidad-publico-privado">
              <span className="gremios-texto-visibilidad">Visibilidad</span>
              <select
                className="gremios-selector-publico-privado"
                onChange={(evento) => setFormulario((anterior) => ({ ...anterior, tipo: evento.target.value }))}
                value={formulario.tipo}
              >
                <option value="publico">Público</option>
                <option value="privado">Privado</option>
              </select>
            </label>
            <label className="gremios-etiqueta-campo-url-del-emblema">
              <span className="gremios-texto-url-del-emblema">URL del emblema</span>
              <input
                className="gremios-campo-opcional"
                onChange={(evento) => setFormulario((anterior) => ({ ...anterior, emblemaUrl: evento.target.value }))}
                placeholder="Opcional"
                type="url"
                value={formulario.emblemaUrl}
              />
            </label>
          </div>
          {error && <p className="gremios-descripcion-error" role="alert">{error}</p>}
          <button className="gremios-boton-crear-gremio" type="submit">
            Crear gremio
          </button>
        </form>
      </Modal>

      {/*  para ingresar el código de invitación e unirse a un gremio privado */}
      <Modal
        abierto={Boolean(gremioParaUnirse)}
        descripcion={`Solicita el código de 6 caracteres de ${gremioParaUnirse?.nombre ?? "este gremio"}.`}
        onCerrar={() => setGremioParaUnirse(null)}
        titulo="Unirse a gremio privado"
      >
        <form className="gremios-formulario-lock-codigo-de-invitacion" onSubmit={manejarUnion}>
          <label className="gremios-etiqueta-campo-lock-codigo-de-invitacion">
            <span className="gremios-texto-lock-codigo-de-invitacion">
              <FiLock aria-hidden="true" /> Código de invitación
            </span>
            <input
              autoFocus
              className="gremios-campo-codigo-invitacion"
              maxLength="6"
              onChange={(evento) => {
                setCodigo(evento.target.value.toUpperCase());
                setError("");
              }}
              required
              value={codigo}
            />
          </label>
          {error && <p className="gremios-error-union" role="alert">{error}</p>}
          <button className="gremios-boton-validar-y-unirme" type="submit">
            Validar y unirme
          </button>
        </form>
      </Modal>
    </div>
  );
}

export default GremiosPage;