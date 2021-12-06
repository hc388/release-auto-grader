import React, {useState, useEffect} from 'react'
import { Container } from "react-bootstrap";
import {  Row } from "react-flexbox-grid";
import NewExamMaker from "./NewExamMaker";

const QuestionDisplayer = props => {
  const list = props.questionList
  const [selectedQuestionList, setSelectedQuestionList] = useState([])
  useEffect(() => {
    setSelectedQuestionList(props.allQuestionList.filter(obj => props.selectedList.includes(obj.qid)))

  }, [props.selectedList])


  return(
    <Container className="container d-flex flex-column align-items-lg-center h-100 container-right">
      <Row className="greet-msg m-3">Make an Exam</Row>

      <NewExamMaker questionList={selectedQuestionList} onDeleteClick={props.onDeleteClick}/>
    </Container>
  )
}

export default QuestionDisplayer