import React, {useEffect, useState} from "react";
import {Table, Button} from "react-bootstrap"
import Modal from "react-modal"
import { destringify, restringify } from 'json-destringify';


const QuestionModal = ({allData, qid, close}) => {
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
            <Button class="col-md-3 btn-light" onClick={openModal}>see details</Button>
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