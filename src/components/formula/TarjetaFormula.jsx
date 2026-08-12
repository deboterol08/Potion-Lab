import CategoriaVotacion from './CategoriaVotacion'

function TarjetaFormula({ formula, votosUsuario, onVote }) {
  const votosCompletados = Object.values(votosUsuario).filter(Boolean).length

  return (
    <section className="card formula-card" aria-labelledby="formula-title">
      <div className="card-heading formula-heading">
        <div>
          <p className="eyebrow">Fórmula activa</p>
          <h2 id="formula-title">{formula.nombrePocion}</h2>
        </div>
        <span className="status-badge">
          <span aria-hidden="true" />
          {formula.estadoEtiqueta}
        </span>
      </div>

      <p className="formula-effect">{formula.efectoDeseado}</p>

      <dl className="formula-meta">
        <div>
          <dt>Dificultad propuesta</dt>
          <dd>{formula.dificultad.etiqueta}</dd>
        </div>
        <div>
          <dt>Cierre</dt>
          <dd>{formula.fechaCierre}</dd>
        </div>
        <div>
          <dt>Creada por</dt>
          <dd>{formula.creadaPor}</dd>
        </div>
      </dl>

      <div className="voting-header">
        <div>
          <p className="eyebrow">Mesa de votación</p>
          <h3>Elige una opción por categoría</h3>
        </div>
        <span>
          {votosCompletados} de {formula.categorias.length} completados
        </span>
      </div>

      <div className="voting-list">
        {formula.categorias.map((categoria, indice) => (
          <CategoriaVotacion
            key={categoria.id}
            numero={indice + 1}
            categoria={categoria}
            opcionSeleccionada={votosUsuario[categoria.id]}
            onVote={onVote}
          />
        ))}
      </div>

      <p className="formula-note">
        Puedes cambiar cada elección mientras la fórmula permanezca en votación.
      </p>
    </section>
  )
}

export default TarjetaFormula
