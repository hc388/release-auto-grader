import React, {useEffect, useState} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";
import {Container, Row, Col, Table, Button, Card} from "react-bootstrap";

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
    const [average, setAverage] = useState()
    const [min, setMin] = useState()
    const [max, setMax] = useState()
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
                } else {
                    console.log(resp);
                    setScoreDetails(resp.data.studentScoreDetails);
                    setTotalPoints(resp.data.studentScoreDetails[0].totalPoints)
                    setLoading(false);
                    updateInitialAnswers(resp);
                    setIsGraded(true);
                }
            });
        await axios.post("https://beta-0990913.herokuapp.com/api/getExamStats.php", JSON.stringify({examName: params.examName}))
            .then(res => {
                console.log("Getting stats for the exam: ", res)
                setAverage(res.data.statsArr[0])
                setMin(res.data.statsArr[1])
                setMax(res.data.statsArr[2])
            })

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
        const params = {examId: examName};
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
                        !isGraded ? (
                                <div>
                                    <h1>Exam Data Not Available.</h1>
                                    <h3>Exam either being Graded or Does Not Exist.</h3>
                                    <h3>Please check back in a while.</h3>

                                </div>

                            ) :

                        <>
                            <h1 className="exam-header">Review Grade for {params.studentID}</h1>
                            <h1 className="mb-3">Your Score: {Number(totalPoints).toFixed(2)}</h1>
                            <div className="preview-grade-section container-scrollable">
                                <Card className="d-flex flex-row justify-content-around align-items-center mb-5 exam-score-card" style={{width: "50%", height:"50px"}}>
                                    <span>Average: {Number(average).toFixed(2)}</span>
                                    <span>Max Score: {Number(max).toFixed((2))}</span>
                                    <span>Min Score: {Number(min).toFixed((2))}</span>
                                </Card>

                                {
                                    scoreDetails.map((obj, index) => {
                                        console.log("Before displaying comments: ", obj);
                                        return <>
                                            <Container className="" style={{width: "90%"}}>
                                                <Row>
                                                    <Col className="col-6">
                                                        <QuestionBlock quesArray={questionArray[index]} index={index}
                                                                       gradeObj={obj}/>
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
                                                        <Row
                                                            className="d-flex align-items-baseline justify-content-between col-md-12">
                                                            {obj.comments === null &&
                                                            <input readOnly={"No Comment"} value={"No Comment..."}
                                                                   className="col-md-9 result-comment-section"/>}
                                                            {obj.comments !== null &&
                                                            <input readOnly={obj.comments} value={obj.comments}
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