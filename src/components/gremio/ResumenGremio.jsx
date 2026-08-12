function ResumenGremio({ gremio }) {
  return (
    <aside className="card guild-card">
      <div className="card-heading">
        <div>
          <p className="eyebrow">Tu gremio</p>
          <h2 id="guild-title">{gremio.nombre}</h2>
        </div>
        <span className="tag">{gremio.tipo}</span>
      </div>

      <blockquote>“{gremio.lema}”</blockquote>

      <dl className="guild-stats">
        <div>
          <dt>Tu rol</dt>
          <dd>{gremio.rolUsuario}</dd>
        </div>
        <div>
          <dt>Miembros</dt>
          <dd>{gremio.miembros.length}</dd>
        </div>
      </dl>

      <div className="member-section">
        <div className="section-label">
          <h3>Alquimistas</h3>
          <span>{gremio.miembros.length} activos</span>
        </div>

        <ul className="member-list">
          {gremio.miembros.map((miembro) => (
            // key ayuda a React a reconocer a cada miembro entre renderizados.
            <li key={miembro.id}>
              <span className="member-initial">{miembro.nombre.charAt(0)}</span>
              <span>
                <strong>{miembro.nombre}</strong>
                <small>{miembro.especialidad}</small>
              </span>
              <span className="member-role">{miembro.rol}</span>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

export default ResumenGremio;
