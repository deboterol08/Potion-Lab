# Potion Lab

Potion Lab es una aplicación web (SPA) desarrollada como proyecto académico para la gestión colaborativa de gremios alquímicos. Permite la creación de fórmulas, sistemas de votación ponderada por categorías y roles, mecanismos de veto, auditoría de eventos y destilación de resultados hacia un registro centralizado (Grimorio).

El proyecto funciona con datos iniciales (seed data) y persistencia en `localStorage`. No requiere un backend ni base de datos real, sirviendo como demostración funcional para el curso de Ingeniería Web.

---

## Tecnologías Utilizadas

- **Core:** React 19, React Router v7, Vite 8
- **Estilos:** CSS Vanilla (CSS plano organizado por hojas de componentes)
- **Tipografía:** Google Fonts (*Cinzel* y *Manrope*)
- **Iconografía:** React Icons (Feather Icons y Game Icons)
- **Calidad de Código:** OxLint
- **Persistencia:** LocalStorage bajo la clave `potionlab-v2-*`

---

## Funcionalidades Principales

- **Gestión de Usuarios y Sesión:** Registro, inicio de sesión, edición de perfil y manejo de estado global con `UsuarioContext`.
- **Gremios y Jerarquía de Roles:** Creación de gremios públicos y privados (vía código de 6 caracteres). Control de roles: Gran Maestre, Alquimista Sénior, Catador Oficial y Aprendiz.
- **Creación y Ciclo de Fórmulas:** Máquina de estados para fórmulas (`proposal` -> `voting` -> `closed` -> `distilled`). Restricción de propuesta para usuarios con participación >= 30%.
- **Votación Ponderada y Veto:** Un voto por categoría con multiplicador según especialidad (1.2x) y voto doble (2x) para el Catador Oficial. Veto único por fórmula reservado al Catador.
- **Desempate y Destilación:** Algoritmo de resolución de empates (Catador Oficial -> Gran Maestre -> Azar). Destilación automática al Grimorio con cálculo de dificultad real y rareza.
- **Auditoría y Consulta:** Registro cronológico de eventos (aperturas, vetos, cierres y resoluciones) y consulta del Grimorio y Ranking.

---

## Cuentas de Prueba

| Rol | Correo | Contraseña |
| --- | --- | --- |
| Gran Maestre | `simon@potionlab.edu` | `pocion123` |
| Catador Oficial | `kael@potionlab.edu` | `catador123` |

*Nota: Las credenciales y sesiones se almacenan exclusivamente en el navegador mediante `localStorage`.*

---

## Cómo Ejecutar el Proyecto

Se recomienda Node.js 22.12 o superior.

1. **Instalar dependencias:**
   ```bash
   npm install
