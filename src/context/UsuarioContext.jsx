import { createContext } from "react";

// Este contexto comparte el usuario que inició sesión con las barras de navegación.
// Así se cumple el uso de Context API sin crear una estructura complicada.
const UsuarioContext = createContext(null);

export default UsuarioContext;
