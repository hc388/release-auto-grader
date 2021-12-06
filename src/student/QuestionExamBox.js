import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";

const QuestionExamBox = (props) => {
  const [answer, updateAnswer] = useState("");
  const handleChange = (e) => {
    //console.log(e.target.value)
    updateAnswer(e.target.value);
    props.onChange(e.target.value, props.qNo);
  };

  const textAreaRef = React.createRef();

  return (
    <Container className="question-segment">
      <Row className="result-question-top">
        <p className="col-md-9 result-question-statement mt-2">
          {props.quesArray.questionNo}. {props.quesArray.questionString}
        </p>
        <h1 className="result-points-statement col-md-3">{props.quesArray.points} Points</h1>
      </Row>
      <div className="question-bottom">
        <textarea
          ref={textAreaRef}
          value={answer}
          name="answer-box"
          id="answer-box"
          onChange={(e) => handleChange(e)}
          onKeyDown={(e) => {
            if (e.key === "Tab") {
              e.preventDefault();

              const { selectionStart, selectionEnd } = e.target;

              const newValue =
                answer.substring(0, selectionStart) +
                "\t" +
                answer.substring(selectionEnd);

              updateAnswer(newValue);
              if (textAreaRef.current) {
                textAreaRef.current.value = newValue;
                textAreaRef.current.selectionStart =
                  textAreaRef.current.selectionEnd = selectionStart + 4;
              }
            }
          }}
        />
      </div>
    </Container>
  );
};

export default QuestionExamBox;

// import React from 'react'
//
// class QuestionExamBox extends React.Component {
//     constructor(props) {
//         super(props);
//         this.textAreaRef = React.createRef();
//         this.state = {
//             answer: ""
//         };
//     }
//
//     onChange = event => {
//         this.setState({
//             answer: event.target.value
//         });
//         console.log(event.target.value)
//     };
//
//     onKeyDown = event => {
//         // 'event.key' will return the key as a string: 'Tab'
//         // 'event.keyCode' will return the key code as a number: Tab = '9'
//         // You can use either of them
//         if (event.keyCode === 9) {
//             // Prevent the default action to not lose focus when tab
//             event.preventDefault();
//
//             // Get the cursor position
//             let {selectionStart, selectionEnd} = event.target;
//             // update the state
//             this.setState(
//                 prevState => ({
//                     lyrics:
//                         prevState.answer.substring(0, selectionStart) +
//                         "\t" + // '\t' = tab, size can be change by CSS
//                         prevState.answer.substring(selectionEnd)
//                 }),
//                 // update the cursor position after the state is updated
//                 () => {
//                     this.textAreaRef.input.selectionStart = this.textAreaRef.input.selectionEnd =
//                         selectionStart + 4;
//                 }
//             );
//
//
//         }
//     };
//
//     render() {
//         return (
//             <div className="question-segment">
//                 <div className="question-top">
//                     <h2 className="question-statement">{this.props.quesArray.questionNo}. {this.props.quesArray.questionString}</h2>
//                     <h2 className="points-statement">{this.props.quesArray.points} Points</h2>
//                 </div>
//                 <div className="question-bottom">
//                     <textarea ref={this.textAreaRef}
//                               value={this.state.answer}
//                               name="answer-box"
//                               id="answer-box"
//                               onChange={this.onChange}
//                               onKeyDown={this.onKeyDown}
//                     />
//                 </div>
//             </div>
//         )
//     }
// }
//
// export default QuestionExamBox
//
//
// //
