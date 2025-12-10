import React from 'react';
import ActivityItem from './assets/components/ActivityItem';

const TaskLoggingContent: React.FC = () => {
  return (
    <div className="content">
      <input
        type="text"
        className="searchInput"
        placeholder="Buscar ..."
      />

      <div className="line"></div>

      <ActivityItem
        nombreImagen="francisca"
        nombreImagenAlt="Francisca"
        hora="Hace una hora"
        texto="Fui a comer con amigos"
      />

      <ActivityItem
        nombreImagen="paco"
        nombreImagenAlt="Paco"
        hora="10:00 am"
        texto="Leí un artículo sobre tecnología"
      />

      <ActivityItem
        nombreImagen="quica"
        nombreImagenAlt="Quica"
        hora="10:00 am"
        texto="Escribí notas sobre un proyecto importante"
      />

      <ActivityItem
        nombreImagen="curro"
        nombreImagenAlt="Curro"
        hora="2:21 pm"
        texto="Preparé la presentación para la reunión de mañana"
      />

      {/* <div className="item">
        <div className="avatar">
          <img alt="Francisca" src="/images/francisca.jpg" />
        </div>
        <span className="time">Hace una hora</span>
        <p>Fui a comer con amigos</p>
      </div>

      <div className="item">
        <div className="avatar">
          <img alt="Paco" src="/images/paco.jpg" />
        </div>
        <span className="time">10:00 am</span>
        <p>Leí un artículo sobre tecnología</p>
      </div>

      <div className="item">
        <div className="avatar">
          <img alt="Quica" src="/images/quica.jpg" />
        </div>
        <span className="time">10:00 am</span>
        <p>Escribí notas sobre un proyecto importante</p>
      </div>

      <div className="item">
        <div className="avatar">
          <img alt="Curro" src="/images/curro.jpg" />
        </div>
        <span className="time">2:21 pm</span>
        <p>Preparé la presentación para la reunión de mañana</p>
      </div> */}
    </div>
  );
};

export default TaskLoggingContent;
