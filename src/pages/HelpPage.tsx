import React from "react"
import { NavLink, Outlet } from "react-router-dom"

const HelpPage = (): React.JSX.Element => 

    <div className="helpPage">

        <h1>Ayuda</h1> 

        <nav>
            <NavLink to="/help/ask">Preguntas frecuentes</NavLink>
            <NavLink to="/help/References">Referencias</NavLink>
        </nav>
        
        <Outlet/>
    </div>
export default HelpPage 