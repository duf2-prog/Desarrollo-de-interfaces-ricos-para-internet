import React, { useState, useEffect } from "react";
import Reloj from "./Reloj";
import BotonGuardar from "./BotonGuardar";
import ListaInstantes from "./ListaInstantes";

const RelojApp: React.FC = () => {
  const [instantes, setInstantes] = useState<string[]>(() => {
    const saved = localStorage.getItem('instants');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("instants", JSON.stringify(instantes));
  }, [instantes]);

  const guardarInstante = (horaActual: string) => {
    setInstantes([...instantes, horaActual]);
  };

  return (
    <div>
      <Reloj />
      <BotonGuardar onGuardar={guardarInstante} />
      <ListaInstantes instantes={instantes} />
    </div>
  );
};

export default RelojApp;
