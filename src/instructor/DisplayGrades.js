import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from 'axios'
import {Table, Button} from "react-bootstrap";

const DisplayGrades = (props) => {

  const [studentName, setStudentName] = useState([])
  const [examId, setExamId] = useState("")
  const [scores, setScores] = useState([])
  const [loading, setLoading] = useState(true)
  let {examName} = useParams()

  useEffect( async () => {
    examName = examName.slice(-examName.length + 1)
    setExamId(examName)

    console.log("DISPLAY GRADES USEFFECT KICKED WITH", examName)

      await axios.post("https://beta-0990913.herokuapp.com/api/getGradesByExam.php", JSON.stringify({examName: examName}))
        .then(res => {
          console.log("Display Grades js says ", res)
          if(res.data.responseCode === 404)
            return (<h1>Go back and Try again</h1>)
          setStudentName(res.data.examGrades.studentNames)
          setScores(res.data.examGrades.scores)
        })
    setLoading(false)
    },[]

  )

  return(
    <div className="container-main-exam">
      <h1 className="exam-header">Results</h1>
      {loading ? <h1>LOADING....</h1> :
        <Table className="exam-list text-lg-center">
          {
            studentName.map((name, index) => (
              <tr key={index}>
                <td style={{"font-size":"40px"}}>{name}</td >
                <td className="exam-list-item">{scores[index]}</td>
                <td>
                <Link to={`/instructor/check-grades/${examId}/${name}`}>
                <Button style={{width: "200px"}}>View Scores</Button>
                </Link>
                </td>
              </tr>
            ))
          }
        </Table>
      }
    </div>
  )
}

export default DisplayGrades