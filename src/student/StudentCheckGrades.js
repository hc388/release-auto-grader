import React, { useEffect, useState } from "react";
import axios from "axios";
import {Link} from 'react-router-dom'
import Auth from "../Auth/Auth";
import {Card, Container, Row, Col} from "react-bootstrap";

const StudentCheckGrades = (props) => {
  const [dataArray, setdataArray] = useState([]);
  const [state, setState] = useState(false);
  const [loginStatus, setLoginStatus] = useState(false);
  const [role, setRole] = useState("null")
  const [key, setKey] = useState("");
  let loading = true;
  const data = localStorage.getItem('login')
  const id = JSON.parse(data).id
  console.log("Id looks like", id)

  useEffect(async () => {
    await axios
      .get("https://beta-0990913.herokuapp.com/api/listAllExams.php")
      .then((res) => {
        setdataArray(res.data.examNames);
      });
    setLoginStatus(Auth.isAuthenticated);
    if(Auth.isAuthenticated)
      setRole(Auth.getRole)
    loading = false;

  }, []);


  const loginErrorMessage = <div><h1>You are not logged in</h1> <br/>
    <h1>Please Logout And Try Logging back in</h1></div>;

  const roleErrorMessage = <div><h1>You are not Authorized to view this</h1> <br/>
    <h1>Please Logout And Try Logging back in</h1></div>;


  const ViewScoresClickHandler = (e,obj) => {
    setKey(obj);
    setState(true)
  }


  return (
    <div className="container-main-exam d-flex align-items-center flex-column">
      {loginStatus ?
        <React.Fragment>
          {role==="Student" ? <>
            <h1 className="exam-header">Select Exam to Check Grades</h1>
            <div className="exam-list">
              {dataArray.map((obj) => (
                  <Container className="col-md-12 d-flex flex-row justify-content-center">
                    <Row className="mt-3 w-100 justify-content-center">
                      <Col className="col-md-5">
                        <h3>{obj}</h3>
                      </Col>
                      <Col className="col-md-3">
                        <Link to={`/student/check-grades/${obj}/${id}`} >
                             <button className=""
                                   key={`score${obj}`}
                           onClick={e => ViewScoresClickHandler(e,obj)}>
                             View Scores
                           </button>
                           </Link>
                      </Col>
                    </Row>
                  </Container>
              ))}
              {console.log(key)}
              {state && <Link to={`/student/check-grades/${key}`} />}
            </div>
          </>:
            <>
            {roleErrorMessage}
            </>}
      </React.Fragment>:
        <React.Fragment>
          {loginErrorMessage}
        </React.Fragment>}
    </div>
  );
};

export default StudentCheckGrades;
