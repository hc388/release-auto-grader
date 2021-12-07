import React from "react";


const  StudentResultTable = ({ index, tests, expected, actual, points, total }) => {

    const styleRed = {
        backgroundColor: "Red",
        fontWeight: 900
    }

    const styleGreen = {
        backgroundColor: "lightgreen",
        fontWeight: 900
    }
  return(
      <tr>
        <th>{tests[index]}</th>
        {expected[index] === true && <td>True</td>}
        {expected[index] === false && <td>False</td>}
        {expected[index] !== true && expected[index] !== false && <td>{expected[index]}</td>}
        {actual[index] === true && <td>True</td>}
        {actual[index] === false && <td>False</td>}
        {actual[index] !== true && actual[index] !== false && <td>{actual[index]}</td>}
          <th>{Number(total[index]).toFixed(2)}</th>
          {
              total[index] === points[index] ?
                  <td style={styleGreen} className="text-center align-middle">{(Math.round(points[index] * 100) / 100).toFixed(2)}</td> :
                  <td style={styleRed} className="text-center align-middle">{(Math.round(points[index] * 100) / 100).toFixed(2)}</td>
          }


      </tr>


  )
}

export default StudentResultTable