import React from "react"
import { NavLink } from "react-router-dom"

const MenuPage = (): React.JSX.Element => 

    <div className="menuPage">
        <nav>
            <NavLink to="/">Inicio</NavLink> |
            <NavLink to="/help">Ayuda</NavLink>
        </nav>
    </div>

export default MenuPage