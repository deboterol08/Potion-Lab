import { useState } from "react";
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
  // Se calcula la fecha directamente porque solo necesitamos sumar siete días.
  const hoy = new Date();
  const fechaMaxima = new Date();
  fechaMaxima.setDate(fechaMaxima.getDate() + 7);
  fechaMaxima.setHours(23, 59, 59, 999);
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
      <div className="nueva-formula-contenedor-arrow-left-volver-a">
        <Link className="nueva-formula-enlace-formulas" to="/formulas">
          <FiArrowLeft aria-hidden="true" /> Volver a fórmulas
        </Link>
        <section className="nueva-formula-seccion-info-aun-no-puedes">
          <span className="nueva-formula-insignia-info">
            <FiInfo aria-hidden="true" />
          </span>
          <h1 className="nueva-formula-titulo-principal-aun-no-puedes-crear">Aún no puedes crear fórmulas</h1>
          <p className="nueva-formula-descripcion-necesitas-ser-gran-maestre">
            Necesitas ser Gran Maestre o Alquimista sénior y mantener al menos 30% de participación.
          </p>
          <Link className="nueva-formula-enlace-gremios" to="/gremios">
            Revisar mis gremios
          </Link>
        </section>
      </div>
    );
  }

  return (
    <div className="nueva-formula-lista-vertical-arrow-left-volver-a">
      <Link className="nueva-formula-enlace-volver-formulas" to="/formulas">
        <FiArrowLeft aria-hidden="true" /> Volver a fórmulas
      </Link>

      <header>
        <p className="nueva-formula-descripcion-nueva-propuesta">Nueva propuesta</p>
        <h1 className="nueva-formula-titulo-principal-disena-una-formula-base">Diseña una fórmula base</h1>
        <p className="nueva-formula-descripcion-define-el-proposito-y">
          Define el propósito y abre un expediente con las tres categorías oficiales de Potion Lab.
        </p>
      </header>

      <form className="nueva-formula-formulario-layers-datos-de-la" onSubmit={manejarEnvio}>
        <section className="nueva-formula-seccion-layers-datos-de-la">
          <div className="nueva-formula-contenedor-flexible-layers-datos-de-la">
            <span className="nueva-formula-insignia-layers">
              <FiLayers aria-hidden="true" />
            </span>
            <div>
              <h2 className="nueva-formula-titulo-seccion-datos-de-la-formula">Datos de la fórmula</h2>
              <p className="nueva-formula-descripcion-todos-los-campos-son">Todos los campos son obligatorios.</p>
            </div>
          </div>

          <div className="nueva-formula-cuadricula-gremio-responsable-map-nombre">
            <label className="nueva-formula-etiqueta-campo-gremio-responsable-map">
              <span className="nueva-formula-texto-gremio-responsable">Gremio responsable</span>
              <select className="nueva-formula-selector-gremio-id" name="gremioId" onChange={manejarCambio} value={formulario.gremioId}>
                {gremiosPermitidos.map((gremio) => <option key={gremio.id} value={gremio.id}>{gremio.nombre}</option>)}
              </select>
            </label>
            <label className="nueva-formula-etiqueta-campo-nombre-de-la-pocion">
              <span className="nueva-formula-texto-nombre-de-la-pocion">
                Nombre de la poción <small className="nueva-formula-detalle-length-50">{formulario.nombrePocion.length}/50</small>
              </span>
              <input className="nueva-formula-campo-nombre-pocion" maxLength="50" name="nombrePocion" onChange={manejarCambio} placeholder="Ej. Elixir de la Aurora" required value={formulario.nombrePocion} />
            </label>
            <label className="nueva-formula-etiqueta-campo-efecto-deseado-length-200">
              <span className="nueva-formula-texto-efecto-deseado-length-200">
                Efecto deseado <small className="nueva-formula-detalle-length-200">{formulario.efectoDeseado.length}/200</small>
              </span>
              <textarea className="nueva-formula-area-texto-efecto-deseado" maxLength="200" name="efectoDeseado" onChange={manejarCambio} placeholder="Describe qué debería lograr la poción..." required value={formulario.efectoDeseado} />
            </label>
            <label className="nueva-formula-etiqueta-campo-dificultad-propuesta-facil">
              <span className="nueva-formula-texto-dificultad-propuesta">Dificultad propuesta</span>
              <select className="nueva-formula-selector-dificultad" name="dificultad" onChange={manejarCambio} value={formulario.dificultad}>
                <option value="1">Fácil · Nivel 1</option>
                <option value="2">Media · Nivel 2</option>
                <option value="3">Difícil · Nivel 3</option>
                <option value="4">Arcana · Nivel 4</option>
              </select>
            </label>
            <label className="nueva-formula-etiqueta-campo-calendar-fecha-de-cierre">
              <span className="nueva-formula-texto-calendar-fecha-de-cierre"><FiCalendar aria-hidden="true" /> Fecha de cierre</span>
              <input className="nueva-formula-campo-fecha-cierre" max={fechaParaInput(fechaMaxima)} min={fechaParaInput(hoy)} name="fechaCierre" onChange={manejarCambio} required type="date" value={formulario.fechaCierre} />
            </label>
          </div>
        </section>

        <section className="nueva-formula-seccion-categorias-oficiales-cada-formula">
          <div className="nueva-formula-contenedor-categorias-oficiales-cada-formula">
            <h2 className="nueva-formula-titulo-seccion-categorias-oficiales">Categorías oficiales</h2>
            <p className="nueva-formula-descripcion-cada-formula-comienza-con">Cada fórmula comienza con exactamente dos opciones por categoría.</p>
          </div>
          <div className="nueva-formula-cuadricula-map">
            {crearCategorias().map((categoria) => (
              <article className="nueva-formula-tarjeta-nombre-map" key={categoria.id}>
                <h3 className="nueva-formula-titulo-tarjeta-nombre">{categoria.nombre}</h3>
                <ul className="nueva-formula-lista-map">
                  {categoria.opciones.map((opcion) => (
                    <li className="nueva-formula-elemento-lista-check-nombre" key={opcion.id}>
                      <FiCheck className="nueva-formula-icono-check" aria-hidden="true" /> {opcion.nombre}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        {error && <p className="nueva-formula-descripcion-error" role="alert">{error}</p>}

        <div className="nueva-formula-contenedor-flexible-cancelar-guardar-como-propuesta">
          <Link className="nueva-formula-enlace-cancelar" to="/formulas">Cancelar</Link>
          <button className="nueva-formula-boton-guardar-como-propuesta" type="submit">Guardar como propuesta</button>
        </div>
      </form>
    </div>
  );
}

export default NuevaFormulaPage;
