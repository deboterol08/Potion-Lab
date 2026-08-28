const ESPECIALIDAD_POR_CATEGORIA = {
  ingrediente: "Herbalista",
  metodo: "Runista",
  frasco: "Catador",
};

// El enunciado no fija el multiplicador de Herbalista, Runista y Catador.
// Se centraliza en una constante para que el equipo pueda cambiarlo fácilmente.
const PESO_ESPECIALISTA = 1.5;

export function obtenerPesoVoto(usuario, categoriaId, catadorOficial = false) {
  let peso = 1;

  if (usuario.especialidad === "Maestro cervecero") {
    peso = 1.2;
  } else if (ESPECIALIDAD_POR_CATEGORIA[categoriaId] === usuario.especialidad) {
    peso = PESO_ESPECIALISTA;
  }

  return catadorOficial ? peso * 2 : peso;
}

export function calcularResultados(
  categoria,
  opcionSeleccionada,
  pesoVoto = 1,
  veto = null,
) {
  const opcionesConTotales = categoria.opciones.map((opcion) => ({
    ...opcion,
    vetada: veto?.categoriaId === categoria.id && veto?.opcionId === opcion.id,
    totalVotos:
      opcion.votosIniciales +
      (opcion.id === opcionSeleccionada ? pesoVoto : 0),
  }));

  const totalGeneral = opcionesConTotales.reduce(
    (total, opcion) => total + opcion.totalVotos,
    0,
  );

  let porcentajeAcumulado = 0;

  return opcionesConTotales.map((opcion, indice) => {
    const esUltima = indice === opcionesConTotales.length - 1;
    const porcentajeCalculado =
      totalGeneral === 0 ? 0 : Math.round((opcion.totalVotos / totalGeneral) * 100);
    const porcentaje = esUltima
      ? Math.max(0, 100 - porcentajeAcumulado)
      : porcentajeCalculado;

    porcentajeAcumulado += porcentaje;

    return { ...opcion, porcentaje };
  });
}

function resolverEmpate(opcionesEmpatadas, formula) {
  const votoCatador = formula.desempate?.catador;
  const votoGranMaestre = formula.desempate?.granMaestre;

  if (opcionesEmpatadas.some((opcion) => opcion.id === votoCatador)) {
    return {
      opcion: opcionesEmpatadas.find((opcion) => opcion.id === votoCatador),
      metodo: "voto del Catador Oficial",
    };
  }

  if (opcionesEmpatadas.some((opcion) => opcion.id === votoGranMaestre)) {
    return {
      opcion: opcionesEmpatadas.find((opcion) => opcion.id === votoGranMaestre),
      metodo: "decisión del Gran Maestre",
    };
  }

  const indiceAleatorio = Math.floor(Math.random() * opcionesEmpatadas.length);
  return {
    opcion: opcionesEmpatadas[indiceAleatorio],
    metodo: "selección aleatoria",
  };
}

export function calcularGanador(categoria, formula, opcionSeleccionada, pesoVoto) {
  const resultados = calcularResultados(
    categoria,
    opcionSeleccionada,
    pesoVoto,
    formula.veto,
  ).filter((opcion) => !opcion.vetada);

  const maximo = Math.max(...resultados.map((opcion) => opcion.totalVotos));
  const opcionesEmpatadas = resultados.filter(
    (opcion) => opcion.totalVotos === maximo,
  );

  if (opcionesEmpatadas.length === 1) {
    return { opcion: opcionesEmpatadas[0], metodo: "mayoría simple" };
  }

  return resolverEmpate(opcionesEmpatadas, formula);
}
