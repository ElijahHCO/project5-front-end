import React from "react";
import './App.css';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Nav() {
    return (
        <nav>
            <Link to="/locations">
                <h3 className="logo">Locations</h3>
            </Link>
            <ul className="nav-links">
                <Link to="/ski">
                    <img src="skis-min.jpeg" alt="" id="ski-img" />
                </Link>
                <Link to="/snowboard">
                    <img src="snowboards-min.jpeg" alt="" id="snow-img" />
                </Link>
            </ul>
        </nav>
    )
}


export default Nav