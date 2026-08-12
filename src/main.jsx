import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// createRoot conecta React con el único div #root que existe en index.html.
createRoot(document.getElementById('root')).render(
  // StrictMode ayuda a descubrir prácticas inseguras durante el desarrollo.
  // No agrega ningún elemento visual a la página.
  <StrictMode>
    <App />
  </StrictMode>,
)
