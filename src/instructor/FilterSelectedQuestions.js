import React, { useState } from "react";
import { Col, Row, Grid } from "react-flexbox-grid";
import NewExamMaker from "./NewExamMaker";
import { Table, Container, Button } from "react-bootstrap";
import Temp from "./Temp";
import FilterTopicOptions from "./FilterTopicOptions";

const FilterSelectedQuestions = (props) => {
  const list = props.questionList;
  console.log("Filter got", list);

  const [checkList, setCheckList] = useState([]);
  const [checkedState, setCheckedState] = useState(
    new Array(list.length).fill(false));
  const [difficulty, setDifficulty] = useState("ALL");
  const [topic, setTopic] = useState(null);

  const filterSelection = (e, item) => {
    console.log("CheckList looks like: ", checkList)

    if (checkList.includes(item)) {
      let newArray = checkList.filter(obj => obj !== item);
      setCheckList(newArray);
    } else {
      setCheckList(oldArray => [...oldArray, item]);
    }
  };

  const onHandleChange = (e, position, obj) => {
    filterSelection(e, obj);
    const newArray = checkedState.map((item, index) => index === position ? !item : item);
    setCheckedState(newArray);
  };

  const handleReset = (e) => {
    props.resetter();
    setTopic(null);
    setDifficulty("ALL");
  };

  const handleDeselect = (e) => {
    setCheckedState(new Array(list.length).fill(false));
    handleReset(e)
  };

  const handleDifficultyChange = (e) => {
    props.updater(topic, e.target.value);
    //props.updateByDiff(e.target.value)
    setDifficulty(e.target.value);
  };

  const handleSelectedButton = (e) => {
    props.showSelected(checkList);
  };

  return (
    <Container className="container-fluid d-flex flex-row w-100 container-main">
      <Container
        className="container-fluid d-flex flex-column justify-content-center align-items-center  col-md-5 h-100 container-left">

        <Row className="greet-msg m-3">Select Questions To Compile</Row>
        <Row className="d-flex flex-wrap mb-lg-5">
          <FilterTopicOptions questionList={props.questionList} updater={props.updater}
                              allQuestionList={props.allQuestionList} difficulty={difficulty} updateTopic={setTopic}/>

          {/*<FilterDifficultyOptions questionList={props.questionList} updater={props.updater} allQuestionList={props.allQuestionList}/>*/}
        </Row>
        <Row className="d-flex flex-row col-md-9 align-items-center" style={{ marginBottom: "5%" }}>
          <Col className="col-md-6">
            <Button className="btn-xl" onClick={e => handleSelectedButton(e)}>Show Selected</Button>
          </Col>
          <Col className="col-md-6">
            <label className="col-md-8" htmlFor="user">
              <h3>Question Difficulty</h3>
            </label>
            <select
              name="Difficulty"
              className="question-diff-small col-md-4"
              onChange={(e) => handleDifficultyChange(e)}
              value={difficulty}
            >
              <option disabled selected value="ALL"> -- All --</option>
              <option value="EASY">EASY</option>
              <option value="MEDIUM">MEDIUM</option>
              <option value="HARD">HARD</option>
            </select>
          </Col>
        </Row>
        <Row className="d-flex flex-row justify-content-center col-md-10 mb-5">
          <Button  style={{fontSize:"30px"}} className="btn-light btn-lg col-md-4 mx-5" onClick={handleReset}>Reset Filters</Button>
          <Button  style={{fontSize:"30px"}} className="btn-light btn-lg col-md-4" onClick={handleDeselect}>Deselect All</Button>
        </Row>
        <Table className="col-md-11">
          <tbody>

          {list.map((obj, index) => <Row className="questions-rows" key={obj.id}>
              <tr>
                <th style={{ "width": "50px" }}><input type={"Checkbox"} className="largerCheckbox" name={obj}
                                                       checked={checkedState[index]}
                                                       onChange={e => onHandleChange(e, index, obj)}/></th>
                <td className="list-section">
                  <li class="list-item">{obj.questionString}
                    <span class="list-item-detail">
                        <span>Function: {obj.topic}</span>
                        <span>Difficulty: {obj.difficulty}</span>
                      </span>
                  </li>
                </td>
              </tr>
            </Row>
          )}

          </tbody>
        </Table>
      </Container>
      <Container className="container d-flex flex-column align-items-lg-center col-md-5 h-100 container-right">
        <Row className="greet-msg m-3">Make an Exam</Row>

        <NewExamMaker questionList={checkList}/>
      </Container>
    </Container>
  );
};

export default FilterSelectedQuestions;