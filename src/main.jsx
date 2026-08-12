import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

/* 
C1:
Recuerda: Renderizar es mostrar algo en pantalla.
StrictMode ayuda a descubrir practicas inseguras durante dev.
createRoot conecta React y el React/Virtual Dom con el unico div #root que existe en index.html.
<App /> Llama al componente: function App() 
Regla imprescindible: Todo componente debe comenzar con CAPS pq sino React lo confunde con una etiqueta HTML custom.
 JSX: JS con esteroides y HTML incluido (re similar a HTML), el browser no entiende JSX directamente. Vite (server) lo transforma en JavaScript. Todo HTML con llaves adentro es JS
 JSX se parece mucho a HTML, pero tiene algunas diferencias: 1. className en lugar de class
2. Toda etiqueta debe cerrarse 3. El return solo puede devolver una etiqueta (por ej nuestra App returnea el div llamado app-shell)
App funciona como el componente padre que organiza los componentes grandes de la app
Podríamos haber escrito todo dentro de App.jsx, pero sería difícil de leer
 ej) dividimos las responsabilidades de la siguiente manera: 
 | Componente          | Responsabilidad                                        |
| ------------------- | ------------------------------------------------------ |
| `App`               | Coordina la aplicación y conserva el estado compartido |
| `FormularioLogin`   | Controla el inicio de sesión                           |
| `Encabezado`        | Muestra usuario, progreso y cierre de sesión           |
| `ResumenGremio`     | Muestra el gremio y sus integrantes                    |
| `TarjetaFormula`    | Organiza la fórmula completa                           |
| `CategoriaVotacion` | Representa una categoría de votación                   |

La regla mental es:

Un componente debería tener una responsabilidad visual o funcional clara.

El export lo unico que hace es permitir importar el componente desde otro archivo

Componente en React = Metodo en Java
Prop en React = Parametros del Metodo en Java

Con la unica diferencia de que siempre debe devolver el JSX y que las props son solo de lectura (un hijo no puede modificar sus props solo el padre las modifica y define su estado)

Ej) En esta App
El hijo no cierra la sesión por su cuenta. Le avisa al padre:
El usuario presionó el botón. Ejecuta la función que me entregaste.
Esta es una de las ideas más importantes de React:

Los datos normalmente bajan del padre al hijo mediante props.
Las acciones pueden subir mediante funciones pasadas como props.

Una prop es la info que un componente padre le entrega a un componente hijo.
Un componente hijo no debería modificar sus props directamente.


C2:

1. ¿Qué es el estado?

El estado es información que:

Puede cambiar mientras usamos la aplicación.
React debe recordar entre renderizados.
Al cambiar, puede modificar lo que aparece en pantalla.

import { useState } from 'react' el hook (funciones especiales que agregan capacidades de React a un componente) que nos permite usar esta feature

¿Por qué no una variable normal?
Problema 1: React no sabe que debe actualizar la pantalla
Problema 2: la variable se reinicia y su info se puede perder

La regla mental para saber donde poner cada estado:
El estado debe vivir en el componente más cercano que realmente lo necesite.

Aplicaciones

input controlado:Su valor visible está controlado por el estado de React.
estructura: 
value={estado}
onChange={funcionQueActualizaElEstado}

actualizar objetos: Para actualizar un objeto conservamos sus propiedades con spread.

eventos: En los eventos normalmente pasamos la función para ejecutarla, no la llamamos con () lo cual ejecuta la función inmediatamente durante el renderizado. Usamos preventDefault() desde la linea 1 para evitar el comportamiento usual en HTML de los tags que no sabemos manejar

*/
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
