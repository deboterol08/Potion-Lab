# Potion Lab

Plataforma web para la gestión colaborativa de gremios alquímicos: evaluación de fórmulas, algoritmo de votación ponderada por especialidad, resolución jerárquica de empates, persistencia local reactiva y destilación al Grimorio.

![React](https://img.shields.io/badge/React_19-61DAFB?style=flat-square&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite_8-646CFF?style=flat-square&logo=vite&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router_v7-CA4245?style=flat-square&logo=reactrouter&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript_ES6+-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![CSS3](https://img.shields.io/badge/CSS_Vanilla-1572B6?style=flat-square&logo=css3&logoColor=white)

---

## Índice

* [Contexto del Proyecto](#contexto-del-proyecto)
* [Lógica de Negocio y Cómputo de Votos](#lógica-de-negocio-y-cómputo-de-votos)
* [Arquitectura y Decisiones Técnicas](#arquitectura-y-decisiones-técnicas)
* [Rutas de la Aplicación](#rutas-de-la-aplicación)
* [Estructura de Directorios](#estructura-de-directorios)
* [Instalación y Uso](#instalación-y-uso)

---

## Contexto del Proyecto

Potion Lab es una Single Page Application (SPA) desarrollada para coordinar el proceso de formulación e investigación entre alquimistas y sus respectivos gremios. La plataforma abarca todo el flujo operativo: desde la propuesta inicial de componentes hasta la evaluación colaborativa mediante consensos y vetos por categorías.

La aplicación opera 100% del lado del cliente, gestionando el estado de sesión de manera global y sincronizando todas las entidades (usuarios, gremios, fórmulas y sesiones) mediante almacenamiento persistente en el navegador.

---

## Lógica de Negocio y Cómputo de Votos

El núcleo del sistema implementa un motor de cálculo y resolución de votaciones dividido en tres fases principales:

### 1. Ponderación del Voto (`obtenerPesoVoto`)
El peso del voto no es unitario ni estático; se calcula según el perfil del alquimista y la categoría evaluada (`ingrediente`, `metodo` o `frasco`):
* **Especialización por Categoría:** Si un usuario vota en su área de conocimiento (Herbalista en `ingrediente`, Runista en `metodo` o Catador en `frasco`), su voto recibe un peso de **1.2**.
* **Maestro Cervecero:** Otorga de forma transversal un peso multiplicador de **1.2**.
* **Catador Oficial:** Duplica el peso total calculado (`peso * 2`) en todas las categorías.

### 2. Filtro de Vetos y Normalización
* **Tratamiento de Vetos:** Las opciones marcadas con un veto activo quedan etiquetadas (`vetada: true`) y se excluyen automáticamente del conteo de alternativas para determinar la opción ganadora.
* **Ajuste Porcentual:** El cálculo redistribuye las proporciones ajustando el residuo en el último elemento para asegurar que la suma acumulada sea siempre exactamente un 100%, evitando desfases por redondeo.

### 3. Algoritmo de Desempate en Cascada (`resolverEmpate`)
Si dos o más opciones no vetadas obtienen la misma cantidad máxima de votos, el sistema resuelve la ambigüedad en un orden estricto de prelación:
1. **Voto del Catador Oficial:** Si la opción empatada coincide con la elección del Catador Oficial, esta se selecciona.
2. **Decisión del Gran Maestre:** En su defecto, se valida si coincide con la preferencia del Gran Maestre.
3. **Selección Aleatoria:** Como último recurso de contingencia, el sistema realiza una elección determinista al azar entre las opciones empatadas.

---

## Arquitectura y Decisiones Técnicas

* **Persistencia Reactiva (`useLocalStorage`):** Se diseñó un custom hook genérico que reutiliza la interfaz de `useState`, encapsulando la lectura/escritura en `localStorage` con aislamiento en bloques `try/catch` y serialización `JSON.parse` / `JSON.stringify`. Se emplea inicialización perezosa (*lazy initial state*) para realizar la lectura de disco únicamente en el primer renderizado.
* **Estado Global de Sesión (`UsuarioContext`):** Abstracción mediante la API de Contexto de React para exponer la información del usuario autenticado a lo largo de todo el árbol de componentes sin incurrir en *prop drilling*.
* **Estilos Semánticos con CSS Vanilla:** Se descartaron bibliotecas de utilidades (como Tailwind) en favor de clases semánticas propias (`.gremios-campo`, `.perfil-imagen`, `.grimorio-insignia`). La presentación implementa estados de enfoque accesibles (`:focus`), códigos de color con canal alfa/transparencia Hex8 (`#ffffff1a`, `#ffa2ae14`) y layouts basados en CSS Grid y Flexbox.
* **Desacoplamiento Funcional:** Los algoritmos de cómputo, normalización de porcentajes y desempate se encuentran completamente aislados como funciones puras dentro de `src/utils/`, manteniendo la interfaz gráfica enfocada en el renderizado de vistas.

---

## Rutas de la Aplicación

| Ruta | Propósito |
| :--- | :--- |
| `/` | Dashboard principal con métricas del laboratorio y accesos directos |
| `/gremios` | Directorio general y formulario de creación de nuevos gremios |
| `/gremios/:gremioId` | Gestión de miembros, solicitudes de unión e información del gremio |
| `/formulas` | Catálogo general de fórmulas registradas y filtrado por estado |
| `/formulas/nueva` | Formulario de registro para la propuesta de nuevas fórmulas |
| `/formulas/:formulaId` | Panel de votación por categorías (`ingrediente`, `metodo`, `frasco`), aplicación de vetos y destilación |
| `/grimorio` | Registro histórico inmutable de pociones aprobadas |
| `/ranking` | Clasificación general de alquimistas y gremios destacados |
| `/perfil` | Configuración del usuario activo y gestión del contexto de sesión |

---

## Estructura de Directorios

```text
src/
├── components/
│   ├── authentication/  # Control de acceso e inicio de sesión
│   ├── common/          # Modales, avisos, badges e insignias reutilizables
│   ├── formula/         # Paneles de votación, categorías y tarjetas de fórmulas
│   ├── gremio/          # Vistas de directorio y gestión de integrantes
│   └── layout/          # Estructura principal de la SPA (Header, Nav, Contenedores)
├── context/             # Manejo del estado global de sesión (UsuarioContext)
├── data/                # Semilla inicial con datos de prueba (seedData)
├── hooks/               # Custom hooks de almacenamiento local (useLocalStorage)
├── pages/               # Componentes de página vinculados a React Router
├── styles/              # Módulos CSS aislados con clases semánticas
├── utils/               # Motores de cálculo de votos, desempates y formateadores
├── App.jsx              # Configuración del enrutador y proveedores de contexto
└── index.css            # Reset global y estilos base de la aplicación
```

---

## Instalación y Uso

Requisito previo: **Node.js 22.12** o superior.

```bash
# 1. Clonar el repositorio e ingresar al directorio
git clone [https://github.com/USUARIO/Potion_Lab.git](https://github.com/USUARIO/Potion_Lab.git)
cd Potion_Lab

# 2. Instalar dependencias
npm install

# 3. Iniciar el servidor de desarrollo en Vite
npm run dev

# 4. Validar sintaxis y generar la compilación de producción
npm run lint
npm run build
```
