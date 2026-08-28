import { useCallback, useState } from "react";

// Mantiene una parte pequeña del estado entre recargas sin necesitar backend.
// El valor puede seguir actualizándose exactamente igual que con useState.
function useLocalStorage(clave, valorInicial) {
  const [valor, setValor] = useState(() => {
    try {
      const guardado = window.localStorage.getItem(clave);
      return guardado ? JSON.parse(guardado) : valorInicial;
    } catch {
      return valorInicial;
    }
  });

  const actualizarValor = useCallback((nuevoValor) => {
    setValor((valorAnterior) => {
      const siguienteValor =
        typeof nuevoValor === "function"
          ? nuevoValor(valorAnterior)
          : nuevoValor;

      window.localStorage.setItem(clave, JSON.stringify(siguienteValor));
      return siguienteValor;
    });
  }, [clave]);

  return [valor, actualizarValor];
}

export default useLocalStorage;
