import React from 'react';
import TaskLoggingContent from './TaskLoggingContent';

interface headerProps {
  title: string
}

function Header ({title}: headerProps) {
  return (
  <div className="header">
      <div className="menuIcon">
        <div className="dashTop"></div>
        <div className="dashMiddle"></div>
        <div className="dashBottom"></div>
      </div>

      <h2>{title}</h2>

      <i className="fa fa-search searchIcon"/>

    </div>
  )
}

const TaskLoggingHeader: React.FC = () => {
  return (

    <div>
      <Header title="Registro de tareas"/>
      <TaskLoggingContent/>
      {/* <Header title="Perfil"/>
      <Header title="Preferencias"/>
      <Header title="Chat"/> */}
    </div>

    // <button className="menuIcon"></button>
    // <div className="header">
    //   <div className="menuIcon">
    //     <div className="dashTop"></div>
    //     <div className="dashBottom"></div>
    //     <div className="circle"></div>
    //   </div>

    //   <h1>Registro de Tareas</h1>

    //   <input
    //     type="text"
    //     className="searchInput"
    //     placeholder="Buscar ..."
    //   />
    //   <div className="fa fa-search searchIcon"></div>
    // </div>
  );
};

export default TaskLoggingHeader;
