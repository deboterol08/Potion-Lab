import { FiAward, FiBookOpen, FiGrid, FiLayers, FiUsers } from "react-icons/fi";

const enlacesNavegacion = [
  { to: "/", etiqueta: "Resumen", icono: FiGrid, exacto: true },
  { to: "/gremios", etiqueta: "Gremios", icono: FiUsers },
  { to: "/formulas", etiqueta: "Fórmulas", icono: FiLayers },
  { to: "/grimorio", etiqueta: "Grimorio", icono: FiBookOpen },
  { to: "/ranking", etiqueta: "Ranking", icono: FiAward },
];

export default enlacesNavegacion;
