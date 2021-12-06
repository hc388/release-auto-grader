import React, {useState, useEffect} from "react";
import {Link, useParams} from "react-router-dom";
import axios from 'axios'
import {Table, Button, Card} from "react-bootstrap";

const DisplayGrades = (props) => {

    const [studentName, setStudentName] = useState([])
    const [examId, setExamId] = useState("")
    const [average, setAverage] = useState()
    const [min, setMin] = useState()
    const [max, setMax] = useState()
    const [scores, setScores] = useState([])
    const [loading, setLoading] = useState(true)
    let {examName} = useParams()

    useEffect(async () => {
            examName = examName.slice(-examName.length + 1)
            setExamId(examName)

            console.log("DISPLAY GRADES USEFFECT KICKED WITH", examName)

            await axios.post("https://beta-0990913.herokuapp.com/api/getGradesByExam.php", JSON.stringify({examName: examName}))
                .then(res => {
                    console.log("Display Grades js says ", res)
                    if (res.data.responseCode === 404)
                        return (<h1>Go back and Try again</h1>)
                    setStudentName(res.data.examGrades.studentNames)
                    setScores(res.data.examGrades.scores)
                })

        await axios.post("https://beta-0990913.herokuapp.com/api/getExamStats.php", JSON.stringify({examName: examName}))
            .then(res => {
                console.log("Getting stats for the exam: ", res)
                setAverage(res.data.statsArr[0])
                setMin(res.data.statsArr[1])
                setMax(res.data.statsArr[2])
            })

            setLoading(false)
        }, []
    )

    return (
        <div className="container-main-exam d-flex align-items-center flex-column">
            <h1 className="exam-header">Results</h1>
            {loading ? <h1>LOADING....</h1> :(
                <React.Fragment>
                <Card className="d-flex flex-row justify-content-around align-items-center mb-3" style={{width: "50%", height:"50px"}}>
                    <span>Average: {Number(average).toFixed(2)}</span>
                    <span>Max Score: {Number(max).toFixed((2))}</span>
                    <span>Min Score: {Number(min).toFixed((2))}</span>
                </Card>
                <Table className="exam-list text-lg-center">
                    {
                        studentName.map((name, index) => (
                            <tr key={index}>
                                <td style={{"font-size": "40px"}}>{name}</td>
                                <td className="exam-list-item" style={{"font-size": "40px"}}>{scores[index]}</td>
                                <td>
                                    <Link to={`/instructor/check-grades/${examId}/${name}`}>
                                        <Button style={{width: "200px"}}>View Scores</Button>
                                    </Link>
                                </td>
                            </tr>
                        ))
                    }
                </Table>
                </React.Fragment>)
            }
        </div>
    )
}

export default DisplayGrades