export const CREDENCIALES_DEMO = {
  email: 'simon@potionlab.edu',
  password: 'pocion123',
}

export const USUARIO_DEMO = {
  id: 'usuario-01',
  nombreCompleto: 'Simón Álvarez',
  email: CREDENCIALES_DEMO.email,
  especialidad: 'Herbalista',
}

export const GREMIO_DEMO = {
  id: 'gremio-01',
  nombre: 'Orden del Eclipse',
  lema: 'Toda gran fórmula comienza con una duda.',
  tipo: 'Público',
  rolUsuario: 'Aprendiz',
  miembros: [
    {
      id: 'usuario-01',
      nombre: 'Simón Álvarez',
      especialidad: 'Herbalista',
      rol: 'Aprendiz',
    },
    {
      id: 'usuario-02',
      nombre: 'Nyra Solverde',
      especialidad: 'Maestra cervecera',
      rol: 'Gran Maestra',
    },
    {
      id: 'usuario-03',
      nombre: 'Lyrion Vale',
      especialidad: 'Runista',
      rol: 'Alquimista sénior',
    },
    {
      id: 'usuario-04',
      nombre: 'Kael Noctis',
      especialidad: 'Catador',
      rol: 'Catador oficial',
    },
  ],
}

export const FORMULA_DEMO = {
  id: 'formula-01',
  nombrePocion: 'Elixir del Eclipse',
  efectoDeseado:
    'Agudiza los sentidos durante la noche sin producir cansancio al amanecer.',
  dificultad: {
    etiqueta: 'Media',
    valor: 2,
  },
  estado: 'VotingOpen',
  estadoEtiqueta: 'Votación abierta',
  fechaCierre: '18 ago 2026',
  creadaPor: 'Lyrion Vale',
  categorias: [
    {
      id: 'ingrediente',
      nombre: 'Ingrediente base',
      opciones: [
        {
          id: 'mandragora',
          nombre: 'Raíz de mandrágora',
          sigla: 'RM',
          votosIniciales: 4,
        },
        {
          id: 'polvo-estelar',
          nombre: 'Polvo de estrellas',
          sigla: 'PE',
          votosIniciales: 3,
        },
      ],
    },
    {
      id: 'metodo',
      nombre: 'Método de calentamiento',
      opciones: [
        {
          id: 'llama-azul',
          nombre: 'Llama azul',
          sigla: 'LA',
          votosIniciales: 2,
        },
        {
          id: 'bano-arcano',
          nombre: 'Baño de agua arcana',
          sigla: 'BA',
          votosIniciales: 5,
        },
      ],
    },
    {
      id: 'frasco',
      nombre: 'Tipo de frasco',
      opciones: [
        {
          id: 'cristal-lunar',
          nombre: 'Cristal lunar',
          sigla: 'CL',
          votosIniciales: 3,
        },
        {
          id: 'calavera-plata',
          nombre: 'Calavera de plata',
          sigla: 'CP',
          votosIniciales: 4,
        },
      ],
    },
  ],
}
