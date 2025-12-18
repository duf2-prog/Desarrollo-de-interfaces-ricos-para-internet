import React, { useState } from "react";
import { items } from "../contexts/Model";
import type { Item } from "../contexts/Model";

const HomePage = (): React.JSX.Element => {
  const [itemSelected, setItemSelected] = useState<Item | null>(null);
  const [search, setSearch] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [categoria, setCategoria] = useState("Todas");

  const handleSearch = () => {
    const term = search.trim().toLowerCase();

    if (term == "") {
      setItemSelected(null);
      setErrorMessage("Escribe el nombre exacto del producto");
      return;
    }

    const found = items.find(
      (item) => item.nombre.toLowerCase() == term
    );

    if (found) {
      setItemSelected(found);
      setErrorMessage(null);
    } else {
      setItemSelected(null);
      setErrorMessage("No se encontró ningún producto con ese nombre exacto");
    }
  };

  // Filtrado por categoría
  const filteredItems = categoria == "Todas" ? items : items.filter((item) => item.categoria == categoria);

  return (
    <>
      <h1>Inicio</h1>

      {/* Buscador por nombre, solo si el nombre es exacto */}
      <input
        type="text"
        placeholder="Escribe el nombre exacto..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ padding: "8px", marginBottom: "10px", width: "100%" }}
      />

      <button
        onClick={handleSearch}
        style={{ padding: "8px 15px", marginBottom: "20px" }}
      >
        Buscar
      </button>

      {/* Filtro por categoría */}
      <select
        value={categoria}
        onChange={(e) => setCategoria(e.target.value)}
        style={{ padding: "8px", marginBottom: "20px", width: "100%" }}
      >
        <option value="Todas">Todas las categorías</option>
        <option value="Cocina">Cocina</option>
        <option value="Deportes">Deportes</option>
        <option value="Oficina">Oficina</option>
        <option value="Fotografía">Fotografía</option>
        <option value="Hogar">Hogar</option>
        <option value="Jardín">Jardín</option>
      </select>

      {/* Tabla filtrada por categoría */}
      {filteredItems.map((p) => (
        <div key={p.id} onClick={() => setItemSelected(p)}>
          <p>
            <strong>{p.nombre}</strong> — Precio: {p.precio} €  
            <br />
            <small>Categoría: {p.categoria}</small>
          </p>
          <hr />
        </div>
      ))}

      {/* Modal de producto */}
      {itemSelected && (
        <div className="modal">
          <div className="modal-content">
            <h2>{itemSelected.nombre}</h2>
            <p>{itemSelected.descripcion}</p>
            <p><strong>Precio:</strong> {itemSelected.precio} €</p>
            <p><strong>Categoría:</strong> {itemSelected.categoria}</p>

            <button onClick={() => setItemSelected(null)}>Cerrar</button>
          </div>
        </div>
      )}

      {/* Modal de error */}
      {errorMessage && (
        <div className="modal">
          <div className="modal-content">
            <h2>Error</h2>
            <p>{errorMessage}</p>
            <button onClick={() => setErrorMessage(null)}>Cerrar</button>
          </div>
        </div>
      )}
    </>
  );
};

export default HomePage;
