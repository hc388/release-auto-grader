import React, { useState } from "react";
import { Col, Row, Grid } from "react-flexbox-grid";
import NewExamMaker from "./NewExamMaker";
import { Table, Container, Button } from "react-bootstrap";
import FilterTopicOptions from "./FilterTopicOptions";
import FilterDifficultyOptions from "./FilterDifficultyOptions";

const ShowAllQuestions = (props) => {
  const list = props.questionList;

  const [checkList, setCheckList] = useState([]);
  const [checkedState, setCheckedState] = useState(
    new Array(list.length).fill(false));
  const [submit, setSubmit] = useState(0);
  const [difficulty, setDifficulty] = useState("ALL");
  const [topic, setTopic] = useState(null);

  const handleReset = (e) => {
    props.resetter();
    setTopic(null);
    setDifficulty("ALL");

  };

  const handleDifficultyChange = (e) => {
    props.updater(topic, e.target.value);
    //props.updateByDiff(e.target.value)
    setDifficulty(e.target.value);
  };


  return (
    <Grid className="scrollable-container">
      <Row className="d-flex flex-wrap mb-lg-5">
        <FilterTopicOptions questionList={props.questionList} updater={props.updater}
                            allQuestionList={props.allQuestionList} difficulty={difficulty} updateTopic={setTopic}/>

        {/*<FilterDifficultyOptions questionList={props.questionList} updater={props.updater} allQuestionList={props.allQuestionList}/>*/}
      </Row>
      <Row className="d-flex flex-row col-md-9 align-items-center" style={{ marginBottom: "5%" }}>
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
      </Row>
      <Button className="btn-light btn-lg mb-5" onClick={handleReset}>Reset Filters</Button>
      <>
        {list.length !== 0 ? (
            <Table className="table-bordered">
              <tbody className="tbody-scrollable-container">
              {
              list.map((obj, index) => <Row className="questions-rows col-md-12" key={obj.id}>
                <tr className="col-md-12" style={{ "width": "100%" }}>
                  <td className="list-section col-md-12">
                    <li class="list-item col-md-12">{obj.questionString}
                      <span class="list-item-detail">
                    <span>Function: {obj.topic}</span>
                    <span>Difficulty: {obj.difficulty}</span>
                  </span>
                    </li>
                  </td>
                </tr>
              </Row>
              )
              }
              </tbody>
            </Table>
          ) :
          <p className="mt-5 text-black-50">No such entries...</p>
        }
      </>
    </Grid>
  );
};

export default ShowAllQuestions;