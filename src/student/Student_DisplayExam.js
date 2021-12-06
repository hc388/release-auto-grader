import React from "react";
import axios from "axios";
import QuestionExamBox from "./QuestionExamBox";
import update from "react-addons-update";
import { Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import Row from "react-bootstrap/Row";



class Student_DisplayExam extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questionArray: [],
      answerArray: [],
      submission : false
    };

    this.onAnswering = this.onAnswering.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.submitStatus = false
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.examId !== prevProps.examId) this.componentDidMount();
  }


  async componentDidMount() {
    console.log("Rendering params we get: ", this.props.match)
    console.log("Rendering params we get: ", this.props.studentId)
    const params = { examId: this.props.match.params.examName };
    //console.log(this.props.examId);
    console.log(params);
    await axios
      .post(
        "https://beta-0990913.herokuapp.com/api/getExamById.php",
        JSON.stringify(params)
      )
      .then((res) => {
        console.log(res);
        this.setState({
          questionArray: res.data.studentExamArray,
          answerArray: new Array(res.data.studentExamArray.length),
        });
      });

  }

  onAnswering = (answer, index) => {
    this.setState(
      update(this.state, {
        answerArray: {
          [index]: {
            $set: answer,
          },
        },
      })
    );
  };

  onSubmit = async () => {

    console.log("On Clicking Submit you're sending: ",  JSON.stringify({
            studentExamResponses: {
              examId: this.props.match.params.examName,
              studentId: this.props.studentId,
              responsesArr: this.state.answerArray,
            },
          }))
    const res = await axios
      .post(
        "https://beta-0990913.herokuapp.com/api/submitExam.php",
        JSON.stringify({
          studentExamResponses: {
            examId: this.props.match.params.examName,
            studentId: this.props.studentId,
            responsesArr: this.state.answerArray,
          },
        })
      )
      .then((data) => console.log(data));
    alert("Your Submission was successfully received!")

    this.setState({submission : true})
    window.setTimeout(() => {
      this.props.history.replace('/student');
    }, 1000)
  };

  render() {
    return (
      <div className="container-main-exam d-flex align-items-center flex-column">
        <div className="exam-header"> Exam {this.props.match.params.examName}</div>
        {this.state.questionArray.map((obj, index) => (
          <QuestionExamBox
            quesArray={obj}
            qNo={index}
            key={index}
            onChange={this.onAnswering}
          />
        ))}

        <Button className="btn-lg submit-exam-button mb-5" style={{ width: "350px", height: "70px", fontSize:"30px" }} onClick={this.onSubmit}>
          Submit Exam
        </Button>
        {this.state.submission && <Row className="exam-submit-success mb-5">Exam was successfully submitted.</Row>}
      </div>
    );
  }
}

export default withRouter(Student_DisplayExam);
