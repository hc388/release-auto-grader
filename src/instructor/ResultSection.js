import React, { useEffect, useState } from "react";
import ResultTable from "./ResultTable";
import { Row, Button, Table } from "react-bootstrap";

const ResultSection = (props) => {

  //console.log(props.gradeobj.gradingObj);

  const [testCaseHeader, setTestCaseHeader] = useState([]);
  const [expectedResult, setExpectedResult] = useState([]);
  const [actualResult, setActualResult] = useState([]);
  const [pointScored, setPointScored] = useState([]);
  const [totalPoints, setTotalPoints] = useState([]);
  const [originalObj, setOriginalObj] = useState({})
  const [loading, setLoading] = useState(true);
  const [scoreObj, setScoreObj] = useState({});
  const [comment, setComment] = useState("");
  const [newTotal, setNewTotal] = useState(0);
  const [overFlow, setOverFlow] = useState(false);
  const [resetInput, setResetInput] = useState(true);


  useEffect(() => {
    (async () => {
        console.log("GradeObj looks likeL ", props.gradeobj)
        setOriginalObj(props.gradeobj.gradingObj)
        setScoreObj(props.gradeobj.gradingObj)
        setComment(props.gradeobj.comments)

        await desginArray();
        setLoading(false);
        assignToOriginal();
        //printValues();
      }
    )();


  }, [props.gradeobj]);


  const assignToOriginal = async () => {
    let tempObj = {}
    for(let property in props.gradeobj.gradingObj){
      tempObj = {
        ...tempObj,
        [property] : parseFloat(props.gradeobj.gradingObj[property][2])
      }
    }
    setOriginalObj(tempObj)
    setScoreObj(tempObj)
  }

  const updateScore = async (index, val) => {
    if (overFlow)
      setOverFlow(false);
    let tempObj = scoreObj
    if(isNaN(val)) {
      val = pointScored[index]
      console.log("Since I found a NAN I'm changing it to", val)
    }
    tempObj = {
      ...tempObj,
      [testCaseHeader[index]]: parseFloat(val)
    }
    console.log("After updating the object looks lke: ", tempObj)
    setScoreObj(tempObj)
  };

  const commentUpdater = async (e, index) => {
    await setComment(oldState => (
      {
        [index]: e.target.value
      }
    ));
  };

  const beforeSubmitting = () => {
    let tempObj = {};

  };

  const onCommentButtonClickHandler = async () => {
    let temp = 0;
    for (let value in scoreObj) {
      //console.log(Number(scoreObj[value]));
      temp += parseFloat(scoreObj[value]);
    }
    temp = temp.toFixed(2)
    console.log(temp);
    console.log(props.quesArray.points)
    if (parseFloat(temp) > parseFloat(props.quesArray.points)) {
      console.log("Triggering overflow")
      setOverFlow(true);
    }
    else {
      await setNewTotal(temp);
      console.log("when you clicked save: ", scoreObj);
      let tempArr = pointScored;
      //await setPointScored([])
      let counter = 0;
      console.log("scoreObj receiced", scoreObj);
      console.log("Points object is", pointScored)
      console.log("Original Object is: ", originalObj)
      for(const property in scoreObj) {
        if(scoreObj[property] !== "" || !isNaN(scoreObj[property]))
          setPointScored(oldArray => [...oldArray, scoreObj[property]]);
        else {
          console.log("Property is either empty or NAN")
          scoreObj[property] = originalObj[property]
          setPointScored(oldArray => [...oldArray, tempArr[counter]])
        }
        counter += 1
      }
      console.log("Right before calling grades by student data looks like: ", scoreObj);
      props.onSaving(props.index, temp, scoreObj, comment);
    }
    //console.log(scoreObj, comment)
  };
  const onClickCancel = () => {
    console.log("You clicked cancel");
    setResetInput(true);
    setPointScored([]);
    let index = 0;
    for (const property in props.gradeobj.gradingObj) {
      setPointScored(oldArray => [...oldArray, props.gradeobj.gradingObj[property][2]]);
      setScoreObj({});
    }
    props.onDeleting(props.index);

  };

  const printValues = () => {
    console.log(testCaseHeader, expectedResult, actualResult, pointScored, totalPoints);
  };

  const desginArray = () => {
    for (const property in props.gradeobj.gradingObj) {
      setTestCaseHeader(oldArray => [...oldArray, property]);
      setExpectedResult(oldArray => [...oldArray, props.gradeobj.gradingObj[property][0]]);
      setActualResult(oldArray => [...oldArray, props.gradeobj.gradingObj[property][1]]);
      setPointScored(oldArray => [...oldArray, props.gradeobj.gradingObj[property][2]]);
      setTotalPoints(oldArray => [...oldArray, props.gradeobj.gradingObj[property][3]]);
    }
  };

  return (<React.Fragment>
      <Table striped bordered hover size="lg"
             className="text-center align-middle table table-hover table-fixed result-table">
        <thead>
        <tr>
          <th scope="col">TestCase</th>
          <th scope="col">Expected</th>
          <th scope="col">Run</th>
          <th scope="col">Points</th>
          <th scope="col">Max</th>
          <th scope="col">Update</th>
        </tr>
        </thead>
        <tbody>
        {testCaseHeader.map((obj, index) => {
          return <ResultTable index={index} tests={testCaseHeader} expected={expectedResult} actual={actualResult}
                              points={pointScored} total={totalPoints} updater={updateScore} key={index}
                              resetInput={resetInput} setResetInput={setResetInput}/>;
        })}
        </tbody>
      </Table>
      <Row className="d-flex align-items-baseline justify-content-between col-md-12">
        <input placeholder="Add Comments here..." className="result-comment-section col-md-7"
               defaultValue={props.gradeobj.comments} onChange={e => setComment(e.target.value)}/>
        <span className="col-sm-5">
        <Button className="btn-lg h-75 mx-2 col-md-5" onClick={onCommentButtonClickHandler}>Save</Button>
        <Button className="btn-lg h-75 btn-danger col-md-5" onClick={onClickCancel}>Cancel</Button>
          {overFlow && <p>Total points should not exceed {props.quesArray.points}</p>}
        </span>
      </Row>
    </React.Fragment>
  );
};

export default ResultSection;