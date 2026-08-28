import { calcularGanador, obtenerPesoVoto } from "./voting";

export const TRANSICIONES_VALIDAS = {
  proposal: "voting",
  voting: "closed",
  closed: "distilled",
};

export function crearPocionDesdeFormula(
  formula,
  votosFormula,
  usuario,
  catadorOficial,
) {
  const ganadores = formula.categorias.map((categoria) => {
    const peso = obtenerPesoVoto(usuario, categoria.id, catadorOficial);
    return {
      categoriaId: categoria.id,
      ...calcularGanador(categoria, formula, votosFormula?.[categoria.id], peso),
    };
  });

  const ingrediente = ganadores.find((item) => item.categoriaId === "ingrediente");
  const metodo = ganadores.find((item) => item.categoriaId === "metodo");
  const frasco = ganadores.find((item) => item.categoriaId === "frasco");
  const dificultadReal = Number(
    (formula.dificultad + ingrediente.opcion.peso + metodo.opcion.peso).toFixed(1),
  );
  const rareza = Math.round(
    formula.dificultad * 10 +
      ingrediente.opcion.peso * 3 +
      metodo.opcion.peso * 2,
  );

  return {
    id: `p-${Date.now()}`,
    formulaId: formula.id,
    gremioId: formula.gremioId,
    nombre: `${ingrediente.opcion.nombre} + ${metodo.opcion.nombre} en ${frasco.opcion.nombre}`,
    efecto: formula.efectoDeseado,
    dificultadReal,
    rareza,
    fechaDestilacion: new Date().toISOString(),
    decisiones: ganadores.map((item) => ({
      categoriaId: item.categoriaId,
      opcion: item.opcion.nombre,
      metodo: item.metodo,
    })),
  };
}
