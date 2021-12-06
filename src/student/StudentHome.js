/* eslint-disable no-unused-vars */
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {Table, Container, Button} from "react-bootstrap";
import Auth from "../Auth/Auth";


function StudentHome(props) {
    const [loginStatus, setLoginStatus] = useState(false);
    const [role, setRole] = useState("null");
    //console.log("Received props id", props.studentId)
    useEffect(() => {
        setLoginStatus(Auth.isAuthenticated);
        if (Auth.isAuthenticated)
            setRole(Auth.getRole);
    }, [loginStatus, role]);

    const loginErrorMessage = <div><h1>You are not logged in</h1> <br/>
        <h1>Please Logout And Try Logging back in</h1></div>;

    const roleErrorMessage = <div><h1>You are not Authorized to view this</h1> <br/>
        <h1>Please Logout And Try Logging back in</h1></div>;


    return (
        <Container className="container-fluid" style={{"max-width": "1619px"}}>
            <div className="container-main-login">
                {loginStatus ?
                    <React.Fragment>
                        {role === "Student" ? <>
                                <div className="container-left-home">
                                    <div className="greet-msg">Hi, Student!</div>
                                    <div className="container-status-box">
                                        <h3>You have no tasks pending.</h3>
                                    </div>
                                </div>
                                <div className="container-right-login">
                                    <div className="container-links">
                                        <div className="make-question">
                                            <Link to="/student/take-exam">
                                                <Button className="btn-lg span-link" style={{"font-size": "20px"}}> Take
                                                    Exam</Button>{" "}
                                            </Link>
                                        </div>
                                        <div className="make-question">
                                            <Link to="/student/check-grades">
                                                <Button className="btn-lg span-link" style={{"font-size": "20px"}}>Check
                                                    Grades</Button>{" "}
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </> :
                            <>
                                {roleErrorMessage}
                            </>
                        }
                    </React.Fragment> :
                    <React.Fragment>
                        {loginErrorMessage}
                    </React.Fragment>}
            </div>
        </Container>
    );
}

export default StudentHome;
