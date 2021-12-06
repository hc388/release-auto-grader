import React, {useState} from 'react'
import { Button, Container, Table } from "react-bootstrap";
import { Col, Row } from "react-flexbox-grid";
import FilterTopicOptions from "./FilterTopicOptions";

const QuestionSelector = props => {

  const [selectedList, updateSelectedList] = useState([])
  const list = props.questionList
  const [difficulty, setDifficulty] = useState("ALL");
  const [topic, setTopic] = useState(null);



  const onButtonClick = (e, quesNo) => {
    e.preventDefault()
    let tempArr = selectedList
    tempArr.push(quesNo)
    updateSelectedList(oldArray => [...oldArray, quesNo])
    props.onAddButtonClick(quesNo)
  }

  const handleReset = (e) => {
    props.resetter();
    setTopic(null);
    setDifficulty("ALL");
  };

  const handleDeselect = e => {
    props.resetter();
    props.deSelector();
    setTopic(null);
    setDifficulty("ALL");

  }

  const handleDifficultyChange = (e) => {
    props.updater(topic, e.target.value);
    //props.updateByDiff(e.target.value)
    setDifficulty(e.target.value);
  };



  return(
      <Container
        className="container-fluid d-flex flex-column justify-content-center align-items-center h-100 container-left">

        <Row className="greet-msg mt-3">Select Questions To Compile</Row>
        <Row className="d-flex flex-wrap mb-lg-2">
          <FilterTopicOptions questionList={props.questionList} updater={props.updater}
                              allQuestionList={props.allQuestionList} difficulty={difficulty} updateTopic={setTopic}/>

          {/*<FilterDifficultyOptions questionList={props.questionList} updater={props.updater} allQuestionList={props.allQuestionList}/>*/}
        </Row>
        <Row className="d-flex flex-row col-md-9 align-items-center" style={{ marginBottom: "1%" }}>
          {/*<Col className="col-md-6">*/}
          {/*  <Button className="btn-xl" onClick={e => handleSelectedButton(e)}>Show Selected</Button>*/}
          {/*</Col>*/}
          <Col className="col-md-12 col-sm-offset-3">
            <label className="col-md-4" htmlFor="user">
              <p>Question Difficulty</p>
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
        <Row className="d-flex flex-row justify-content-center col-md-10 mb-1">
          <Button  style={{fontSize:"20px"}} className="btn-light btn-lg col-md-4 mx-5" onClick={handleReset}>Reset Filters</Button>
          <Button  style={{fontSize:"20px"}} className="btn-light btn-lg col-md-4" onClick={handleDeselect}>Deselect All</Button>
        </Row>
        <Table className="col-md-11">
          <tbody>

          {list.map((obj, index) => <Row className="questions-rows" key={obj.id}>
              <tr className="d-flex">
                <td className="list-section">
                  <li class="list-item">{obj.questionString}
                    <span class="list-item-detail">
                        <span>Function: {obj.topic}</span>
                        <span>Difficulty: {obj.difficulty}</span>
                      </span>
                  </li>
                </td>
                <button className="btn-light h-50 mt-3" onClick={(e) => onButtonClick(e, obj.qid)}>Add</button>
              </tr>
            </Row>
          )}

          </tbody>
        </Table>
      </Container>
  )
}

export default QuestionSelector