import React from "react";

interface ActivityItemProps {
    nombreImagen: string;
    nombreImagenAlt: string;
    hora: string;
    texto: string;
}

const ActivityItem: React.FC<ActivityItemProps> = ({ 
    nombreImagen, 
    nombreImagenAlt, 
    hora, 
    texto 
}) => {
    return (
        <div className="item">
            <div className="avatar">
                <img alt={nombreImagenAlt} src={`/images/${nombreImagen}.jpg`}/>
            </div>
        <span className="time">{hora}</span>
        <p>{texto}</p>
      </div>
    );
};

export default ActivityItem;