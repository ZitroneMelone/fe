import React from 'react';
import {Link} from "react-router-dom";
import "../components style/NavBarStyle.css"

const NavBar = () => {
    return (
        <div className={"NavBar"}>
            <nav>
            <Link className={"NavItem"} to = "/">Home</Link>
            <Link className={"NavItem"} to = "/teams">Teams</Link>
            <Link className={"NavItem"} to = "/games">Games</Link>
            </nav>
        </div>
    );
};

export default NavBar;