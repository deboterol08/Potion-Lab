# Potion Lab — Frontend 2.0

> Laboratorio colaborativo de pociones construido como proyecto académico de Ingeniería Web.

Potion Lab organiza el trabajo de gremios alquímicos: permite iniciar sesión, crear o explorar gremios, proponer fórmulas, votar por ingrediente, método y frasco, resolver empates y conservar el resultado en un grimorio.

La versión 2.0 es un **frontend demostrativo completo**. La autenticación, los permisos y los datos se simulan en el navegador con datos semilla y localStorage.

## Decisiones técnicas

- **React + Vite:** base de componentes y entorno de desarrollo.
- **React Router:** navegación SPA con rutas como /gremios/:gremioId y /formulas/:formulaId.
- **Tailwind CSS:** sistema principal de utilidades y diseño responsive.
- **Styled Components:** uso puntual en FondoAlquimico.jsx para encapsular la animación ambiental.
- **React Icons:** iconografía consistente sin archivos gráficos duplicados.
- **Google Fonts:** Cinzel para títulos y Manrope para lectura.
- **Estado local sencillo:** useState, props y un custom hook pequeño para localStorage. No se usa Redux ni un Context API complejo.

### ¿Por qué no usamos Bootstrap?

Bootstrap no aporta suficiente valor en esta versión. Tailwind ya cubre rejillas, espaciado, responsive, estados visuales y componentes básicos. Mezclar los dos produciría:

- clases y estilos duplicados;
- una hoja de estilos más pesada;
- mayor posibilidad de conflictos visuales;
- dos maneras distintas de resolver el mismo problema.

Por eso **Tailwind es el sistema principal** y Styled Components se reserva para un caso encapsulado y fácil de identificar.

### ¿Por qué no consumimos una API pública?

No existe una API pública que represente correctamente gremios, roles, fórmulas y votos de Potion Lab. Consumir una API de clima o datos aleatorios sería decorativo y aumentaría la complejidad sin solucionar una necesidad del proyecto. Los datos de dominio viven en src/data/seedData.js; más adelante pueden sustituirse por una API propia.

## Funcionalidades implementadas

### Autenticación y perfil

- Inicio y cierre de sesión demostrativos.
- Registro local de un nuevo alquimista.
- Nombre, correo universitario, especialidad y avatar URL opcional.
- Edición del perfil y persistencia en el navegador.

### Gremios

- Tres gremios semilla: dos públicos y uno privado.
- Creación de gremios públicos o privados.
- Código de invitación de seis caracteres.
- Lista de miembros, especialidad, rol y fecha de ingreso.
- Roles: Gran Maestre, Alquimista sénior, Catador Oficial y Aprendiz.
- Promoción o descenso de Alquimistas sénior, con máximo de tres.
- Nombramiento de un único Catador Oficial.

### Fórmulas y votación

- Diez fórmulas semilla: 2 propuestas, 3 abiertas, 2 cerradas y 3 destiladas.
- Creación con nombre, efecto, dificultad y cierre máximo a siete días.
- Tres categorías exactas con dos opciones cada una.
- Máquina de estados: Propuesta → Votación abierta → Cerrada → Destilada.
- Cierre manual y cierre automático al vencer la fecha.
- Una elección por categoría, reemplazable mientras la votación siga abierta.
- Conteos y porcentajes ponderados actualizados inmediatamente.
- Peso por especialidad, voto doble y veto único del Catador Oficial.
- Desempate: Catador Oficial → Gran Maestre → selección aleatoria.
- Registro de auditoría para cambios de estado, vetos y desempates.

> El enunciado no especifica el multiplicador de Herbalista, Runista y Catador. La demostración usa 1.5× en su categoría; Maestro cervecero usa el 1.2× indicado. La constante está centralizada en src/utils/voting.js.

### Resultados, grimorio y ranking

- Cálculo de combinación ganadora, dificultad real y rareza.
- Grimorio permanente con búsqueda y filtro por gremio.
- Ranking con puntos, rareza, precisión y participación.
- Advertencia y bloqueo de creación cuando la participación es menor al 30%.

## Datos semilla

- 3 gremios: 2 públicos y 1 privado.
- 12 usuarios: 4 Herbalistas, 3 Runistas, 3 Catadores y 2 Maestros cerveceros.
- 10 fórmulas en todos los estados solicitados.
- 45 votos iniciales distribuidos y al menos un empate.
- Catadores Oficiales nombrados en los gremios.

## Cuentas de prueba

| Rol para probar | Correo | Contraseña |
|---|---|---|
| Gran Maestre | simon@potionlab.edu | pocion123 |
| Catador Oficial | kael@potionlab.edu | catador123 |

No uses una contraseña real. Esta versión guarda las cuentas de demostración únicamente en el navegador y no ofrece seguridad de producción.

## Instalación

Requisito recomendado: Node.js 22.12 o superior.

~~~bash
git clone https://github.com/SimonAlvarez845/Potion-Lab.git
cd Potion-Lab
npm install
npm run dev
~~~

Comprobaciones antes de entregar:

~~~bash
npm run lint
npm run build
~~~

## Rutas principales

| Ruta | Pantalla |
|---|---|
| / | Resumen personal |
| /gremios | Exploración y creación de gremios |
| /gremios/:gremioId | Detalle, miembros y administración |
| /formulas | Catálogo y filtros de fórmulas |
| /formulas/nueva | Formulario de propuesta |
| /formulas/:formulaId | Expediente, votación y destilación |
| /grimorio | Archivo de pociones destiladas |
| /ranking | Clasificación de alquimistas |
| /perfil | Perfil del usuario activo |

## Estructura resumida

~~~text
src/
├── components/
│   ├── auth/
│   ├── common/
│   ├── formula/
│   ├── gremio/
│   └── layout/
├── data/seedData.js
├── hooks/useLocalStorage.js
├── pages/
├── utils/
├── App.jsx
├── index.css
└── main.jsx
~~~

App.jsx conserva el estado compartido y entrega datos o funciones mediante props. Las páginas coordinan cada vista y los componentes representan piezas reutilizables. Las reglas de negocio que son JavaScript puro viven en utils/.

## Repartición del trabajo en pareja

La división busca equilibrar **cantidad y dificultad**, no impedir la colaboración. Cada integrante desarrolla su bloque, revisa al menos dos archivos del otro y ambos validan juntos App.jsx, los datos semilla y la entrega final.

### Integrante 1 — Experiencia, autenticación y gremios

Responsable principal de 16 archivos:

1. src/components/auth/Acceso.jsx
2. src/components/layout/LayoutPrincipal.jsx
3. src/components/layout/BarraLateral.jsx
4. src/components/layout/BarraSuperior.jsx
5. src/components/layout/NavegacionMovil.jsx
6. src/components/gremio/TarjetaGremio.jsx
7. src/components/gremio/ListaMiembros.jsx
8. src/components/common/FondoAlquimico.jsx
9. src/components/common/Modal.jsx
10. src/components/common/EncabezadoPagina.jsx
11. src/components/common/TarjetaEstadistica.jsx
12. src/pages/ResumenPage.jsx
13. src/pages/GremiosPage.jsx
14. src/pages/GremioDetallePage.jsx
15. src/pages/PerfilPage.jsx
16. src/utils/formatters.js

### Integrante 2 — Fórmulas, votación y resultados

Responsable principal de 16 archivos:

1. src/components/formula/TarjetaFormula.jsx
2. src/components/formula/CategoriaVotacion.jsx
3. src/components/formula/PasosEstadoFormula.jsx
4. src/components/common/InsigniaEstado.jsx
5. src/components/common/EstadoVacio.jsx
6. src/components/common/Aviso.jsx
7. src/pages/FormulasPage.jsx
8. src/pages/NuevaFormulaPage.jsx
9. src/pages/FormulaDetallePage.jsx
10. src/pages/GrimorioPage.jsx
11. src/pages/RankingPage.jsx
12. src/pages/NoEncontradaPage.jsx
13. src/hooks/useLocalStorage.js
14. src/utils/voting.js
15. src/utils/formula.js
16. src/utils/roles.js

### Archivos compartidos

- src/App.jsx: integración del estado, acciones y rutas.
- src/data/seedData.js: construcción y verificación de datos de prueba.
- src/index.css, src/main.jsx e index.html: base visual y arranque.
- package.json, vite.config.js y README.md: configuración, dependencias y documentación.

Flujo recomendado de colaboración:

1. Cada integrante crea una rama para su bloque.
2. Hace commits pequeños con mensajes descriptivos.
3. Abre un Pull Request y solicita revisión del compañero.
4. Ambos ejecutan npm run lint y npm run build antes de integrar.

## Créditos y licencias

Los recursos externos fueron adaptados al diseño propio de Potion Lab:

- [React](https://react.dev/) — Meta y contribuidores, licencia MIT.
- [Vite](https://vite.dev/) — Evan You y contribuidores, licencia MIT.
- [React Router](https://reactrouter.com/) — contribuidores de React Router, licencia MIT.
- [Tailwind CSS](https://tailwindcss.com/) — Tailwind Labs, licencia MIT.
- [Styled Components](https://styled-components.com/) — Glen Maddern, Max Stoiber y contribuidores, licencia MIT.
- [React Icons](https://react-icons.github.io/react-icons/) — proyecto React Icons, licencia MIT.
- [Feather Icons](https://feathericons.com/) — Cole Bemis, licencia MIT; incluidos mediante React Icons.
- [Game Icons](https://game-icons.net/) — autores de Game-Icons.net, licencia CC BY 3.0; incluidos mediante React Icons y adaptados por color y composición.
- [Cinzel](https://fonts.google.com/specimen/Cinzel) — Natanael Gama, SIL Open Font License 1.1.
- [Manrope](https://fonts.google.com/specimen/Manrope) — Mikhail Sharanda, SIL Open Font License 1.1.

No se copiaron componentes visuales completos de plantillas externas. La composición, jerarquía, paleta y comportamiento se diseñaron específicamente para este proyecto.

## Alcance futuro

Para convertir la demostración en un producto real todavía se necesitarían backend, base de datos, contraseñas cifradas, sesiones seguras, autorización del lado del servidor, WebSocket o polling real y un registro de auditoría persistente.
