import { useEffect, useState } from "react";

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

  // Cada vez que cambia el valor, se guarda una copia en el navegador.
  useEffect(() => {
    window.localStorage.setItem(clave, JSON.stringify(valor));
  }, [clave, valor]);

  return [valor, setValor];
}

export default useLocalStorage;
