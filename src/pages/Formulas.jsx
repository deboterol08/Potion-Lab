//Este se maneja desde localStorage, no desde la API
import React, { useState, useEffect } from "react";
import { obtenerFormulas, guardarFormulas } from "../data/seedData";

// para asociar la fórmula a un gremio 
const API_GREMIOS = "https://6a9230e17751d35ce47ee020.mockapi.io/api/v1/gremios";

export const Formulas = () => {
  const [formulas, setFormulas] = useState([]);
  const [gremios, setGremios] = useState([]);

  const [nombre, setNombre] = useState("");
  const [rareza, setRareza] = useState("Común");
  const [gremioId, setGremioId] = useState("");

  useEffect(() => {
    
    const cargarGremios = async () => {
      try {
        const res = await fetch(API_GREMIOS);
        const data = await res.json();
        setGremios(data);
        if (data.length > 0) {
          setGremioId(data[0].id);
        }
      } catch (error) {
        console.error("Error al cargar gremios desde la API:", error);
      }
    };

    cargarGremios();

    
    setFormulas(obtenerFormulas());
  }, []);

  // Manejador para registrar una nueva fórmula base
  const handleCrearFormula = (e) => {
    e.preventDefault();
    if (!nombre.trim()) return;

    const nuevaFormula = {
      id: Date.now(),
      nombre,
      rareza,
      gremioId: Number(gremioId)
    };

    const actualizadas = [...formulas, nuevaFormula];
    setFormulas(actualizadas);
    guardarFormulas(actualizadas);

    
    setNombre("");
    setRareza("Común");
  };

 
  const obtenerNombreGremio = (id) => {
    const gremio = gremios.find((g) => Number(g.id) === Number(id));
    return gremio ? gremio.nombre : "Gremio General";
  };

  return (
    <div className="container mt-4">
      <h2>Gestión de Fórmulas Base</h2>

      {
      /* Formulario de creación*/
      }
      <form onSubmit={handleCrearFormula} className="mb-4 card p-3 shadow-sm">
        <h5>Proponer Nueva Fórmula</h5>
        <div className="row">
          <div className="col-md-5 mb-2">
            <input
              type="text"
              className="form-control"
              placeholder="Nombre de la fórmula base"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>

          <div className="col-md-3 mb-2">
            <select
              className="form-select"
              value={rareza}
              onChange={(e) => setRareza(e.target.value)}
            >
              <option value="Común">Común</option>
              <option value="Rara">Rara</option>
              <option value="Épica">Épica</option>
              <option value="Legendaria">Legendaria</option>
            </select>
          </div>

          <div className="col-md-4 mb-2">
            <select
              className="form-select"
              value={gremioId}
              onChange={(e) => setGremioId(e.target.value)}
            >
              {gremios.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.nombre}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button type="submit" className="btn btn-warning mt-2">
          Publicar Fórmula
        </button>
      </form>

      {
    
      }
      <h4>Catálogo de Fórmulas Registradas</h4>
      <table className="table table-striped table-hover mt-3">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Nombre de la Fórmula</th>
            <th>Rareza</th>
            <th>Gremio Pertenece</th>
          </tr>
        </thead>
        <tbody>
          {formulas.map((f) => (
            <tr key={f.id}>
              <td>{f.id}</td>
              <td>{f.nombre}</td>
              <td>
                <span
                  className={`badge ${
                    f.rareza === "Legendaria"
                      ? "bg-danger"
                      : f.rareza === "Épica"
                      ? "bg-purple bg-primary"
                      : f.rareza === "Rara"
                      ? "bg-info text-dark"
                      : "bg-secondary"
                  }`}
                >
                  {f.rareza}
                </span>
              </td>
              <td>{obtenerNombreGremio(f.gremioId)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Formulas;