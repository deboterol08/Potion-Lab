import { useState } from "react";
import {
  FiArrowRight,
  FiCheck,
  FiEye,
  FiEyeOff,
  FiLock,
  FiMail,
  FiUser,
} from "react-icons/fi";
import { GiPotionBall, GiSparkles } from "react-icons/gi";
import { CUENTAS_DEMO, ESPECIALIDADES } from "../../data/seedData";
import FondoAlquimico from "../common/FondoAlquimico";

const claseCampoAcceso = "acceso-campo-formulario";

function Acceso({ onLogin, onRegister }) {
  const [modo, setModo] = useState("login");
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [error, setError] = useState("");
  const [formulario, setFormulario] = useState({
    nombreCompleto: "",
    email: CUENTAS_DEMO[0].email,
    password: CUENTAS_DEMO[0].password,
    especialidad: ESPECIALIDADES[0],
    avatarUrl: "",
  });

  function manejarCambio(evento) {
    const { name, value } = evento.target;

    setFormulario((anterior) => ({ ...anterior, [name]: value }));
    setError("");
  }

  function manejarEnvio(evento) {
    evento.preventDefault();

    if (modo === "login") {
      const resultado = onLogin(formulario.email, formulario.password);
      if (!resultado.ok) setError(resultado.mensaje);
      return;
    }

    if (formulario.nombreCompleto.trim().length < 3) {
      setError("Escribe tu nombre completo para crear el perfil.");
      return;
    }

    if (formulario.password.length < 6) {
      setError("La contraseña debe tener mínimo 6 caracteres.");
      return;
    }

    onRegister(formulario);
  }

  function usarCuenta(cuenta) {
    setModo("login");
    setFormulario((anterior) => ({
      ...anterior,
      email: cuenta.email,
      password: cuenta.password,
    }));
    setError("");
  }

  return (
    <main className="acceso-pantalla-potion-lab-libera-tu">
      <FondoAlquimico />

      <section className="acceso-seccion-potion-lab-libera-tu">
        <div className="acceso-contenedor-flexible-potion-lab-libera-tu">
          <span className="acceso-insignia">
            <GiPotionBall aria-hidden="true" />
          </span>
          <div>
            <strong className="acceso-dato-destacado-potion-lab">
              Potion Lab
            </strong>
            <span className="acceso-texto-libera-tu-mago-interior">
              Libera tu mago interior
            </span>
          </div>
        </div>

        <div className="acceso-contenedor-nueva-temporada-carnaval-del">
          <p className="acceso-descripcion-nueva-temporada-carnaval-del">
            <GiSparkles aria-hidden="true" /> Nueva temporada: Carnaval del Atlantis
          </p>
          <h1 className="acceso-titulo-principal-de-ideas-a-pociones">
            De ideas a 
            <span className="acceso-texto-pociones-definitivas">
              pociones definitivas
            </span>
          </h1>
          <p className="acceso-descripcion-organiza-tu-gremio-propone">
            Organiza tu gremio, propone fórmulas y decide cada ingrediente con
            un sistema de votación claro.
          </p>

          <ul className="acceso-cuadricula-map">
            {[
              "Votos por especialidad",
              "Tres gremios de prueba",
              "Grimorio permanente",
              "Ranking de alquimistas",
            ].map((beneficio) => (
              <li className="acceso-elemento-lista-check-beneficio" key={beneficio}>
                <span className="acceso-insignia-check">
                  <FiCheck aria-hidden="true" />
                </span>
                {beneficio}
              </li>
            ))}
          </ul>
        </div>

        <p className="acceso-descripcion-proyecto-academico-ingenieria">
          Proyecto académico · Ingeniería Web · 2026
        </p>
      </section>

      <section className="acceso-seccion-potion-lab-map-sea">
        <div className="acceso-contenedor-potion-lab-map-sea">
          <div className="acceso-contenedor-flexible-potion-lab">
            <span className="acceso-insignia-logo-movil">
              <GiPotionBall aria-hidden="true" />
            </span>
            <strong className="acceso-nombre-logo-movil">
              Potion Lab
            </strong>
          </div>

          <div className="acceso-contenedor-map-sea-bienvenido-mago">
            <div className="acceso-selector-modo">
              {[
                ["login", "Iniciar sesión"],
                ["register", "Crear perfil"],
              ].map(([valor, etiqueta]) => (
                <button
                className={`acceso-boton-modo ${
                    modo === valor
                      ? "acceso-boton-modo-activo"
                      : "acceso-boton-modo-inactivo"
                  }`}
                  key={valor}
                  onClick={() => {
                    setModo(valor);
                    setError("");
                  }}
                  type="button"
                >
                  {etiqueta}
                </button>
              ))}
            </div>

            <div className="acceso-contenedor-sea-bienvenido-mago-abre">
              <p className="acceso-descripcion-sea-bienvenido-mago">
                {modo === "login"
                  ? "Sea bienvenido mago"
                  : "Aprendiz de mago"}
              </p>
              <h2 className="acceso-titulo-seccion-abre-tu-portal-magico">
                {modo === "login"
                  ? "Abre tu portal mágico"
                  : "Crea tu identidad"}
              </h2>
              <p className="acceso-descripcion-usa-nuestras-cuentas-de">
                {modo === "login"
                  ? "Usa nuestras cuentas de prueba para explorar los roles."
                  : "Tu perfil se guardará únicamente en este navegador."}
              </p>
            </div>

            <form className="acceso-formulario-correo-mail-contrasena-lock" onSubmit={manejarEnvio}>
              {modo === "register" && (
                <label className="acceso-etiqueta-campo-nombre-de-usuario-user">
                  <span className="acceso-texto-nombre-de-usuario">
                    Nombre de usuario
                  </span>
                  <span className="acceso-texto-user">
                    <FiUser
                      className="acceso-icono-user"
                      aria-hidden="true"
                    />
                    <input
                      className={claseCampoAcceso}
                      name="nombreCompleto"
                      onChange={manejarCambio}
                      placeholder="Nombre del alquimista"
                      required
                      value={formulario.nombreCompleto}
                    />
                  </span>
                </label>
              )}

              <label className="acceso-etiqueta-campo-correo-mail">
                <span className="acceso-texto-correo">
                  Correo 
                </span>
                <span className="acceso-texto-mail">
                  <FiMail
                    className="acceso-icono-mail"
                    aria-hidden="true"
                  />
                  <input
                    autoComplete="username"
                    className={claseCampoAcceso}
                    name="email"
                    onChange={manejarCambio}
                    placeholder="nombre@universidad.edu"
                    required
                    type="email"
                    value={formulario.email}
                  />
                </span>
              </label>

              <label className="acceso-etiqueta-campo-contrasena-lock">
                <span className="acceso-texto-contrasena">
                  Contraseña
                </span>
                <span className="acceso-texto-lock">
                  <FiLock
                    className="acceso-icono-lock"
                    aria-hidden="true"
                  />
                  <input
                    autoComplete={
                      modo === "login" ? "current-password" : "new-password"
                    }
                    className={claseCampoAcceso}
                    name="password"
                    onChange={manejarCambio}
                    required
                    type={mostrarPassword ? "text" : "password"}
                    value={formulario.password}
                  />
                  <button
                    aria-label={
                      mostrarPassword
                        ? "Ocultar contraseña"
                        : "Mostrar contraseña"
                    }
                    className="acceso-boton-ocultar-contrasena"
                    onClick={() => setMostrarPassword((visible) => !visible)}
                    type="button"
                  >
                    {mostrarPassword ? (
                      <FiEyeOff aria-hidden="true" />
                    ) : (
                      <FiEye aria-hidden="true" />
                    )}
                  </button>
                </span>
              </label>

              {modo === "register" && (
                <>
                  <label className="acceso-etiqueta-campo-especialidad-map">
                    <span className="acceso-texto-especialidad">
                      Especialidad
                    </span>
                    <select
                      className="acceso-selector-especialidad"
                      name="especialidad"
                      onChange={manejarCambio}
                      value={formulario.especialidad}
                    >
                      {ESPECIALIDADES.map((especialidad) => (
                        <option key={especialidad}>{especialidad}</option>
                      ))}
                    </select>
                  </label>
                  <label className="acceso-etiqueta-campo-avatar-url-opcional">
                    <span className="acceso-texto-avatar-url-opcional">
                      Avatar URL (opcional)
                    </span>
                    <input
                      className="acceso-campo-avatar-url"
                      name="avatarUrl"
                      onChange={manejarCambio}
                      placeholder="https://..."
                      type="url"
                      value={formulario.avatarUrl}
                    />
                  </label>
                </>
              )}

              {error && (
                <p
                  className="acceso-descripcion-error"
                  role="alert"
                >
                  {error}
                </p>
              )}

              <button
                className="acceso-boton-entra-a-tu-laboratorio"
                type="submit"
              >
                {modo === "login"
                  ? "Entra a tu laboratorio"
                  : "Crear perfil"}
                <FiArrowRight aria-hidden="true" />
              </button>
            </form>

            {modo === "login" && (
              <div className="acceso-contenedor-cuentas-de-prueba-acceso">
                <p className="acceso-descripcion-cuentas-de-prueba-acceso">
                  Cuentas de Prueba: Acceso Rápido
                </p>
                <div className="acceso-cuadricula-cuentas-demo">
                  {CUENTAS_DEMO.map((cuenta) => (
                    <button
                      className="acceso-boton-etiqueta-email"
                      key={cuenta.email}
                      onClick={() => usarCuenta(cuenta)}
                      type="button"
                    >
                      <strong className="acceso-dato-destacado-etiqueta">
                        {cuenta.etiqueta}
                      </strong>
                      <span className="acceso-texto-email">
                        {cuenta.email}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

export default Acceso;  
