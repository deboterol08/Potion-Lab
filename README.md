# Potion Lab

Potion Lab es un frontend académico para organizar gremios de alquimistas. Los usuarios pueden crear fórmulas, votar por sus partes y guardar el resultado final en un grimorio.

El proyecto funciona con datos de prueba y `localStorage`. No usa un servidor ni una base de datos real, por lo que está pensado como demostración de la primera entrega de Ingeniería Web.

## Funciones principales

- Registro, inicio de sesión, cierre de sesión y edición de perfil.
- Creación de gremios públicos o privados.
- Unión a gremios privados con un código de seis caracteres.
- Lista de miembros con especialidad, fecha y rol.
- Creación de fórmulas mediante un formulario controlado.
- Estados de fórmula: propuesta, votación, cierre y destilación.
- Un voto por cada categoría y posibilidad de cambiarlo mientras esté abierto.
- Peso del voto según la especialidad y voto doble del Catador Oficial.
- Resultados con conteos y porcentajes.
- Grimorio con búsqueda y filtro.
- Ranking de alquimistas.

## Cómo ejecutar el proyecto

Se recomienda Node.js 22.12 o una versión posterior.

```bash
npm install
npm run dev
```

Para revisar el código y crear la versión de entrega:

```bash
npm run lint
npm run build
```

## Cuentas de prueba

| Rol | Correo | Contraseña |
| --- | --- | --- |
| Gran Maestre | `simon@potionlab.edu` | `pocion123` |
| Catador Oficial | `kael@potionlab.edu` | `catador123` |

No se debe usar una contraseña real. Las cuentas solo se guardan en el navegador.

## Rutas

| Ruta | Vista |
| --- | --- |
| `/` | Resumen |
| `/gremios` | Lista y creación de gremios |
| `/gremios/:gremioId` | Detalle de un gremio |
| `/formulas` | Lista y filtros de fórmulas |
| `/formulas/nueva` | Formulario para crear una fórmula |
| `/formulas/:formulaId` | Votación y resultado de una fórmula |
| `/grimorio` | Pociones destiladas |
| `/ranking` | Ranking de usuarios |
| `/perfil` | Perfil del usuario |

## Estructura del código

```text
src/
├── components/
│   ├── authentication/  # inicio de sesión y registro
│   ├── common/          # piezas usadas en varias vistas
│   ├── formula/         # tarjetas y votación
│   ├── gremio/          # tarjetas y miembros
│   └── layout/          # barras de navegación
├── context/             # usuario compartido con Context API
├── data/                # datos mock
├── hooks/               # guardado sencillo en localStorage
├── pages/               # vistas de cada ruta
├── utils/               # cálculos y funciones auxiliares
├── App.jsx              # estado, acciones y rutas
└── index.css            # estilos generales pequeños
```

## Cómo se cumple la rúbrica

| Requisito | Dónde se puede revisar |
| --- | --- |
| Estructura organizada | Carpetas `components`, `pages`, `context`, `hooks`, `data` y `utils` |
| Componentes con props | `TarjetaGremio`, `TarjetaFormula`, `Modal`, `TarjetaEstadistica` y otros |
| Todas las vistas | Rutas declaradas en `App.jsx` |
| Lista de ítems | Gremios, fórmulas, grimorio, miembros y ranking |
| Datos mock | `src/data/seedData.js` |
| Formulario controlado | Registro, perfil, gremios y `NuevaFormulaPage.jsx` |
| Validación y feedback | Mensajes de error y componente `Aviso.jsx` |
| Context API | `src/context/UsuarioContext.jsx`; lo leen las dos barras de navegación |
| Estilos responsive | CSS plano organizado en `src/styles` e importado desde `src/index.css` |
| Código reutilizable | Componentes compartidos y funciones pequeñas en `utils` |

Los datos iniciales incluyen 3 gremios, 12 usuarios, 10 fórmulas en distintos estados, votos de prueba y Catadores Oficiales.

## Explicación técnica sencilla

- `useState` guarda formularios, filtros y mensajes temporales.
- `useEffect` se usa para guardar datos en `localStorage` y cerrar votaciones vencidas.
- `UsuarioContext` comparte el usuario activo con la barra superior y lateral.
- Las `props` llevan los demás datos y funciones desde `App.jsx` hacia las páginas.
- `map` muestra las listas y `filter` aplica búsquedas o filtros.
- React Router cambia de vista sin recargar toda la página.
- Cada elemento usa clases descriptivas y las reglas están escritas con CSS plano.
- `index.css` importa la base y las hojas organizadas por tipo de componente.

La actualización de votos se ve inmediatamente porque todo el estado vive en React. En una versión con varios usuarios conectados harían falta un backend y WebSocket o polling.

## Reglas de la demostración

- Una fórmula solo avanza siguiendo el orden permitido de estados.
- Solo Gran Maestre o Alquimista sénior puede crear y cambiar fórmulas.
- Un usuario con menos de 30% de participación no puede crear fórmulas.
- El Catador Oficial tiene voto doble y un veto por fórmula.
- En un empate decide el Catador Oficial, después el Gran Maestre y, si no hay decisión, se elige al azar.
- Al destilar, el resultado se añade al grimorio.

## Créditos

El diseño de las vistas y la adaptación al tema de Potion Lab forman parte de este proyecto. Se usaron estas herramientas externas:

- [React](https://react.dev/) y [Vite](https://vite.dev/) para construir la aplicación.
- [React Router](https://reactrouter.com/) para las rutas.
- CSS plano para los estilos y la adaptación responsive.
- [React Icons](https://react-icons.github.io/react-icons/) para mostrar iconos de Feather Icons y Game Icons.
- [Cinzel](https://fonts.google.com/specimen/Cinzel) y [Manrope](https://fonts.google.com/specimen/Manrope) desde Google Fonts.

No se copiaron componentes completos de una plantilla. Si más adelante se adapta un snippet o componente externo, se debe dejar junto al código un comentario con el formato `// Basado en: enlace-de-la-fuente`.

## Limitaciones actuales

Como es una entrega de frontend, la autenticación y los permisos también se validan en el navegador. Una aplicación real necesitaría backend, contraseñas cifradas, base de datos y autorización del lado del servidor.
