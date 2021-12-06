import React from "react";


const  StudentResultTable = ({ index, tests, expected, actual, points, total }) => {
  return(
      <tr>
        <th>{tests[index]}</th>
        {expected[index] === true && <td>True</td>}
        {expected[index] === false && <td>False</td>}
        {expected[index] !== true && expected[index] !== false && <td>{expected[index]}</td>}
        {actual[index] === true && <td>True</td>}
        {actual[index] === false && <td>False</td>}
        {actual[index] !== true && actual[index] !== false && <td>{actual[index]}</td>}
          <th>{total[index]}</th>
        <th style={{backgroundColor: "lightgreen", fontWeight:900}}>{points[index]}</th>


      </tr>


  )
}

export default StudentResultTable