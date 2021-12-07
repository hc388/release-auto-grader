import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Temp from "./Temp";
import TestCaseGenerator from "./TestCaseGenerator";

const RenderQuestionMaker = (props) => {

  return (

    <Container className="container-fluid d-flex flex-row w-100 container-main">
      <Container
        className="container-fluid d-flex flex-column justify-content-center align-items-center container-left-make-question">

        <Row className="greet-msg mt-1">Upload Your Question Here</Row>
        <Row className="textarea-question-maker w-100 d-flex justify-content-center">
           <textarea
             placeholder="Write a Function XYZ..."
             onChange={(e) => props.updateQuestion(e.target.value)}

           />
        </Row>
        <Row className="container-testcase d-flex justify-content-center m-3">
          <Row className="greet-msg m-1 justify-content-center align-items-center">TestCases</Row>
          <TestCaseGenerator updateTestCase={props.updateTestCase}/>
        </Row>
        <Row className="d-flex flex-col col-md-9 justify-content-around m-3 flex-wrap">
          <Col className="loop-condition-specifier d-flex justify-content-center align-items-center">
            <input className="largerCheckbox" type={"Checkbox"} name={"while"} checked={props.whileState} onChange={ e =>props.setWhile(!props.whileState)}/>
            <span>While-Loop</span>
          </Col>
          <Col className="loop-condition-specifier d-flex justify-content-center align-items-center">
            <input className="largerCheckbox" type={"Checkbox"} name={"for"} checked={props.forState} onChange={e => props.setFor(!props.forState)}/>
            <span>For-Loop</span>
          </Col>
          <Col className="loop-condition-specifier d-flex justify-content-center align-items-center">
            <input className="largerCheckbox" type={"Checkbox"} name={"recursion"} checked={props.recursionState} onChange={ e => props.setRecursion(!props.recursionState)}/>
            <span>Recursion</span>
          </Col>
        </Row>
        <Row className="d-flex flex-row col-md-9 mt-3">
          <label className="question-label col-md-5" htmlFor="user">
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
        <Row className="d-flex flex-row col-md-9 mb-5">
          <label className="question-label col-md-5" htmlFor="pass">
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
        <Button type="submit" className="submit-question-btn mb-5 " onClick={e => props.onSubmitHandler(e)}>Submit Question</Button>
        {props.submitStatus ? <h3 className="mb-5">Your question was submitted.</h3> : null}
      </Container>
      <Container className="container d-flex flex-column align-self-start mb-5 container-right">
        <Row className="greet-msg mt-1 justify-content-center">Questions In Your Library</Row>
        <Temp type={"show"} submitStatus={props.submitStatus}/>
      </Container>

    </Container>
  );
};

export default RenderQuestionMaker;