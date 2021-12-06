import 'bootstrap/dist/css/bootstrap.min.css';
import {
    BrowserRouter as Router,
    Link,
    Route,
    Switch,
    Redirect,
} from "react-router-dom";
import InstructorHome from "./instructor/InstructorHome";
import QuestionMaker from "./instructor/QuestionMaker";
import CheckGrades from "./instructor/CheckGrades";
import ExamLandingPage from "./instructor/ExamLandingPage";
import DisplayGrades from "./instructor/DisplayGrades";
import GradesByStudent from "./instructor/GradesByStudent";
import StudentHome from "./student/StudentHome";
import Student_ShowAllExams from "./student/Student_ShowAllExams";
import Student_DisplayExam from "./student/Student_DisplayExam";
import StudentCheckGrades from "./student/StudentCheckGrades";
import StudentDisplayGrades from "./student/StudentDisplayGrades";




import React, {useState} from "react";
import NavHead from "./Nav/NavHead";
import "./css/App.css"
import HomePage from "./login/HomePage";

function App() {
    const [id, updateId] = useState("");

    return (
        <Router>
            <div className="App">
                <NavHead/>
            </div>
            <Switch>
                <Route exact path="/">
                    <HomePage updateAppId={updateId}/>{" "}
                </Route>
                <Route exact path="/instructor">
                    <InstructorHome instructorId={id}/>
                </Route>
                <Route exact path="/instructor/question-maker">
                    <QuestionMaker instructorId={id}/>
                </Route>
                <Route exact path="/instructor/exam-maker">
                    <ExamLandingPage instructorId={id}/>
                </Route>
                <Route exact path="/instructor/check-grades">
                    <CheckGrades instructorId={id}/>
                </Route>
                <Route exact path="/instructor/check-grades/:examName">
                    <DisplayGrades instructorId={id}/>
                </Route>
                <Route exact path="/instructor/check-grades/:examName/:studentID">
                    <GradesByStudent instructorId={id}/>
                </Route>
                <Route exact path="/student">
                    {" "}
                    <StudentHome studentId={id}/>{" "}
                </Route>
                <Route exact path="/student/take-exam">
                    {" "}
                    <Student_ShowAllExams studentId={id}/>{" "}
                </Route>
                <Route exact path="/student/take-exam/:examName">
                    <Student_DisplayExam studentId={id}/>
                </Route>
                <Route exact path="/student/check-grades">
                    <StudentCheckGrades studentId={id}/>
                </Route>
                <Route exact path="/student/check-grades/:examName/:studentID">
                    <StudentDisplayGrades studentId={id}/>
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
