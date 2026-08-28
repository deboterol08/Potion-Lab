import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Acceso from "./components/auth/Acceso";
import Aviso from "./components/common/Aviso";
import LayoutPrincipal from "./components/layout/LayoutPrincipal";
import {
  AUDITORIA_INICIAL,
  CUENTAS_DEMO,
  FORMULAS_INICIALES,
  GREMIOS_INICIALES,
  GRIMORIO_INICIAL,
  USUARIOS_DEMO,
} from "./data/seedData";
import useLocalStorage from "./hooks/useLocalStorage";
import FormulaDetallePage from "./pages/FormulaDetallePage";
import FormulasPage from "./pages/FormulasPage";
import GremioDetallePage from "./pages/GremioDetallePage";
import GremiosPage from "./pages/GremiosPage";
import GrimorioPage from "./pages/GrimorioPage";
import NoEncontradaPage from "./pages/NoEncontradaPage";
import NuevaFormulaPage from "./pages/NuevaFormulaPage";
import PerfilPage from "./pages/PerfilPage";
import RankingPage from "./pages/RankingPage";
import ResumenPage from "./pages/ResumenPage";
import { crearPocionDesdeFormula, TRANSICIONES_VALIDAS } from "./utils/formula";
import {
  esCatadorOficial,
  obtenerRol,
  puedeCrearFormula,
} from "./utils/roles";

function App() {
  const [usuarios, setUsuarios] = useLocalStorage("potionlab-v2-usuarios", USUARIOS_DEMO);
  const [cuentas, setCuentas] = useLocalStorage("potionlab-v2-cuentas", CUENTAS_DEMO);
  const [usuarioActivo, setUsuarioActivo] = useLocalStorage("potionlab-v2-sesion", null);
  const [gremios, setGremios] = useLocalStorage("potionlab-v2-gremios", GREMIOS_INICIALES);
  const [formulas, setFormulas] = useLocalStorage("potionlab-v2-formulas", FORMULAS_INICIALES);
  const [votos, setVotos] = useLocalStorage("potionlab-v2-votos", {});
  const [grimorio, setGrimorio] = useLocalStorage("potionlab-v2-grimorio", GRIMORIO_INICIAL);
  const [auditoria, setAuditoria] = useLocalStorage("potionlab-v2-auditoria", AUDITORIA_INICIAL);
  const [aviso, setAviso] = useState("");

  function mostrarAviso(mensaje) {
    setAviso(mensaje);
    window.setTimeout(() => setAviso(""), 3600);
  }

  // Si una fecha ya pasó, la simulación aplica el cierre automático solicitado.
  useEffect(() => {
    const vencidas = formulas.filter(
      (formula) =>
        formula.estado === "voting" &&
        new Date(formula.fechaCierre).getTime() <= Date.now(),
    );

    if (vencidas.length === 0) return;

    const idsVencidas = new Set(vencidas.map((formula) => formula.id));
    setFormulas((anteriores) =>
      anteriores.map((formula) =>
        idsVencidas.has(formula.id) ? { ...formula, estado: "closed" } : formula,
      ),
    );
    setAuditoria((anterior) => {
      const nuevos = vencidas
        .filter(
          (formula) =>
            !anterior.some(
              (evento) =>
                evento.formulaId === formula.id &&
                evento.titulo === "Cierre automático",
            ),
        )
        .map((formula) => ({
          id: `a-${formula.id}-${Date.now()}`,
          formulaId: formula.id,
          fecha: new Date().toISOString(),
          titulo: "Cierre automático",
          detalle: "La fecha límite fue alcanzada y el sistema cerró la votación.",
        }));
      return [...nuevos, ...anterior];
    });
  }, [formulas, setAuditoria, setFormulas]);

  function iniciarSesion(email, password) {
    const cuenta = cuentas.find(
      (item) =>
        item.email.toLowerCase() === email.trim().toLowerCase() &&
        item.password === password,
    );

    if (!cuenta) {
      return { ok: false, mensaje: "El correo o la contraseña no coinciden." };
    }

    const usuario = usuarios.find((item) => item.id === cuenta.usuarioId);
    if (!usuario) {
      return { ok: false, mensaje: "No encontramos el perfil asociado." };
    }

    setUsuarioActivo(usuario);
    return { ok: true };
  }

  function registrarUsuario(datos) {
    const id = `u-${Date.now()}`;
    const nuevoUsuario = {
      id,
      nombreCompleto: datos.nombreCompleto.trim(),
      email: datos.email.trim().toLowerCase(),
      especialidad: datos.especialidad,
      avatarUrl: datos.avatarUrl.trim(),
      puntos: 0,
      rarezaTotal: 0,
      precisionCatador: 0,
      participacion: 100,
    };

    setUsuarios((anteriores) => [...anteriores, nuevoUsuario]);
    setCuentas((anteriores) => [
      ...anteriores,
      {
        email: nuevoUsuario.email,
        password: datos.password,
        usuarioId: id,
        etiqueta: "Perfil nuevo",
      },
    ]);
    setUsuarioActivo(nuevoUsuario);
  }

  function cerrarSesion() {
    setUsuarioActivo(null);
  }

  function crearGremio(datos) {
    if (
      gremios.some(
        (gremio) => gremio.nombre.toLowerCase() === datos.nombre.trim().toLowerCase(),
      )
    ) {
      return { ok: false, mensaje: "Ya existe un gremio con ese nombre." };
    }

    const acentos = ["#9b87f5", "#55d9e8", "#f4c96b", "#6ee7b7"];
    const id = `g-${Date.now()}`;
    const codigo = Math.random().toString(36).slice(2, 8).toUpperCase();
    const nuevoGremio = {
      id,
      nombre: datos.nombre.trim(),
      lema: datos.lema.trim(),
      descripcion: datos.descripcion.trim(),
      tipo: datos.tipo,
      emblemaUrl: datos.emblemaUrl.trim(),
      codigoInvitacion: codigo,
      acento: acentos[gremios.length % acentos.length],
      miembros: [
        {
          usuarioId: usuarioActivo.id,
          rol: "Gran Maestre",
          fechaIngreso: new Date().toISOString(),
        },
      ],
    };

    setGremios((anteriores) => [...anteriores, nuevoGremio]);
    mostrarAviso(
      datos.tipo === "privado"
        ? `Gremio creado. Código de invitación: ${codigo}`
        : "El nuevo gremio fue creado correctamente.",
    );
    return { ok: true, gremioId: id };
  }

  function unirseAGremio(gremioId, codigo) {
    const gremio = gremios.find((item) => item.id === gremioId);
    if (!gremio) return { ok: false, mensaje: "El gremio no existe." };

    if (gremio.miembros.some((miembro) => miembro.usuarioId === usuarioActivo.id)) {
      return { ok: false, mensaje: "Ya perteneces a este gremio." };
    }

    if (
      gremio.tipo === "privado" &&
      gremio.codigoInvitacion !== codigo.trim().toUpperCase()
    ) {
      return { ok: false, mensaje: "El código de invitación no es válido." };
    }

    setGremios((anteriores) =>
      anteriores.map((item) =>
        item.id === gremioId
          ? {
              ...item,
              miembros: [
                ...item.miembros,
                {
                  usuarioId: usuarioActivo.id,
                  rol: "Aprendiz",
                  fechaIngreso: new Date().toISOString(),
                },
              ],
            }
          : item,
      ),
    );
    mostrarAviso(`Ahora perteneces a ${gremio.nombre}.`);
    return { ok: true };
  }

  function cambiarRol(gremioId, usuarioId, nuevoRol) {
    const gremio = gremios.find((item) => item.id === gremioId);
    const cantidadSenior = gremio.miembros.filter(
      (miembro) => miembro.rol === "Alquimista sénior" && miembro.usuarioId !== usuarioId,
    ).length;

    if (nuevoRol === "Alquimista sénior" && cantidadSenior >= 3) {
      mostrarAviso("El gremio ya alcanzó el máximo de tres Alquimistas sénior.");
      return;
    }

    setGremios((anteriores) =>
      anteriores.map((item) =>
        item.id === gremioId
          ? {
              ...item,
              miembros: item.miembros.map((miembro) =>
                miembro.usuarioId === usuarioId
                  ? { ...miembro, rol: nuevoRol }
                  : miembro,
              ),
            }
          : item,
      ),
    );
    mostrarAviso(`Rol actualizado a ${nuevoRol}.`);
  }

  function nombrarCatador(gremioId, usuarioId) {
    setGremios((anteriores) =>
      anteriores.map((gremio) =>
        gremio.id === gremioId
          ? {
              ...gremio,
              miembros: gremio.miembros.map((miembro) => {
                if (miembro.usuarioId === usuarioId) {
                  return { ...miembro, rol: "Catador oficial" };
                }
                if (miembro.rol === "Catador oficial") {
                  return { ...miembro, rol: "Aprendiz" };
                }
                return miembro;
              }),
            }
          : gremio,
      ),
    );
    mostrarAviso("El nuevo Catador Oficial fue nombrado.");
  }

  function crearFormula(datos) {
    const gremio = gremios.find((item) => item.id === datos.gremioId);
    if (!gremio || !puedeCrearFormula(gremio, usuarioActivo)) {
      return {
        ok: false,
        mensaje: "Tu rol o nivel de participación no permite crear esta fórmula.",
      };
    }

    const id = `f-${Date.now()}`;
    const nuevaFormula = {
      id,
      gremioId: datos.gremioId,
      nombrePocion: datos.nombrePocion.trim(),
      efectoDeseado: datos.efectoDeseado.trim(),
      dificultad: datos.dificultad,
      estado: "proposal",
      creadaPorId: usuarioActivo.id,
      fechaCreacion: new Date().toISOString(),
      fechaCierre: datos.fechaCierre,
      categorias: datos.categorias,
      desempate: {},
      veto: null,
    };

    setFormulas((anteriores) => [nuevaFormula, ...anteriores]);
    setAuditoria((anterior) => [
      {
        id: `a-${Date.now()}`,
        formulaId: id,
        fecha: new Date().toISOString(),
        titulo: "Propuesta creada",
        detalle: `${usuarioActivo.nombreCompleto} registró la fórmula base.`,
      },
      ...anterior,
    ]);
    mostrarAviso("La fórmula fue guardada como propuesta.");
    return { ok: true, formulaId: id };
  }

  function votar(formulaId, categoriaId, opcionId) {
    const formula = formulas.find((item) => item.id === formulaId);
    const gremio = gremios.find((item) => item.id === formula?.gremioId);
    const esMiembro = gremio?.miembros.some(
      (miembro) => miembro.usuarioId === usuarioActivo.id,
    );

    if (formula?.estado !== "voting" || !esMiembro) return;

    setVotos((anteriores) => ({
      ...anteriores,
      [formulaId]: {
        ...(anteriores[formulaId] ?? {}),
        [categoriaId]: opcionId,
      },
    }));
    mostrarAviso("Tu elección fue registrada. Puedes cambiarla mientras siga abierta.");
  }

  function vetarOpcion(formulaId, categoriaId, opcionId) {
    const formula = formulas.find((item) => item.id === formulaId);
    const gremio = gremios.find((item) => item.id === formula?.gremioId);

    if (
      !formula ||
      formula.estado !== "voting" ||
      formula.veto ||
      !esCatadorOficial(gremio, usuarioActivo.id)
    ) {
      return;
    }

    setFormulas((anteriores) =>
      anteriores.map((item) =>
        item.id === formulaId
          ? {
              ...item,
              veto: {
                categoriaId,
                opcionId,
                usuarioId: usuarioActivo.id,
                fecha: new Date().toISOString(),
              },
            }
          : item,
      ),
    );
    setAuditoria((anterior) => [
      {
        id: `a-${Date.now()}`,
        formulaId,
        fecha: new Date().toISOString(),
        titulo: "Veto aplicado",
        detalle: `${usuarioActivo.nombreCompleto} utilizó el veto único de Catador Oficial.`,
      },
      ...anterior,
    ]);
    mostrarAviso("Veto aplicado. Esta acción solo puede usarse una vez por fórmula.");
  }

  function cambiarEstado(formulaId, nuevoEstado) {
    const formula = formulas.find((item) => item.id === formulaId);
    const gremio = gremios.find((item) => item.id === formula?.gremioId);
    const rol = obtenerRol(gremio, usuarioActivo.id);

    if (
      !formula ||
      TRANSICIONES_VALIDAS[formula.estado] !== nuevoEstado ||
      !["Gran Maestre", "Alquimista sénior"].includes(rol)
    ) {
      return;
    }

    setFormulas((anteriores) =>
      anteriores.map((item) =>
        item.id === formulaId ? { ...item, estado: nuevoEstado } : item,
      ),
    );
    const titulo = nuevoEstado === "voting" ? "Votación abierta" : "Votación cerrada";
    setAuditoria((anterior) => [
      {
        id: `a-${Date.now()}`,
        formulaId,
        fecha: new Date().toISOString(),
        titulo,
        detalle: `${usuarioActivo.nombreCompleto} cambió el estado de la fórmula.`,
      },
      ...anterior,
    ]);
    mostrarAviso(titulo);
  }

  function destilarFormula(formulaId) {
    const formula = formulas.find((item) => item.id === formulaId);
    const gremio = gremios.find((item) => item.id === formula?.gremioId);
    const rol = obtenerRol(gremio, usuarioActivo.id);

    if (
      !formula ||
      formula.estado !== "closed" ||
      !["Gran Maestre", "Alquimista sénior"].includes(rol)
    ) {
      return;
    }

    const nuevaPocion = crearPocionDesdeFormula(
      formula,
      votos[formulaId] ?? {},
      usuarioActivo,
      esCatadorOficial(gremio, usuarioActivo.id),
    );

    setGrimorio((anterior) => [nuevaPocion, ...anterior]);
    setFormulas((anteriores) =>
      anteriores.map((item) =>
        item.id === formulaId
          ? { ...item, estado: "distilled", resultadoId: nuevaPocion.id }
          : item,
      ),
    );
    setAuditoria((anterior) => [
      {
        id: `a-${Date.now()}`,
        formulaId,
        fecha: new Date().toISOString(),
        titulo: "Poción destilada",
        detalle: `Resultado guardado: ${nuevaPocion.nombre}.`,
      },
      ...nuevaPocion.decisiones
        .filter((decision) => decision.metodo !== "mayoría simple")
        .map((decision, indice) => ({
          id: `a-${Date.now()}-${indice}`,
          formulaId,
          fecha: new Date().toISOString(),
          titulo: "Desempate resuelto",
          detalle: `${decision.opcion} ganó mediante ${decision.metodo}.`,
        })),
      ...anterior,
    ]);
    mostrarAviso("La poción fue destilada y añadida al grimorio.");
  }

  function guardarPerfil(datos) {
    const actualizado = { ...usuarioActivo, ...datos };
    setUsuarioActivo(actualizado);
    setUsuarios((anteriores) =>
      anteriores.map((usuario) =>
        usuario.id === actualizado.id ? actualizado : usuario,
      ),
    );
    mostrarAviso("Perfil actualizado.");
  }

  if (!usuarioActivo) {
    return <Acceso onLogin={iniciarSesion} onRegister={registrarUsuario} />;
  }

  return (
    <>
      <Routes>
        <Route element={<LayoutPrincipal onLogout={cerrarSesion} usuario={usuarioActivo} />}>
          <Route
            index
            element={
              <ResumenPage
                formulas={formulas}
                gremios={gremios}
                grimorio={grimorio}
                usuario={usuarioActivo}
                usuarios={usuarios}
                votos={votos}
              />
            }
          />
          <Route
            path="gremios"
            element={
              <GremiosPage
                gremios={gremios}
                onCreateGuild={crearGremio}
                onJoinGuild={unirseAGremio}
                usuario={usuarioActivo}
              />
            }
          />
          <Route
            path="gremios/:gremioId"
            element={
              <GremioDetallePage
                formulas={formulas}
                gremios={gremios}
                onAppointTaster={nombrarCatador}
                onChangeRole={cambiarRol}
                usuario={usuarioActivo}
                usuarios={usuarios}
                votos={votos}
              />
            }
          />
          <Route
            path="formulas"
            element={
              <FormulasPage
                formulas={formulas}
                gremios={gremios}
                usuarios={usuarios}
                votos={votos}
              />
            }
          />
          <Route
            path="formulas/nueva"
            element={
              <NuevaFormulaPage
                gremios={gremios}
                onCreateFormula={crearFormula}
                usuario={usuarioActivo}
              />
            }
          />
          <Route
            path="formulas/:formulaId"
            element={
              <FormulaDetallePage
                auditoria={auditoria}
                formulas={formulas}
                gremios={gremios}
                grimorio={grimorio}
                onDistill={destilarFormula}
                onTransition={cambiarEstado}
                onVeto={vetarOpcion}
                onVote={votar}
                usuario={usuarioActivo}
                usuarios={usuarios}
                votos={votos}
              />
            }
          />
          <Route path="grimorio" element={<GrimorioPage gremios={gremios} grimorio={grimorio} />} />
          <Route path="ranking" element={<RankingPage usuarioActivo={usuarioActivo} usuarios={usuarios} />} />
          <Route path="perfil" element={<PerfilPage onSaveProfile={guardarPerfil} usuario={usuarioActivo} />} />
          <Route path="*" element={<NoEncontradaPage />} />
        </Route>
      </Routes>
      <Aviso mensaje={aviso} onCerrar={() => setAviso("")} />
    </>
  );
}

export default App;
