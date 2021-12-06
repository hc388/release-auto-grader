/* eslint-disable no-unused-vars */
import "../css/App.css";
import React, { useState } from "react";
import LoginForm from "../login/LoginForm";
import NewApiCall from "./NewApiCall";
import { Link, Redirect } from "react-router-dom";
import Auth from "../Auth/Auth";

function HomePage(props) {
  const [userName, updateUser] = useState("");
  const [passWord, updatePass] = useState("");
  const [role, updateRole] = useState("");
  const [page, updatePage] = useState("");
  const [id, updateId] = useState("");
  const [status, updateStatus] = useState(0);
  const [apiStatus, updateApiStatus] = useState(0);
  const [loading, setLoading] = useState(true);

  let makeCallToApi = 0;

  let userUpdater = (newUser) => {
    updateUser(newUser);
  };

  let passUpdater = (newPass) => {
    updatePass(newPass);
  };

  let detailsUpdater = async (newDetails) => {
    rollBackApiStatus();
    console.log("Details received", newDetails);
    if (newDetails.role === "UserNotFound") updateStatus(1);
    const obj = {
      isLoggedIn: true,
      id: newDetails.id,
      role : newDetails.role
    };
    await localStorage.setItem("login", JSON.stringify(obj));
    updateRole(newDetails.role);
    updateId(newDetails.id);
    props.updateAppId(newDetails.id);
  };
  let validateLogin = (user, pass) => {
    updateUser(user);
    updatePass(pass);
    updateApiStatus(1);

    setLoading(false);
  };
  let rollBackApiStatus = () => {
    updateApiStatus(0);
  };
  return (
    <div>
      <LoginForm
        upUser={userUpdater}
        upPass={passUpdater}
        status={status}
        validator={validateLogin}
      />
      {apiStatus === 1 && (
        <NewApiCall
          user={userName}
          pass={passWord}
          updateDetails={detailsUpdater}
          stopper={rollBackApiStatus}
        />
      )}
      {role === "Instructor" && <Redirect to="/instructor"/>}
      {role === "Student" &&
      <Redirect to="/student"/>
      }
    </div>
  );
}

export default HomePage;
