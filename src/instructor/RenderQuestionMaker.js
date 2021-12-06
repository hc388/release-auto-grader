import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import ExamMaker from "../unused_components/ExamMaker";
import Temp from "./Temp";
import TestCaseGenerator from "./TestCaseGenerator";

const RenderQuestionMaker = (props) => {

  return (

    <Container className="container-fluid d-flex flex-row w-100 container-main">
      <Container
        className="container-fluid d-flex flex-column justify-content-center align-items-center  col-lg-5 h-100 container-left">

        <Row className="greet-msg m-3">Upload Your Question Here</Row>
        <Row className="textarea-question-maker w-100 d-flex justify-content-center">
           <textarea
             placeholder="Write a Function XYZ..."
             onChange={(e) => props.updateQuestion(e.target.value)}

           />
        </Row>
        <Row className="container-testcase d-flex justify-content-center m-3">
          <Row className="greet-msg m-3 justify-content-center align-items-center">TestCases</Row>
          <TestCaseGenerator updateTestCase={props.updateTestCase}/>


        </Row>
        <Row className="d-flex flex-col col-md-9 justify-content-around m-3 flex-wrap">
          <Col className="loop-condition-specifier d-flex justify-content-center align-items-center">
            <input className="largerCheckbox" type={"Checkbox"} name={"while"} checked={props.whileState} onChange={ e =>props.setWhile(!props.whileState)}/>
            <p>While-Loop</p>
          </Col>
          <Col className="loop-condition-specifier d-flex justify-content-center align-items-center">
            <input className="largerCheckbox" type={"Checkbox"} name={"for"} checked={props.forState} onChange={e => props.setFor(!props.forState)}/>
            <p>For-Loop</p>
          </Col>
          <Col className="loop-condition-specifier d-flex justify-content-center align-items-center">
            <input className="largerCheckbox" type={"Checkbox"} name={"recursion"} checked={props.recursionState} onChange={ e => props.setRecursion(!props.recursionState)}/>
            <p>Recursion</p>
          </Col>
        </Row>
        <Row className="d-flex flex-row col-md-9">
          <label className="question-label col-md-8" htmlFor="user">
            <b>Question Difficulty</b>
          </label>
          <select
            name="Difficulty"
            className="question-diff col-md-4"
            defaultValue={"NONE"}
            onChange={(e) => props.updateDifficulty(e.target.value)}
          >
            <option disabled value="NONE"> -- select an option --</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </Row>
        <Row className="d-flex flex-row col-md-9">
          <label className="question-label col-md-8" htmlFor="pass">
            <b>Question Topic</b>
          </label>
          <input
            type="text"
            className=" question-diff col-md-4"
            placeholder="Add Question Topic"
            name="pass"
            required
            onChange={(e) => props.updateQuestionType(e.target.value)}
          />

        </Row>
        <Button type="submit" className="submit-question-btn mb-5" onClick={e => props.onSubmitHandler(e)}>Submit Question</Button>
        {props.submitStatus ? <h3 className="mb-5">Your question was submitted.</h3> : null}
      </Container>
      <Container className="container d-flex flex-column col-lg-5 h-100 align-self-start container-right">
        <Row className="greet-msg m-3 justify-content-center">Questions In Your Library</Row>
        <Temp type={"show"} submitStatus={props.submitStatus}/>
      </Container>

    </Container>
  );
};

export default RenderQuestionMaker;


//<div className="container-main">
//   <div className="container-left">
//     <div className="greet-msg">Upload Your Question Here</div>
//     <div className="container-status-box">
//       <textarea
//         placeholder="Write a Function XYZ..."
//         onChange={(e) => props.updateQuestion(e.target.value)}
//       />
//       <div className="container-testcase">
//         <span className="testcase">
//           TestCase #1{" "}
//           <input
//             type="text"
//             onChange={(e) => props.updateTestcase1(e.target.value)}
//           />{" "}
//           <input
//             className="second-input"
//             type="text"
//             onChange={(e) => props.updateCase1Answer(e.target.value)}
//           />
//         </span>
//         <span className="testcase">
//           TestCase #2{" "}
//           <input
//             type="text"
//             onChange={(e) => props.updateTestcase2(e.target.value)}
//           />{" "}
//           <input
//             className="second-input"
//             type="text"
//             onChange={(e) => props.updateCase2Answer(e.target.value)}
//           />
//         </span>
//         <span className="testcase">
//           TestCase #3{" "}
//           <input
//             type="text"
//             onChange={(e) => props.updateTestcase3(e.target.value)}
//           />{" "}
//           <input
//             className="second-input"
//             type="text"
//             onChange={(e) => props.updateCase3Answer(e.target.value)}
//           />
//         </span>
//       </div>
//       <div className="form-container">
//       <label className="question-label" htmlFor="user">
//         <b>Question Difficulty</b>
//       </label>
//       <select
//         defaultValue="Easy"
//         name="Difficulty"
//         className="question-diff"
//         onChange={(e) => props.updateDifficulty(e.target.value)}
//       >
//         <option value="Easy">Easy</option>
//         <option value="Medium">Medium</option>
//         <option value="Hard">Hard</option>
//       </select>
//       {/*<input type="text" placeholder="Change Question Difficulty" name="user" required onChange={onDifficultyChange}/>*/}
//       <label className="question-label" htmlFor="pass">
//         <b>Question Topic</b>
//       </label>
//       <input
//         type="text"
//         placeholder="Add Question Topic"
//         name="pass"
//         required
//         onChange={(e) => props.updateQuestionType(e.target.value)}
//       />

//       <button
//         className="question-btn"
//         type="submit"
//         value="Submit"
//         onClick={props.onSubmitHandler}
//       >
//         Submit Question
//       </button>
//     </div>
//     </div>
//   </div>
//   <div className="container-right">
//   </div>
// </div>