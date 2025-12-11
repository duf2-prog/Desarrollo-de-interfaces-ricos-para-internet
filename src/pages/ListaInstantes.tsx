import React from "react";
import InstanteItem from "./InstanteItem";

interface ListaInstantesProps {
  instantes: string[];
}

const ListaInstantes: React.FC<ListaInstantesProps> = ({ instantes }) => {
  return (
    <ul>
      {instantes.map((instante, index) => (
        <InstanteItem key={index} valor={instante} />
      ))}
    </ul>
  );
};

export default ListaInstantes;
