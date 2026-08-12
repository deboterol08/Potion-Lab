import { calcularResultados } from '../../utils/votacion'

function CategoriaVotacion({
  numero,
  categoria,
  opcionSeleccionada,
  onVote,
}) {
  // Los resultados son datos derivados: se recalculan durante cada renderizado
  // usando los votos iniciales y la selección actual del usuario.
  const resultados = calcularResultados(
    categoria.opciones,
    opcionSeleccionada,
  )

  return (
    <fieldset className="voting-category">
      <legend>
        <span>
          {numero}. {categoria.nombre}
        </span>
        <small>Selecciona 1</small>
      </legend>

      <div className="option-grid">
        {resultados.map((resultado) => {
          const estaSeleccionada = resultado.id === opcionSeleccionada

          return (
            <article
              className={`vote-option ${estaSeleccionada ? 'is-selected' : ''}`}
              key={resultado.id}
            >
              <button
                type="button"
                aria-pressed={estaSeleccionada}
                onClick={() => onVote(categoria.id, resultado.id)}
              >
                <span className="option-symbol" aria-hidden="true">
                  {resultado.sigla}
                </span>
                <span>
                  <strong>{resultado.nombre}</strong>
                  <small>
                    {estaSeleccionada ? 'Tu elección' : 'Elegir esta opción'}
                  </small>
                </span>
              </button>

              <div className="result-row">
                <div
                  className="progress-track"
                  role="progressbar"
                  aria-label={`${resultado.nombre}: ${resultado.porcentaje}%`}
                  aria-valuemin="0"
                  aria-valuemax="100"
                  aria-valuenow={resultado.porcentaje}
                >
                  <span style={{ width: `${resultado.porcentaje}%` }} />
                </div>
                <strong>{resultado.porcentaje}%</strong>
                <small>
                  {resultado.totalVotos}{' '}
                  {resultado.totalVotos === 1 ? 'voto' : 'votos'}
                </small>
              </div>
            </article>
          )
        })}
      </div>
    </fieldset>
  )
}

export default CategoriaVotacion
