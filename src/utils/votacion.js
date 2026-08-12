// Esta función es JavaScript puro. Mantener el cálculo fuera del componente
// hace que CategoriaVotacion se concentre en mostrar la interfaz.
export function calcularResultados(opciones, opcionSeleccionada) {
  const opcionesConVotoActual = opciones.map((opcion) => ({
    ...opcion,
    totalVotos:
      opcion.votosIniciales + Number(opcion.id === opcionSeleccionada),
  }))

  const totalGeneral = opcionesConVotoActual.reduce(
    (acumulado, opcion) => acumulado + opcion.totalVotos,
    0,
  )

  let porcentajeAcumulado = 0

  return opcionesConVotoActual.map((opcion, indice) => {
    const esUltimaOpcion = indice === opcionesConVotoActual.length - 1
    const porcentaje =
      totalGeneral === 0
        ? 0
        : esUltimaOpcion
          ? 100 - porcentajeAcumulado
          : Math.round((opcion.totalVotos / totalGeneral) * 100)

    porcentajeAcumulado += porcentaje

    return {
      ...opcion,
      porcentaje,
    }
  })
}
