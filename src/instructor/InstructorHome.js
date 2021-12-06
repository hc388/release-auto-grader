/* eslint-disable no-unused-vars */
import React, {useEffect, useState} from "react";
import {Link, Redirect} from "react-router-dom";
import {Table, Container, Button, Card, ListGroup} from "react-bootstrap";
import Auth from "../Auth/Auth";
import App from "../App";
import axios from "axios";
import ExamCard from "./ExamCard";


function InstructorHome(props) {
    const [loginStatus, setLoginStatus] = useState(false);
    const [examExist, setExamExist] = useState(false)
    const [examArray, setExamArray] = useState([])
    const [role, setRole] = useState("null")

    useEffect(() => {
        setLoginStatus(Auth.isAuthenticated);
        if (Auth.isAuthenticated)
            setRole(Auth.getRole)
        fetchExams()
    }, [loginStatus, role]);

    const fetchExams = async () => {
        const res = await axios.get("https://beta-0990913.herokuapp.com/api/listGradePendingExams.php")
        if (res.data.ungradedExams.length !== 0) {
            setExamExist(true)
            setExamArray(res.data.ungradedExams)
        }

        console.log("If any exams haven't been graded...", res)
    }

    const loginErrorMessage = <div><h1>You are not logged in</h1> <br/>
        <h1>Please Logout And Try Logging back in</h1></div>;

    const roleErrorMessage = <div><h1>You are not Authorized to view this</h1> <br/>
        <h1>Please Logout And Try Logging back in</h1></div>;

    return (
        <Container className="container-fluid" style={{"max-width": "1619px"}}>
            <div className="container-main-login">
                {loginStatus ?
                    <React.Fragment>
                        {role === "Instructor" ?
                            <>
                                <div className="container-left-home">
                                    <div className="greet-msg">Hi, Instructor!</div>
                                    <div className="container-status-box">
                                        {
                                            examExist ? (<React.Fragment>
                                                    <h3>You have an exam to grade...</h3>
                                                    {examArray.map(examName => <ExamCard name={examName} key={examName}/>)}

                                                </React.Fragment>) :
                                                <h3>You have no tasks pending.</h3>
                                        }
                                    </div>
                                </div>
                                <div className="container-right-login">
                                    <div className="container-links">
                                        <div className="make-question">
                                            <Link to="/instructor/question-maker">
                                                <Button className="btn-lg span-link" style={{"fontSize": "20px"}}> Make
                                                    a
                                                    Question</Button>{" "}
                                            </Link>
                                        </div>
                                        <div className="make-exam">
                                            <Link to="/instructor/exam-maker">
                                                <Button className="btn-lg span-link " style={{"fontSize": "20px"}}> Make
                                                    an
                                                    Exam</Button>{" "}
                                            </Link>
                                        </div>
                                        <div className="see-grades">
                                            <Link to="/instructor/check-grades">
                                                <Button className="btn-lg span-link" style={{"fontSize": "20px"}}>Check
                                                    Grades</Button>{" "}
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </>
                            :
                            <>
                                {roleErrorMessage}
                            </>
                        }
                    </React.Fragment>
                    :
                    <React.Fragment>
                        {loginErrorMessage}
                    </React.Fragment>
                }

            </div>
        </Container>


    );
}

export default InstructorHome;
