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

const campoBase =
  "focus-ring w-full rounded-xl border border-white/10 bg-white/5 px-11 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-300/35 focus:bg-white/[0.07]";

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
    <main className="relative min-h-screen overflow-hidden px-4 py-6 sm:px-8 lg:grid lg:grid-cols-[1.08fr_0.92fr] lg:p-0">
      <FondoAlquimico />

      <section className="relative hidden min-h-screen flex-col justify-between overflow-hidden border-r border-white/8 p-12 lg:flex xl:p-16">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.022)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.022)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:linear-gradient(to_bottom,black,transparent_88%)]" />

        <div className="relative flex items-center gap-3">
          <span className="grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-violet-400/25 to-cyan-300/15 text-2xl text-cyan-200 ring-1 ring-white/12">
            <GiPotionBall aria-hidden="true" />
          </span>
          <div>
            <strong className="font-display block tracking-wide text-white">Potion Lab</strong>
            <span className="text-xs text-slate-500">Laboratorio colaborativo</span>
          </div>
        </div>

        <div className="relative max-w-2xl py-16">
          <p className="mb-6 flex items-center gap-2 text-xs font-extrabold tracking-[0.24em] text-cyan-300 uppercase">
            <GiSparkles aria-hidden="true" /> Nueva temporada de destilación
          </p>
          <h1 className="font-display text-5xl leading-[1.12] font-semibold tracking-tight text-white xl:text-6xl">
            De ideas dispersas a una
            <span className="block bg-gradient-to-r from-violet-300 via-cyan-200 to-amber-200 bg-clip-text text-transparent">
              poción definitiva.
            </span>
          </h1>
          <p className="mt-7 max-w-xl text-base leading-8 text-slate-400">
            Organiza tu gremio, propone fórmulas y decide cada ingrediente con un sistema de votación claro.
          </p>

          <ul className="mt-10 grid gap-4 text-sm text-slate-300 sm:grid-cols-2">
            {[
              "Votos por especialidad",
              "Tres gremios de prueba",
              "Grimorio permanente",
              "Ranking de alquimistas",
            ].map((beneficio) => (
              <li className="flex items-center gap-3" key={beneficio}>
                <span className="grid size-7 place-items-center rounded-full bg-emerald-300/10 text-xs text-emerald-300 ring-1 ring-emerald-300/20">
                  <FiCheck aria-hidden="true" />
                </span>
                {beneficio}
              </li>
            ))}
          </ul>
        </div>

        <p className="relative text-xs text-slate-600">
          Proyecto académico · Ingeniería Web · 2026
        </p>
      </section>

      <section className="flex min-h-[calc(100vh-3rem)] items-center justify-center py-6 lg:min-h-screen lg:px-10">
        <div className="w-full max-w-md">
          <div className="mb-9 flex items-center justify-center gap-3 lg:hidden">
            <span className="grid size-11 place-items-center rounded-2xl bg-violet-400/15 text-2xl text-cyan-200 ring-1 ring-white/10">
              <GiPotionBall aria-hidden="true" />
            </span>
            <strong className="font-display text-lg text-white">Potion Lab</strong>
          </div>

          <div className="glass-panel rounded-3xl p-6 sm:p-8">
            <div className="grid grid-cols-2 rounded-xl bg-black/20 p-1">
              {[
                ["login", "Iniciar sesión"],
                ["register", "Crear perfil"],
              ].map(([valor, etiqueta]) => (
                <button
                  className={`focus-ring rounded-lg px-4 py-2.5 text-xs font-bold transition ${
                    modo === valor
                      ? "bg-white/10 text-white shadow-sm"
                      : "text-slate-500 hover:text-slate-300"
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

            <div className="mt-8">
              <p className="text-xs font-extrabold tracking-[0.18em] text-violet-300 uppercase">
                {modo === "login" ? "Bienvenido de vuelta" : "Nuevo aprendiz"}
              </p>
              <h2 className="font-display mt-2 text-2xl font-semibold text-white">
                {modo === "login" ? "Abre las puertas del laboratorio" : "Crea tu identidad alquímica"}
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                {modo === "login"
                  ? "Usa una cuenta demo para explorar todos los roles."
                  : "Tu perfil se guardará únicamente en este navegador."}
              </p>
            </div>

            <form className="mt-7 space-y-4" onSubmit={manejarEnvio}>
              {modo === "register" && (
                <label className="block">
                  <span className="mb-2 block text-xs font-bold text-slate-300">Nombre completo</span>
                  <span className="relative block">
                    <FiUser className="absolute top-1/2 left-4 -translate-y-1/2 text-slate-600" aria-hidden="true" />
                    <input
                      className={campoBase}
                      name="nombreCompleto"
                      onChange={manejarCambio}
                      placeholder="Nombre del alquimista"
                      required
                      value={formulario.nombreCompleto}
                    />
                  </span>
                </label>
              )}

              <label className="block">
                <span className="mb-2 block text-xs font-bold text-slate-300">Correo universitario</span>
                <span className="relative block">
                  <FiMail className="absolute top-1/2 left-4 -translate-y-1/2 text-slate-600" aria-hidden="true" />
                  <input
                    autoComplete="username"
                    className={campoBase}
                    name="email"
                    onChange={manejarCambio}
                    placeholder="nombre@universidad.edu"
                    required
                    type="email"
                    value={formulario.email}
                  />
                </span>
              </label>

              <label className="block">
                <span className="mb-2 block text-xs font-bold text-slate-300">Contraseña</span>
                <span className="relative block">
                  <FiLock className="absolute top-1/2 left-4 -translate-y-1/2 text-slate-600" aria-hidden="true" />
                  <input
                    autoComplete={modo === "login" ? "current-password" : "new-password"}
                    className={`${campoBase} pr-11`}
                    name="password"
                    onChange={manejarCambio}
                    required
                    type={mostrarPassword ? "text" : "password"}
                    value={formulario.password}
                  />
                  <button
                    aria-label={mostrarPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                    className="focus-ring absolute top-1/2 right-3 grid size-8 -translate-y-1/2 place-items-center rounded-lg text-slate-600 hover:text-slate-300"
                    onClick={() => setMostrarPassword((visible) => !visible)}
                    type="button"
                  >
                    {mostrarPassword ? <FiEyeOff aria-hidden="true" /> : <FiEye aria-hidden="true" />}
                  </button>
                </span>
              </label>

              {modo === "register" && (
                <>
                  <label className="block">
                    <span className="mb-2 block text-xs font-bold text-slate-300">Especialidad</span>
                    <select
                      className="focus-ring w-full rounded-xl border border-white/10 bg-[#15182e] px-4 py-3 text-sm text-white outline-none"
                      name="especialidad"
                      onChange={manejarCambio}
                      value={formulario.especialidad}
                    >
                      {ESPECIALIDADES.map((especialidad) => (
                        <option key={especialidad}>{especialidad}</option>
                      ))}
                    </select>
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-xs font-bold text-slate-300">Avatar URL (opcional)</span>
                    <input
                      className="focus-ring w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600"
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
                <p className="rounded-xl border border-rose-300/15 bg-rose-300/8 px-4 py-3 text-xs leading-5 text-rose-200" role="alert">
                  {error}
                </p>
              )}

              <button
                className="focus-ring group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-500 to-violet-400 px-5 py-3.5 text-sm font-extrabold text-white shadow-lg shadow-violet-950/30 transition hover:-translate-y-0.5 hover:brightness-110"
                type="submit"
              >
                {modo === "login" ? "Entrar al laboratorio" : "Crear perfil"}
                <FiArrowRight className="transition group-hover:translate-x-1" aria-hidden="true" />
              </button>
            </form>

            {modo === "login" && (
              <div className="mt-7 border-t border-white/8 pt-6">
                <p className="mb-3 text-center text-[10px] font-extrabold tracking-[0.18em] text-slate-600 uppercase">
                  Accesos rápidos de demostración
                </p>
                <div className="grid gap-2 sm:grid-cols-2">
                  {CUENTAS_DEMO.map((cuenta) => (
                    <button
                      className="focus-ring rounded-xl border border-white/8 bg-white/[0.03] px-3 py-3 text-left transition hover:border-violet-300/25 hover:bg-violet-300/7"
                      key={cuenta.email}
                      onClick={() => usarCuenta(cuenta)}
                      type="button"
                    >
                      <strong className="block text-xs text-slate-200">{cuenta.etiqueta}</strong>
                      <span className="mt-1 block truncate text-[10px] text-slate-600">{cuenta.email}</span>
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
