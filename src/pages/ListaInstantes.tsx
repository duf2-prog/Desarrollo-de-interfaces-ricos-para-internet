import React from "react";
import InstanteItem from "./InstanteItem";

interface ListaInstantesProps {
  instantes: string[];
  onDelete: (index: number) => void;
}

const ListaInstantes: React.FC<ListaInstantesProps> = ({ instantes, onDelete }) => {
  return (
    <ul>
      {instantes.map((instante, index) => (
        <InstanteItem
          key={index}
          valor={instante}
          onDelete={() => onDelete(index)}
        />
      ))}
    </ul>
  );
};

export default ListaInstantes;
