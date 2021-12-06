import React, {useEffect, useState} from "react";
import FilterSelectedQuestions from "./FilterSelectedQuestions";
import ShowAllQuestions from "./ShowAllQuestions";
import Axios from "axios";

const Temp = (props) => {
    const [questions, setQuestions] = useState([]);
    const [allQuestions, setAllQuestions] = useState([]);
    const [questionWithTestcase, setQuestionWithTestcase] = useState([])
    const [loading, setLoading] = useState(true);

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
            setLoading(false);
        }

        fetchData();

    }, [props.submitStatus]);

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
        <>

            {loading === false && (props.hasOwnProperty("type") ?
                <ShowAllQuestions resetter={resetFilters} allQuestionList={allQuestions} questionList={questions}
                                  updateByTopic={updateQuestionsByTopic} updateByDiff={updateQuestionsByDiff}
                                  updater={totalUpdate} quesDetails={questionWithTestcase}/> :
                <FilterSelectedQuestions resetter={resetFilters} allQuestionList={allQuestions} questionList={questions}
                                         updateByTopic={updateQuestionsByTopic} updateByDiff={updateQuestionsByDiff}
                                         updater={totalUpdate} showSelected={handleSelectedButton}
                                         quesDetails={questionWithTestcase}/>)}
        </>
    );
};

export default Temp;
