import React, { useState, useEffect } from "react";
import Reloj from "./Reloj";
import BotonGuardar from "./BotonGuardar";
import ListaInstantes from "./ListaInstantes";

const RelojApp: React.FC = () => {
  const [instantes, setInstantes] = useState<string[]>(() => {
    const saved = localStorage.getItem("instantes");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("instantes", JSON.stringify(instantes));
  }, [instantes]);

  const guardarInstante = (horaActual: string) => {
    setInstantes([...instantes, horaActual]);
  };

  const borrarInstante = (index: number) => {
    setInstantes(instantes.filter((_, id) => id !== index));
  };

  return (
    <div>
      <Reloj />
      <BotonGuardar onGuardar={guardarInstante} />
      <ListaInstantes instantes={instantes} onDelete={borrarInstante} />
    </div>
  );
};

export default RelojApp;
