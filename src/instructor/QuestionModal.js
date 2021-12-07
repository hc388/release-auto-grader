import React, {useEffect, useState} from "react";
import {Table, Button} from "react-bootstrap"
import Modal from "react-modal"
import { destringify, restringify } from 'json-destringify';


const QuestionModal = ({obj, allData, qid, addButton, onButtonClick}) => {
    const [quesObj, setQuesObj] = useState({})
    const [loading, setLoading] = useState(true)
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        setLoading(true)
        const filteredData = allData.filter(obj => obj.qid === qid)
        setQuesObj(filteredData[0])
        setLoading(false)
    }, [])

    function openModal() {
        setIsOpen(!isOpen)
    }

    return (
        <div className="question-modal">
            <tr className="col-md-12" style={{"width": "100%"}}>
                <td className="list-section col-md-12" onClick={openModal}>
                    <li className="list-item col-md-12">{obj.questionString}
                        <span className="list-item-detail">
                    <span>Function: {obj.topic}</span>
                    <span>Difficulty: {obj.difficulty}</span>
                  </span>

                    </li>
                </td>
                <td>
                {addButton === 1 && <button className="add-ques-button btn-light mt-1" onClick={(e) => onButtonClick(e, obj.qid)}>Add</button>}
                </td>
                </tr>
            {/*<Button class="btn btn-light" onClick={openModal}>see details</Button>*/}
            <Modal
                className="custom_modal"
                overlayClassName="custom_overlay"
                onRequestClose={openModal}
                contentLabel="Tiny nomadic modal popover"
                isOpen={isOpen}>
                <div>
                    {loading ? <h1>LOADING...</h1> : (
                        <div>
                            {quesObj.questionString}
                            <Table style={{width:"300px", maxWidth:"500px"}}>
                                <thead>
                                <tr>
                                    <th>Test</th>
                                    <th>Value</th>
                                </tr>
                                </thead>
                                <tbody>
                                {Object.keys(destringify(quesObj.testCases).result).map( (key, index) =>
                                    <tr>
                                        <td>{key}</td>
                                        <td>{destringify(quesObj.testCases).result[key]}</td>
                                    </tr>
                                )}

                                </tbody>
                            </Table>

                        </div>


                    )}
                </div>
                <button onClick={openModal}>Close</button>
            </Modal>
            {/*<Modal>*/}
            {/*{loading ? <h1>LOADING...</h1>:*/}
            {/*    quesObj.questionString*/}
            {/*}*/}
            {/*<Button onClick={close}>Close</Button>*/}
            {/*</Modal>*/}
        </div>

    )
}

export default QuestionModal