
import React, { useEffect, useState } from "react";
import { Row, Button, Col } from "react-bootstrap";

const FilterDifficultyOptions = props => {
  const list = props.questionList;

  const [type, setType] = useState({})

  const [difficulty, setDifficulty] = useState({})
  const [loading, setLoading] = useState(true)

  const sortDiffi = () => {
    let state = {}
    let afterMap = props.allQuestionList.map(obj => {
      let diff = obj.difficulty.toUpperCase()
      if (!state.hasOwnProperty(difficulty)) {
        state = {
          ...state,
          [diff] : [obj]
        }
        // setType(type[topic] = [])
        // setType(type[topic].push(obj))
      } else {
        //console.log("came into else")
        let prevArr = state[diff]
        prevArr.push(obj)
        state = {
          ...state,
          [diff] : prevArr
        }
        // setType(type[topic] = prevArr)
      }

    })
    //console.log(state)

    if(loading)
      setLoading(false)
    return state
  }

  // useEffect( async () => {
  //   setLoading(true)
  //   await sortType()
  //   let newArr = Object.keys(type).map((key) => key)
  //   console.log("Newarr is ", newArr)
  //   console.log(type)
  //   setLoading(false)
  //
  // }, [props.questionList])

  const onClickHandler = (e, key ) => {
    console.log("Button Clicked")
    props.updater("difficulty", key)
  }

  return(
    <>

        {!loading &&
        (Object.keys(sortDiffi(props.allQuestionList)).map((key, index) =>
            <Col><button className="btn-lg btn-light" onClick={e => onClickHandler(e, key)}>{key}</button></Col>
          )
        )}

        {loading && <Col><Button className="btn-lg btn-primary" onClick={sortDiffi}>Categorize By Difficulty</Button></Col>}


    </>
  )
}

export default FilterDifficultyOptions




// import React from 'react'
//
// class FilterOptions extends React.Component{
//   constructor(props) {
//     super(props);
//     this.state = {
//       loading: true,
//       type: {}
//     }
//     this.sortType = this.sortType.bind(this)
//   }
//
//   sortType = async () => {
//     console.log(this.props.questionList)
//      this.props.questionList.map(obj => {
//       let topic = obj.topic.toUpperCase()
//        console.log(this.state.type)
//       if (!this.state.type.topic) {
//         console.log(topic)
//         this.setState(prevState => ({
//           type:{
//             ...prevState.type,
//             [topic] : new Array(obj)
//           }
//         }), () => console.log("Callback", this.state.type))
//         console.log(this.state)
//       }
//       else{
//         console.log("Came into else")
//         let prevArr = this.state.type.topic;
//         console.log("Before pushing, ", prevArr)
//         prevArr.push(obj)
//         console.log("prebArr is :", prevArr)
//         this.setState(prevState => ({
//           type: {
//             ...prevState.type,
//             [topic] : prevArr
//           }
//         }))
//       }
//        //console.log(this.state)
//     })
//
//   }
//
//    componentDidMount() {
//     this.sortType()
//     this.setState({loading : false})
//
//   }
//
//   render() {
//     ! this.state.loading && console.log(this.state)
//     return(
//       ""
//     )
//   }
// }
//
// export default FilterOptions
