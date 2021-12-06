import React, { useState, memo } from "react";
import { Container, Row, Col } from "react-bootstrap";

const QuestionBlock = (props) => {
  const [answer, updateAnswer] = useState("");
  const handleChange = (e) => {
    //console.log(e.target.value)
    updateAnswer(e.target.value);
    props.onChange(e.target.value, props.qNo);
  };
  console.log("QuestionBlock was kicked in")
  return (
    <Container className="result-question-segment">
      <Row className="result-question-top">
        <p className="col-md-9 result-question-statement mt-2">
          {props.quesArray.questionNo}. {props.quesArray.questionString}
        </p>
        <h1 className="result-points-statement col-md-3">{(Math.round(props.gradeObj.pointsForQuestion * 100) / 100).toFixed(2)}/{props.quesArray.points} Points</h1>
      </Row>
      <Row className="result-question-bottom">
        <textarea readOnly={props.gradeObj.responses} className="result-results-textarea"
                  value={props.gradeObj.responses}/>
      </Row>
    </Container>
  );
};

export default memo(QuestionBlock);

// <Container fluid>
//   <div className="results-left-area">
//     <div className="question-segment">
//       <div className="question-top">
//         <h2 className="question-statement">
//           {props.quesArray.questionNo}. {props.quesArray.questionString}
//         </h2>
//         <h2 className="points-statement">{props.quesArray.points} Points</h2>
//       </div>
//       <div className="question-bottom">
//         <textarea readOnly={props.gradeObj.responses} className="results-textarea" value={props.gradeObj.responses} />
//       </div>
//     </div>
//     <div className="results-right-area">
//       <ResultTable />
//     </div>
//   </div>
// </Container>