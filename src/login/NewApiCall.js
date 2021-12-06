import React from "react";
import axios from "axios";

const Axios = axios.create({
  baseURL: "https://beta-0990913.herokuapp.com/api/",
});

class NewApiCall extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: this.props.user,
      password: this.props.pass,
    };
    this.loginUser = this.loginUser.bind(this);
  }

  async loginUser(credentials) {
    const tempObj = {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    };
    console.log("API WAS CALLED");
    const login = await Axios.post("login.php", tempObj);
    console.log("Response from fetch: ", login.data);
    return login.data;
  }

  async componentDidMount(props, loginUser) {
    console.log("Mount got ", this.props.user, this.props.pass);

    const obj = {
      userName: this.props.user,
      password: this.props.pass,
    };
    console.log("object looks like ", obj);

    const tempObj = {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    };
    console.log("API WAS CALLED");
    const login = await Axios.post("login.php", JSON.stringify(obj));
    console.log("Response from fetch: ", login.data);
    this.props.updateDetails(login.data);
  }

  render() {
    return "";
  }
}

export default NewApiCall;
