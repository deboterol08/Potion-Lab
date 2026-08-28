export function obtenerMiembro(gremio, usuarioId) {
  return gremio?.miembros.find((miembro) => miembro.usuarioId === usuarioId);
}

export function obtenerRol(gremio, usuarioId) {
  return obtenerMiembro(gremio, usuarioId)?.rol ?? "Visitante";
}

export function puedeAdministrarGremio(gremio, usuarioId) {
  return obtenerRol(gremio, usuarioId) === "Gran Maestre";
}

export function puedeCrearFormula(gremio, usuario) {
  const rol = obtenerRol(gremio, usuario.id);
  const rolPermitido = ["Gran Maestre", "Alquimista sénior"].includes(rol);
  return rolPermitido && usuario.participacion >= 30;
}

export function esCatadorOficial(gremio, usuarioId) {
  return obtenerRol(gremio, usuarioId) === "Catador oficial";
}
