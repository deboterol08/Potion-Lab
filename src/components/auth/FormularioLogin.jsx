import { useState } from "react";
import { CREDENCIALES_DEMO, USUARIO_DEMO } from "../../data/datosDemo";

function FormularioLogin({ onLogin }) {
  // Estos inputs son "controlados": React guarda su valor y se lo devuelve
  // al input mediante value. Así el formulario y el estado siempre coinciden.
  const [formulario, setFormulario] = useState({
    email: CREDENCIALES_DEMO.email,
    password: CREDENCIALES_DEMO.password,
  });

  // Por ahora no hay ningun mensaje de error. Luego en el return, si error tiene contenido, muestra el parrafo. Esto se hace pq queremos mostrar el mensaje solamente cuando el login falla.

  const [error, setError] = useState("");

  function manejarCambio(evento) {
    const { name, value } = evento.target;

    setFormulario((datosAnteriores) => ({
      ...datosAnteriores,
      [name]: value,
    }));
  }

  function manejarEnvio(evento) {
    // Un formulario recarga la página por defecto. preventDefault permite que
    // React procese el envío sin perder el estado actual de la aplicación.
    evento.preventDefault();

    const emailCorrecto =
      formulario.email.trim().toLowerCase() === CREDENCIALES_DEMO.email;
    const passwordCorrecto = formulario.password === CREDENCIALES_DEMO.password;

    if (!emailCorrecto || !passwordCorrecto) {
      setError("El correo o la contraseña demo no coinciden.");
      return;
    }

    setError("");
    // El hijo no modifica App directamente: le comunica el usuario mediante
    // la función onLogin que recibió como prop.
    onLogin(USUARIO_DEMO);
  }

  return (
    <main className="login-page">
      <section className="login-intro">
        <div className="brand-mark brand-mark--large">PL</div>
        <p className="eyebrow">Laboratorio colaborativo</p>
        <h1 id="login-title">Potion Lab</h1>
        <p className="login-description">
          Donde los alquimistas convierten ideas dispersas en una poción
          definitiva.
        </p>

        <div className="feature-list">
          <span>01 · Accede a tu perfil</span>
          <span>02 · Consulta tu gremio</span>
          <span>03 · Vota la fórmula activa</span>
        </div>
      </section>

      <section className="login-panel">
        <div className="login-card">
          <div>
            <p className="eyebrow">Acceso de aprendiz</p>
            <h2>Iniciar sesión</h2>
            <p>Usa la cuenta de prueba para entrar a esta primera iteración.</p>
          </div>

          <form onSubmit={manejarEnvio} className="login-form">
            <label htmlFor="email">Correo universitario</label>
            <input
              id="email"
              name="email"
              type="email"
              value={formulario.email}
              onChange={manejarCambio}
              autoComplete="username"
              required
            />

            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              name="password"
              type="password"
              value={formulario.password}
              onChange={manejarCambio}
              autoComplete="current-password"
              required
            />

            {error && (
              <p className="form-error" role="alert">
                {error}
              </p>
            )}

            <button className="button button--primary" type="submit">
              Entrar al laboratorio
            </button>
          </form>

          <aside className="demo-credentials">
            <strong>Cuenta demo</strong>
            <span>{CREDENCIALES_DEMO.email}</span>
            <span>Contraseña: {CREDENCIALES_DEMO.password}</span>
            <small>No uses una contraseña real en esta simulación.</small>
          </aside>
        </div>
      </section>
    </main>
  );
}

export default FormularioLogin;
