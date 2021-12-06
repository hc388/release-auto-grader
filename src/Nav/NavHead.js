import React from "react";
import { Link } from "react-router-dom";
import logo from "../img/logo.png";
import { Container, Button } from "react-bootstrap";
import Auth from "../Auth/Auth";

const NavHead = (props) => {

  const handleLogout = () => {
    const obj = {
      isLoggedIn: false
    }
    localStorage.setItem("login", JSON.stringify(obj))

    Auth.logout(() => {})
  };
  return (

    <header className="nav-header">
      <img className="logo-img" alt="logo" src={logo}/>
      <h2 className="header-main">Auto Grader</h2>
      <Link to="/" className="logout-corner">
        <Button className="btn-lg logout-button" onClick={handleLogout}>LOGOUT</Button>
      </Link>
    </header>
  );
};

export default NavHead;
