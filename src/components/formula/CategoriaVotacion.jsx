import { FiCheck, FiShield, FiSlash } from "react-icons/fi";
import { calcularResultados } from "../../utils/voting";

function CategoriaVotacion({
  categoria,
  opcionSeleccionada,
  pesoVoto,
  veto,
  puedeVotar,
  puedeVetar,
  onVote,
  onVeto,
}) {
  const resultados = calcularResultados(
    categoria,
    opcionSeleccionada,
    pesoVoto,
    veto,
  );

  return (
    <fieldset className="categoria-votacion-elemento-fieldset-nombre-descripcion-peso-de">
      <legend className="categoria-votacion-elemento-legend-nombre-descripcion-peso-de">
        <span className="categoria-votacion-texto-nombre-descripcion-peso-de">
          <span>
            <strong className="categoria-votacion-dato-destacado-nombre">{categoria.nombre}</strong>
            <small className="categoria-votacion-detalle-descripcion">
              {categoria.descripcion}
            </small>
          </span>
          <span className="categoria-votacion-texto-peso-de-tu-voto">
            Peso de tu voto: {pesoVoto.toFixed(1)}×
          </span>
        </span>
      </legend>

      <div className="categoria-votacion-cuadricula-map">
        {resultados.map((opcion) => {
          const seleccionada = opcion.id === opcionSeleccionada;

          return (
            <article
              className={`categoria-votacion-tarjeta-opcion ${
                opcion.vetada
                  ? "categoria-votacion-opcion-vetada"
                  : seleccionada
                    ? "categoria-votacion-opcion-seleccionada"
                    : "categoria-votacion-opcion-disponible"
              }`}
              key={opcion.id}
            >
              <button
                aria-pressed={seleccionada}
                className="categoria-votacion-boton-sigla-nombre-opcion-vetada"
                disabled={!puedeVotar || opcion.vetada}
                onClick={() => onVote(categoria.id, opcion.id)}
                type="button"
              >
                <span className={`categoria-votacion-insignia-opcion ${
                  seleccionada
                    ? "categoria-votacion-insignia-seleccionada"
                    : "categoria-votacion-insignia-disponible"
                }`}>
                  {opcion.vetada ? <FiSlash /> : opcion.sigla}
                </span>
                <span className="categoria-votacion-texto-nombre-opcion-vetada">
                  <strong className="categoria-votacion-nombre-opcion">{opcion.nombre}</strong>
                  <small className="categoria-votacion-detalle-opcion-vetada">
                    {opcion.vetada ? (
                      "Opción vetada"
                    ) : seleccionada ? (
                      <><FiCheck /> Tu elección</>
                    ) : puedeVotar ? (
                      "Elegir opción"
                    ) : (
                      "Votación no disponible"
                    )}
                  </small>
                </span>
              </button>

              <div className="categoria-votacion-contenedor-to-fixed-votos-ponderados">
                <div className="categoria-votacion-contenedor-flexible-to-fixed-votos-ponderados">
                  <span className="categoria-votacion-texto-to-fixed-votos-ponderados">
                    {opcion.totalVotos.toFixed(1)} votos ponderados
                  </span>
                  <strong className="categoria-votacion-dato-destacado-porcentaje">{opcion.porcentaje}%</strong>
                </div>
                <div
                  aria-label={`${opcion.nombre}: ${opcion.porcentaje}%`}
                  aria-valuemax="100"
                  aria-valuemin="0"
                  aria-valuenow={opcion.porcentaje}
                  className="categoria-votacion-barra-progreso"
                  role="progressbar"
                >
                  <span
                    className={`categoria-votacion-relleno-resultado ${
                      seleccionada ? "categoria-votacion-resultado-seleccionado" : "categoria-votacion-resultado-normal"
                    }`}
                    style={{ width: `${opcion.porcentaje}%` }}
                  />
                </div>
              </div>

              {puedeVetar && !veto && (
                <button
                  className="categoria-votacion-boton-shield-aplicar-veto-de"
                  onClick={() => onVeto(categoria.id, opcion.id)}
                  type="button"
                >
                  <FiShield /> Aplicar veto de Catador
                </button>
              )}
            </article>
          );
        })}
      </div>
    </fieldset>
  );
}

export default CategoriaVotacion;
