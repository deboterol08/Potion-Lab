import { useState } from "react";
import { FiAward, FiImage, FiMail, FiSave, FiTrendingUp, FiUser } from "react-icons/fi";
import { ESPECIALIDADES } from "../data/seedData";
import { obtenerIniciales } from "../utils/formatters";

function PerfilPage({ usuario, onSaveProfile }) {
  const [formulario, setFormulario] = useState(usuario);
  const [guardado, setGuardado] = useState(false);

  function manejarCambio(evento) {
    const { name, value } = evento.target;
    setFormulario((anterior) => ({ ...anterior, [name]: value }));
    setGuardado(false);
  }

  function manejarEnvio(evento) {
    evento.preventDefault();
    onSaveProfile(formulario);
    setGuardado(true);
  }

  return (
    <div className="perfil-lista-vertical-identidad-alquimica-mi-perfil">
      <header><p className="perfil-descripcion-identidad-alquimica">Identidad alquímica</p><h1 className="perfil-titulo-principal-mi-perfil">Mi perfil</h1><p className="perfil-descripcion-actualiza-los-datos-visibles">Actualiza los datos visibles para tus compañeros de gremio.</p></header>

      <div className="perfil-cuadricula-nombre-completo-especialidad-award">
        <aside className="perfil-panel-lateral-nombre-completo-especialidad-award">
          {formulario.avatarUrl ? <img alt={`Avatar de ${formulario.nombreCompleto}`} className="perfil-imagen" src={formulario.avatarUrl} /> : <span className="perfil-insignia-iniciales">{obtenerIniciales(formulario.nombreCompleto)}</span>}
          <h2 className="perfil-titulo-seccion-nombre-completo">{formulario.nombreCompleto}</h2><p className="perfil-descripcion-especialidad">{formulario.especialidad}</p>
          <div className="perfil-cuadricula-award-puntos-puntos-trending"><div><FiAward className="perfil-icono-award" aria-hidden="true" /><strong className="perfil-dato-destacado-puntos">{usuario.puntos}</strong><span className="perfil-texto-puntos">Puntos</span></div><div><FiTrendingUp className="perfil-icono-trending-up" aria-hidden="true" /><strong className="perfil-dato-destacado-participacion">{usuario.participacion}%</strong><span className="perfil-texto-participacion">Participación</span></div></div>
        </aside>

        <form className="perfil-formulario-informacion-personal-la-autenticacion" onSubmit={manejarEnvio}>
          <div className="perfil-contenedor-informacion-personal-la-autenticacion"><h2 className="perfil-titulo-seccion-informacion-personal">Información personal</h2><p className="perfil-descripcion-la-autenticacion-sigue-siendo">La autenticación sigue siendo una simulación local del frontend.</p></div>
          <div className="perfil-lista-vertical-user-nombre-completo-mail">
            <label className="perfil-etiqueta-campo-user-nombre-completo"><span className="perfil-texto-user-nombre-completo"><FiUser aria-hidden="true" /> Nombre completo</span><input className="perfil-campo-nombre-completo" name="nombreCompleto" onChange={manejarCambio} required value={formulario.nombreCompleto} /></label>
            <label className="perfil-etiqueta-campo-mail-correo-universitario"><span className="perfil-texto-mail-correo-universitario"><FiMail aria-hidden="true" /> Correo universitario</span><input className="perfil-campo-email" name="email" onChange={manejarCambio} required type="email" value={formulario.email} /></label>
            <label className="perfil-etiqueta-campo-especialidad-map"><span className="perfil-texto-especialidad">Especialidad</span><select className="perfil-selector-especialidad" name="especialidad" onChange={manejarCambio} value={formulario.especialidad}>{ESPECIALIDADES.map((especialidad) => <option key={especialidad}>{especialidad}</option>)}</select></label>
            <label className="perfil-etiqueta-campo-image-url-del-avatar"><span className="perfil-texto-image-url-del-avatar"><FiImage aria-hidden="true" /> URL del avatar <small className="perfil-detalle-opcional">(opcional)</small></span><input className="perfil-campo-avatar-url" name="avatarUrl" onChange={manejarCambio} placeholder="https://..." type="url" value={formulario.avatarUrl} /></label>
          </div>
          <div className="perfil-contenedor-flexible-cambios-guardados-correctamente-save"><span className={`perfil-mensaje-guardado ${guardado ? "perfil-mensaje-exitoso" : "perfil-mensaje-informativo"}`}>{guardado ? "Cambios guardados correctamente." : "Los cambios se guardan en este navegador."}</span><button className="perfil-boton-save-guardar-cambios" type="submit"><FiSave aria-hidden="true" /> Guardar cambios</button></div>
        </form>
      </div>
    </div>
  );
}

export default PerfilPage;
