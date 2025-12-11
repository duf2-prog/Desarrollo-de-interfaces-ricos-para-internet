import React from "react";

interface InstanteItemProps {
  valor: string;
}

const InstanteItem: React.FC<InstanteItemProps> = ({ valor }) => {
  return <li>{valor}</li>;
};

export default InstanteItem;
