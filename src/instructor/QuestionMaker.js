import React, { useEffect, useState } from "react";
import RenderQuestionMaker from "./RenderQuestionMaker";
import * as SourceAPI from "../misc/SourceAPI";
import Axios from "axios";
import Auth from "../misc/Auth";

function QuestionMaker(props) {
  const [questionString, updateQuestion] = useState("");
  const [testCase, updateTestCase] = useState({});
  const [topic, updateQuestionType] = useState("");
  const [difficulty, updateDifficulty] = useState("");
  const [whileUsed, setWhileUsed] = useState(false);
  const [recursionUsed, setRecursionUsed] = useState(false);
  const [forUsed, setForUsed] = useState(false);
  const [isSubmitted, setSubmitted] = useState(false);
  const [loginStatus, setLoginStatus] = useState(false);
  const [role, setRole] = useState("null");

  const difficultyUpdate = (newDiff) => {
    console.log("New difficulty is: ", newDiff);
    updateDifficulty(newDiff);
  };

  const loginErrorMessage = <div><h1>You are not logged in</h1> <br/>
    <h1>Please Logout And Try Logging back in</h1></div>;

  const roleErrorMessage = <div><h1>You are not Authorized to view this</h1> <br/>
    <h1>Please Logout And Try Logging back in</h1></div>;


  useEffect(() => {
    setLoginStatus(Auth.isAuthenticated);
    if (Auth.isAuthenticated)
      setRole(Auth.getRole);
  }, [loginStatus, role]);

  const onSubmitHandler = async function(e) {
    e.preventDefault();
    let questionToAdd = {};
    whileUsed ? questionToAdd.while_used = 1 : questionToAdd.while_used = 0;
    recursionUsed ? questionToAdd.recursion_used = 1 : questionToAdd.recursion_used = 0;
    forUsed ? questionToAdd.for_used = 1 : questionToAdd.for_used = 0;
    let response;
    if (questionString !== "") {
      console.log("Data You're Sending: ", JSON.stringify({
        questionToAdd: {
          questionString: questionString,
          difficulty: difficulty,
          topic: topic,
          testCases: testCase,
          while_used: questionToAdd.while_used,
          recursion_used: questionToAdd.recursion_used,
          for_used: questionToAdd.for_used

        }
      }));


      response = await Axios.post("https://beta-0990913.herokuapp.com/api/addQuestionToBankRC.php", JSON.stringify({
        questionToAdd: {
          questionString: questionString,
          difficulty: difficulty,
          topic: topic,
          testCases: testCase,
          while_used: questionToAdd.while_used,
          recursion_used: questionToAdd.recursion_used,
          for_used: questionToAdd.for_used

        }
      }));
    }
    console.log("After calling the API: ", response);

    setSubmitted(true);

    setTimeout(() => {
      setSubmitted(false);
    }, 8000);

  };

  return (
    <React.Fragment>
      {loginStatus ?
        <React.Fragment>
          {role === "Instructor" ?
            <RenderQuestionMaker
              updateQuestion={updateQuestion}
              updateTestCase={updateTestCase}
              whileState={whileUsed}
              setWhile={setWhileUsed}
              forState={forUsed}
              setFor={setForUsed}
              recursionState={recursionUsed}
              setRecursion={setRecursionUsed}
              updateDifficulty={difficultyUpdate}
              updateQuestionType={updateQuestionType}
              onSubmitHandler={onSubmitHandler}
              submitStatus={isSubmitted}
            />
            :
            <>
              {console.log(role)}
              {roleErrorMessage}
            </>
          }
        </React.Fragment>
        :
        <React.Fragment>
          {loginErrorMessage}
        </React.Fragment>
      }
    </React.Fragment>
  );
}

export default QuestionMaker;
