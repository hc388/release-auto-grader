import React, {useState} from "react";
import {Button, Card, ListGroup} from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";



const ExamCard = ({name}) => {

    const [graded, isGraded] = useState(false)
    const [released, isReleased] = useState(false)

    const autoGrade = async () => {
        console.log("Data being sent for autoGrade: ", JSON.stringify(
            {examName: name}
        ));
        await axios
            .post(
                "https://beta-0990913.herokuapp.com/api/autoGradeByExamRC.php",
                JSON.stringify({examName: name})
            )
            .then((res) => {
                console.log(res);
            });
        isGraded(true)
    };

    const gradeReleaseHandler = async () => {
        await axios.post(
            "https://beta-0990913.herokuapp.com/api/releaseGradesForExam.php",
            JSON.stringify({examName: name})
        );
        isReleased(true)
    };

    return (
        <Card className="newExamCard">
            <Card.Header>{name}</Card.Header>
            <ListGroup variant="flush">
                <ListGroup.Item><Button className="btn-secondary"
                                        onClick={autoGrade}>AutoGrade</Button></ListGroup.Item>
                <ListGroup.Item><Button className="btn-secondary" onClick={gradeReleaseHandler}>Release Grade</Button></ListGroup.Item>
                <ListGroup.Item>
                    <Link to={`/instructor/check-grades/:${name}`}>
                    <Button className="btn-secondary" >View Scores</Button>
                    </Link>
                </ListGroup.Item>
                {graded && <ListGroup.Item>Exam Graded</ListGroup.Item>}
                {released &&<ListGroup.Item>Scores Released</ListGroup.Item>}
            </ListGroup>
        </Card>
    )
}

export default ExamCard