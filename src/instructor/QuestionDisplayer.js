import React, {useState, useEffect} from 'react'
import { Button, Container, Table } from "react-bootstrap";
import { Col, Row } from "react-flexbox-grid";
import FilterTopicOptions from "./FilterTopicOptions";
import NewExamMaker from "./NewExamMaker";

const QuestionDisplayer = props => {
  const list = props.questionList
  console.log("Question Displayer Got:  ",props.allQuestionList )
  console.log("Question Displayer Got:  ",props.selectedList )
  const [selectedQuestionList, setSelectedQuestionList] = useState([])
  useEffect(() => {
    setSelectedQuestionList(props.allQuestionList.filter(obj => props.selectedList.includes(obj.qid)))

  }, [props.selectedList])


  return(
    <Container className="container d-flex flex-column align-items-lg-center col-md-5 h-100 container-right">
      <Row className="greet-msg m-3">Make an Exam</Row>

      <NewExamMaker questionList={selectedQuestionList} onDeleteClick={props.onDeleteClick}/>
    </Container>
  )
}

export default QuestionDisplayer