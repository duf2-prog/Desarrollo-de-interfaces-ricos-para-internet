interface InstanteItemProps {
  valor: string;
  onDelete: () => void;
}

const InstanteItem: React.FC<InstanteItemProps> = ({ valor, onDelete }) => {
  return (
    <li>
      {valor}
      <button onClick={onDelete} style={{ marginLeft: "10px" }}>
        Borrar
      </button>
    </li>
  );
};

export default InstanteItem;
