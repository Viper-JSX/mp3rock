import React from "react";
import { NavLink } from "react-router-dom";

const Navbar: React.FC = () => {
    return (
        <nav>
            <ul>
                <li>
                    <NavLink to="/">Home</NavLink>
                </li>

                <li>
                    <NavLink to="/songs" >Songs</NavLink>
                </li>
                
                <li>
                    <NavLink to="/playlists">Playlists</NavLink>
                </li>
                
                <li>
                    <NavLink to="/my-playlists">My playlists</NavLink>
                </li>
                
                <li>
                    <NavLink to="/profile">Profile</NavLink>
                </li>            
            </ul>
        </nav>
    )
}

export default Navbar;