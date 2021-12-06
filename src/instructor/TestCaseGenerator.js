import React, { useState, useEffect } from "react";
import {Button} from "react-bootstrap";

const TestCaseGenerator = (props) => {
  const [inputList, setInputList] = useState([{}]);

  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([...inputList, { firstName: "", lastName: "" }]);
  };

  const onClickSubmit = () => {
    let tempObj = {};
    for (let property of inputList) {
      let first = "";
      let second = "";
      let counter = 0;
      for (let newProp in property) {
        if (counter === 0) first = property[newProp];
        else second = property[newProp];
        counter += 1;
        console.log(newProp);
      }
      console.log({ [first]: second });
      tempObj = {
        ...tempObj,
        [first]: second
      };
    }
    console.log("Finally: ", tempObj);
    props.updateTestCase(tempObj)
  };

  return (
    <React.Fragment>
      {inputList.map((x, i) => {
        return (
          <span className="testcase d-flex">
            <div className="col-md-9 testcaseboxes">
              TestCase #{i + 1}
              <input
                className="first-input"
                name="firstName"
                placeholder="Input"
                value={x.firstName}
                onChange={(e) => handleInputChange(e, i)}
              />
              <input
                className="second-input"
                name="lastName"
                placeholder="Output"
                value={x.lastName}
                onChange={(e) => handleInputChange(e, i)}
              />
            </div>

            <div className="btn-box col-md-2">
              {inputList.length !== 1 && (
                <button className="mr10" onClick={() => handleRemoveClick(i)}>
                  Remove
                </button>
              )}
              {inputList.length - 1 === i && (
                <button onClick={handleAddClick}>Add</button>
              )}
            </div>
          </span>
        );
      })}
      <Button className="btn btn-secondary" onClick={onClickSubmit} style={{width:"300px", fontSize:"30px"}}>Attatch Testcases</Button>
    </React.Fragment>
  );
};
export default TestCaseGenerator;
