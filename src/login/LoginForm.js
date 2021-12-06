import React, { useState, useEffect } from "react";
import books from "../img/books.jpg";
import {Container} from "react-bootstrap";

function LoginForm(props) {
  const [user, updateUser] = useState("");
  const [pass, updatePass] = useState("");
  const [status, setStatus] = useState()

  let submitHandler = (event) => {
    event.preventDefault();
    props.validator(user, pass);

  };

  useEffect (() => {
    setStatus(props.status)
  },[status, props.status])

  const onUserChange = event => {
    if(status === 1 || status === 2){
      console.log("Changing status")
      setStatus(0)
    }
    updateUser(event.target.value)
  }

  const onPassChange = event => {
    if(status === 1 || status === 2)
      setStatus(0)
    updatePass(event.target.value)
  }

  return (
  <Container className="container-fluid" style={{ "max-width": "1619px"}}>
    <div className="container-main-login">
      <div className="container-left">
        <img src={books} alt="books.jpg" style={{width:"100%"}} />
      </div>
      <div className="container-right-login">
        <span className="login-header">Welcome to</span>
        <span className="login-header-big">Auto Grader!</span>
        <div className="divider">
          <div className="divider-sec1"></div>
          <span className="divider-text">Login</span>
          <div className="divider-sec2"></div>
        </div>
        <form action="#" onSubmit={() => false} method="post">
          <div className="form-container">
            <label className="label-form" htmlFor="user">
              <b style={{fontSize:"20px"}}>Username</b>
            </label>
            <input
              type="text"
              placeholder="Enter Username"
              name="user"
              required
              onChange={(e) => onUserChange(e)}
            />

            <label className="label-form" htmlFor="pass">
              <b style={{fontSize:"20px"}}>Password</b>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              name="pass"
              required
              onChange={(e) => onPassChange(e)}
            />

            <button type="submit" onClick={submitHandler} value="Login">
              Login
            </button>
            {status === 1 && (
              <p id="login-error-msg">!! Invalid username and/or password</p>
            )}
            {status === 2 && (
              <p id="login-error-msg">!! You Must Login First</p>
            )}
          </div>
        </form>
      </div>
    </div>
  </Container>
  );
}

export default LoginForm;
