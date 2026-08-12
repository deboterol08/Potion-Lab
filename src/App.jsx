import { useState } from 'react'
import FormularioLogin from './components/auth/FormularioLogin'
import TarjetaFormula from './components/formula/TarjetaFormula'
import ResumenGremio from './components/gremio/ResumenGremio'
import Encabezado from './components/layout/Encabezado'
import { FORMULA_DEMO, GREMIO_DEMO } from './data/datosDemo'
import './App.css'

function App() {
  // El usuario activo cambia durante la ejecución, por eso es estado y no una
  // variable normal. Cuando cambia, React vuelve a renderizar la interfaz.
  const [usuarioActivo, setUsuarioActivo] = useState(null)

  // Guardamos un voto por categoría en un objeto:
  // { ingrediente: 'mandragora', metodo: 'llama-azul', ... }
  // Esta estructura impide tener dos votos simultáneos en la misma categoría.
  const [votosUsuario, setVotosUsuario] = useState({})

  function manejarVoto(categoriaId, opcionId) {
    // La función recibe el estado anterior. El spread (...) conserva los votos
    // de las demás categorías y la propiedad dinámica actualiza solo una.
    setVotosUsuario((votosAnteriores) => ({
      ...votosAnteriores,
      [categoriaId]: opcionId,
    }))
  }

  function cerrarSesion() {
    setUsuarioActivo(null)
  }

  // No guardamos esta cantidad en otro useState porque se puede calcular a
  // partir de votosUsuario. Evitar estado duplicado previene inconsistencias.
  const votosCompletados = Object.values(votosUsuario).filter(Boolean).length

  // Renderizado condicional: si no hay sesión, React muestra únicamente el login.
  if (!usuarioActivo) {
    return <FormularioLogin onLogin={setUsuarioActivo} />
  }

  return (
    <div className="app-shell" id="inicio">
      <Encabezado
        usuario={usuarioActivo}
        votosCompletados={votosCompletados}
        totalCategorias={FORMULA_DEMO.categorias.length}
        onLogout={cerrarSesion}
      />

      <main className="dashboard container">
        <section className="bienvenida" aria-labelledby="titulo-bienvenida">
          <div>
            <p className="eyebrow">Laboratorio colaborativo</p>
            <h1 id="titulo-bienvenida">
              Bienvenido al taller, {usuarioActivo.nombreCompleto.split(' ')[0]}
            </h1>
            <p>
              Revisa tu gremio y ayuda a decidir la primera fórmula del grimorio.
            </p>
          </div>

          <div className="estado-sesion" aria-label="Estado de la sesión">
            <span className="pulso" aria-hidden="true" />
            Sesión demo activa
          </div>
        </section>

        <div className="dashboard-grid">
          <ResumenGremio gremio={GREMIO_DEMO} />

          <TarjetaFormula
            formula={FORMULA_DEMO}
            votosUsuario={votosUsuario}
            onVote={manejarVoto}
          />
        </div>
      </main>

      <footer className="footer container">
        Potion Lab · Iteración 1 · React + Vite
      </footer>
    </div>
  )
}

export default App
