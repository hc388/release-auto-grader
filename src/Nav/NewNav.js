import React from "react";
import Auth from "../Auth/Auth";
import logo from "../img/logo.png";
import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";

const NewNav = (props) => {

    const handleLogout = () => {
        const obj = {
            isLoggedIn: false
        }
        localStorage.setItem("login", JSON.stringify(obj))

        Auth.logout(() => {})
    };

    return(
        <header className="nav-header">
            <img className="logo-img" alt="logo" src={logo}/>
            <h2 className="header-main">Auto Grader</h2>
            <Link to="/" className="logout-corner">
                <Button className="btn-lg logout-button" onClick={handleLogout}>LOGOUT</Button>
            </Link>
        </header>
    )
}

export default NewNav