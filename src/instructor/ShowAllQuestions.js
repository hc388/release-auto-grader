import React, { useState } from "react";
import { Col, Row, Grid } from "react-flexbox-grid";
import { Table, Container, Button } from "react-bootstrap";
import FilterTopicOptions from "./FilterTopicOptions";
import { useModal } from 'react-hooks-use-modal';
import QuestionModal from "./QuestionModal";


const ShowAllQuestions = (props) => {
  const list = props.questionList;

  const [checkList, setCheckList] = useState([]);
  const [checkedState, setCheckedState] = useState(
    new Array(list.length).fill(false));
  const [submit, setSubmit] = useState(0);
  const [difficulty, setDifficulty] = useState("ALL");
  const [topic, setTopic] = useState(null);
  const [Modal, open, close, isOpen] = useModal('root', {
    preventScroll: true,
    closeOnOverlayClick: false
  });

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
    <Container className="scrollable-container">
        <FilterTopicOptions questionList={props.questionList} updater={props.updater}
                            allQuestionList={props.allQuestionList} difficulty={difficulty} updateTopic={setTopic}/>

        {/*<FilterDifficultyOptions questionList={props.questionList} updater={props.updater} allQuestionList={props.allQuestionList}/>*/}
      <Row className="d-flex flex-row col-md-12" style={{ marginBottom: "1%" }}>
        <label className="col-md-3" htmlFor="user">
          <p>Question Difficulty</p>
        </label>
        <select
          name="Difficulty"
          className="question-diff-small col-md-3"
          onChange={(e) => handleDifficultyChange(e)}
          value={difficulty}
        >
          <option disabled selected value="ALL"> -- All --</option>
          <option value="EASY">EASY</option>
          <option value="MEDIUM">MEDIUM</option>
          <option value="HARD">HARD</option>
        </select>
      </Row>
      <Button className="btn-light btn-md mb-2" onClick={handleReset}>Reset Filters</Button>
      <>
        {list.length !== 0 ? (
            <Table className="table-bordered">
              <tbody className="tbody-scrollable-container">
              {
              list.map((obj, index) => <Row className="questions-rows col-md-12" key={obj.qid}>
                    <QuestionModal obj = {obj} allData={props.quesDetails} qid={obj.qid} close={close} />
              </Row>
              )
              }
              </tbody>
            </Table>
          ) :
          <p className="mt-5 text-black-50">No such entries...</p>
        }
      </>
    </Container>
  );
};

export default ShowAllQuestions;