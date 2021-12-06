import React, { useEffect, useState } from "react";
import {Table} from 'react-bootstrap'

const  ResultTable = ({ index, tests, expected, actual, points, total, updater, resetInput, setResetInput }) => {
  const [inputValue, setInputValue] = useState(null)

  const [overflowFlag, setOverflowFlag] = useState(false)
  useEffect(() => {
     setInputValue(null)
    setOverflowFlag(false)
  }, [])

  const changeInputValue = (e) => {
    if(e.target.value > total[index]) {
      updater(index, total[index])
      setInputValue(total[index])

    }
    else {
      setInputValue(e.target.value)
      updater(index, e.target.value)
    }
  }
  //console.log( index, tests, expected, actual, points, total);
  // (Math.round(num * 100) / 100).toFixed(2);
  return(
    <React.Fragment>
      <tr>
        <th scope="row" >{tests[index]}</th>
         {expected[index] === true && <td>True</td>}
         {expected[index] === false && <td>False</td>}
         {expected[index] !== true && expected[index] !== false && <td>{expected[index]}</td>}
         {actual[index] === true && <td>True</td>}
         {actual[index] === false && <td>False</td>}
         {actual[index] !== true && actual[index] !== false && <td>{actual[index]}</td>}
        <td className="text-center align-middle">{(Math.round(points[index] * 100) / 100).toFixed(2)}</td>
        <td>{(Math.round(total[index] * 100) / 100).toFixed(2)}</td>
        <td><input style={{height:"80px", width:"80%", fontSize: "30px", textAlign: "center"}} value={inputValue} min={0} max={total[index]}   onChange={e=>changeInputValue(e)}/></td>
      </tr>
      {overflowFlag && <p>Input value must not exceed Max points</p> }
    </React.Fragment>



  )
}

export default ResultTable

// {expected[index] === true && <td>true</td>}
// {expected[index] === false && <td>False</td>}
// {expected[index] !== true && expected[index] !== false && <td>{expected[index]}</td>}
// {actual[index] === true && <td>true</td>}
// {actual[index] === false && <td>False</td>}
// {actual[index] !== true && actual[index] !== false && <td>{actual[index]}</td>}