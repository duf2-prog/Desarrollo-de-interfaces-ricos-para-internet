import React from "react";

interface BotonGuardarProps {
  onGuardar: (horaActual: string) => void;
}

const BotonGuardar: React.FC<BotonGuardarProps> = ({ onGuardar }) => {
  const handleClick = () => {
    const now = new Date().toLocaleTimeString();
    onGuardar(now);
  };

  return <button onClick={handleClick}>Guardar instante</button>;
};

export default BotonGuardar;
