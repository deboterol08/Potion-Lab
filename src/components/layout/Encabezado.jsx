function Encabezado({ usuario, votosCompletados, totalCategorias, onLogout }) {
  return (
    <header className="site-header">
      <div className="header-content container">
        <a className="brand" href="#inicio">
          <span className="brand-mark">PL</span>
          <span>
            <strong>Potion Lab</strong>
            <small>Beta 1.0.</small>
          </span>
        </a>

        <div className="header-actions">
          <div className="vote-counter" aria-label="Progreso de votación">
            <span>Votos</span>
            <strong>
              {votosCompletados}/{totalCategorias}
            </strong>
          </div>

          <div className="user-summary">
            <span className="avatar" aria-hidden="true">
              {usuario.nombreCompleto.charAt(0)}
            </span>
            <span>
              <strong>{usuario.nombreCompleto}</strong>
              <small>{usuario.especialidad}</small>
            </span>
          </div>

          <button
            className="button button--ghost"
            type="button"
            onClick={onLogout}
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    </header>
  );
}

export default Encabezado;
