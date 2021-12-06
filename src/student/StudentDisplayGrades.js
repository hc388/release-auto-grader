import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Table, Button } from "react-bootstrap";

import QuestionBlock from "../instructor/QuestionBlock";
import StudentResultSection from "./StudentResultSection";
import Auth from "../Auth/Auth";

const GradesByStudent = props => {

  const [loading, setLoading] = useState(true);
  const [isGraded, setIsGraded] = useState(false);
  const [scoreDetails, setScoreDetails] = useState([]);
  const [questionArray, setQuestionArray] = useState([]);
  const [answerArray, setAnswerArray] = useState([]);
  const [comment, setComment] = useState("");
  const [totalPoints, setTotalPoints] = useState();
  const [loginStatus, setLoginStatus] = useState(false);
  const [role, setRole] = useState("null");
  const data = localStorage.getItem("login");
  const id = JSON.parse(data).id;


  let params = useParams();

  useEffect(async () => {
    await getExamLayout(params.examName);
    const res = await axios.post("https://beta-0990913.herokuapp.com/api/seeExamAndGradeByStudentRCStudentSide.php", JSON.stringify({
      examId: params.examName, studentName: params.studentID
    }))
      .then(resp => {
        if (resp.data.responseCode === 404) {
          console.log(resp)
          setIsGraded(false);
        }
        else {
          console.log(resp);
          setScoreDetails(resp.data.studentScoreDetails);
          setLoading(false);
          updateInitialAnswers(resp);
          setIsGraded(true);
        }
      });
    setLoginStatus(Auth.isAuthenticated);
    if (Auth.isAuthenticated)
      setRole(Auth.getRole);


  }, []);

  const updateInitialAnswers = (res) => {
    let scoreArray = res.data.studentScoreDetails;
    let newArray = [];
    for (let obj in scoreArray) {
      //console.log(scoreArray[obj].pointsForQuestion)
      let point = parseInt(scoreArray[obj].pointsForQuestion);
      newArray.push(point);
    }
    setAnswerArray(newArray);
  };

  const loginErrorMessage = <div><h1>You are not logged in</h1> <br/>
    <h1>Please Logout And Try Logging back in</h1></div>;

  const roleErrorMessage = <div><h1>You are not Authorized to view this</h1> <br/>
    <h1>Please Logout And Try Logging back in</h1></div>;


  const getExamLayout = async (examName) => {
    const params = { examId: examName };
    await axios
      .post(
        "https://beta-0990913.herokuapp.com/api/getExamById.php",
        JSON.stringify(params)
      )
      .then((res) => {
        setQuestionArray(res.data.studentExamArray);
        setAnswerArray(new Array(res.data.studentExamArray.length));
      });
  };

  return (
    <div className="container-main-exam d-flex align-items-center flex-column">
      {loginStatus ?
        <React.Fragment>
          {role === "Student" ?
            <>
              <h1 className="exam-header">Review Grade for {params.studentID}</h1>
              <div className="preview-grade-section container-scrollable">

                {!isGraded ? <h1>Your Exam is still being graded...Please Check back in a while</h1> :
                  scoreDetails.map((obj, index) => {
                    console.log("Before displaying comments: ", obj);
                    return <>
                      <Container className="" style={{ width: "90%" }}>
                        <Row>
                          <Col className="col-6">
                            <QuestionBlock quesArray={questionArray[index]} index={index} gradeObj={obj}/>
                          </Col>
                          <Col className="col-6">
                            <Table striped bordered hover size="lg"
                                   className="table table-hover table-fixed student-result-table">
                              <thead>
                              <tr>
                                <th>TestCase</th>
                                <th>Expected</th>
                                <th>Run</th>
                                <th>Max</th>
                                <th>Points</th>

                              </tr>
                              </thead>
                              <tbody>
                              <StudentResultSection gradeobj={obj}/>
                              </tbody>
                            </Table>
                            <Row className="d-flex align-items-baseline justify-content-between col-md-12">
                              {obj.comments === null && <input readOnly={"No Comment"} value={"No Comment..."}
                                                               className="col-md-9 result-comment-section"/>}
                              {obj.comments !== null && <input readOnly={obj.comments} value={obj.comments}
                                                               className="col-md-9 result-comment-section"/>}

                            </Row>

                          </Col>
                        </Row>
                      </Container>
                    </>;
                  })
                }
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
            </React.Fragment>}
            </div>
            );
            };

            export default GradesByStudent;