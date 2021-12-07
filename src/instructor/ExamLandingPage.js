import React, {useEffect, useState} from "react";
import {Container, Row, Col} from "react-bootstrap";
import Axios from "axios";
import QuestionSelector from "./QuestionSelector";
import QuestionDisplayer from "./QuestionDisplayer";
import Auth from "../Auth/Auth";

const ExamLandingPage = (props) => {
    const [questions, setQuestions] = useState([]);
    const [allQuestions, setAllQuestions] = useState([]);
    const [selectedQuestions, setSelectedQuestions] = useState([]);
    const [questionWithTestcase, setQuestionWithTestcase] = useState([])
    const [loading, setLoading] = useState(true);
    const [loginStatus, setLoginStatus] = useState(false);
    const [role, setRole] = useState("null");


    useEffect(() => {
        setLoading(true);

        async function fetchData() {
            let response = await Axios.get("https://beta-0990913.herokuapp.com/api/listQuestionBankRC.php");
            console.log(response);
            setQuestionWithTestcase(response.data.questions)
            setQuestions(response.data.questions.filter((obj) => obj.questionString !== ""));
            setAllQuestions(response.data.questions.filter((obj) => obj.questionString !== ""));
            let newArray = [];
            response.data.questions.map(obj => newArray.push(obj.questionString));
            console.log(newArray);
            setLoginStatus(Auth.isAuthenticated);
            if (Auth.isAuthenticated)
                setRole(Auth.getRole);
            setLoading(false);
        }

        fetchData();

    }, [loginStatus, role]);


    const onAddingQuestion = quesNo => {
        console.log("Adding Question was called");
        let tempArr = selectedQuestions;
        if (!tempArr.includes(quesNo)) {
            tempArr.push(quesNo);
            console.log(selectedQuestions, quesNo);
            setSelectedQuestions(oldArray => [...oldArray, quesNo]);
        }
    };

    const onRemovingQuestion = quesNo => {
        console.log("Came to Removing question");
        let tempArr = selectedQuestions.filter(item => item !== quesNo);
        setSelectedQuestions(tempArr);

    };

    const updateQuestionsByTopic = (type, key) => {
        console.log("Updater got: ", type, key);

        type === "topic" ?
            setQuestions(questions.filter(obj => obj[type].toUpperCase() === key)) :
            setQuestions(questions.filter(obj => obj[type].toUpperCase() === key));

    };

    const updateQuestionsByDiff = async (diff) => {
        await setQuestions(allQuestions.filter(obj => obj.difficulty.toUpperCase() === diff));
    };

    const resetFilters = () => {
        setQuestions(allQuestions);
    };

    const loginErrorMessage = <div><h1>You are not logged in</h1> <br/>
        <h1>Please Logout And Try Logging back in</h1></div>;

    const roleErrorMessage = <div><h1>You are not Authorized to view this</h1> <br/>
        <h1>Please Logout And Try Logging back in</h1></div>;

    const handleDeselect = () => {
        setSelectedQuestions([]);
    };
//obj[topic].toUpperCase() === topic)

    const totalUpdate = (topic, diff) => {
        console.log("TOTAL UPDATE GOT : ", topic, diff);
        if (diff === "ALL" && topic === null)
            setQuestions(allQuestions);
        else if (diff === "ALL" && topic !== null)
            setQuestions(allQuestions.filter(obj => obj.topic.toUpperCase() === topic));
        else if (diff !== "ALL" && topic === null)
            setQuestions(allQuestions.filter(obj => obj.difficulty.toUpperCase() === diff));
        else
            setQuestions(allQuestions.filter(obj => obj.difficulty.toUpperCase() === diff && obj.topic.toUpperCase() === topic));
    };

    const handleSelectedButton = (newList) => {
        setQuestions(newList);
    };

    return (
        <Container className="container-fluid d-flex flex-row w-100 container-main">
            {loginStatus ?
                <React.Fragment>
                    {role === "Instructor" ?
                        <React.Fragment>
                            <QuestionSelector questionList={questions} onAddButtonClick={onAddingQuestion}
                                              resetter={resetFilters}
                                              allQuestionList={allQuestions}
                                              updateByTopic={updateQuestionsByTopic}
                                              updateByDiff={updateQuestionsByDiff}
                                              updater={totalUpdate} showSelected={handleSelectedButton}
                                              deSelector={handleDeselect} quesDetails={questionWithTestcase}/>
                            <QuestionDisplayer questionList={questions} selectedList={selectedQuestions}
                                               onDeleteClick={onRemovingQuestion}
                                               resetter={resetFilters} allQuestionList={allQuestions}
                                               updateByTopic={updateQuestionsByTopic}
                                               updateByDiff={updateQuestionsByDiff}
                                               updater={totalUpdate} showSelected={handleSelectedButton}/>
                        </React.Fragment>
                        :
                        <>
                            {roleErrorMessage}
                        </>
                    }

                </React.Fragment> :
                <React.Fragment>
                    {loginErrorMessage}
                </React.Fragment>
            }
        </Container>
    );

};

export default ExamLandingPage;