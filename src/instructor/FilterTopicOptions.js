
import React, { useEffect, useState } from "react";
import { Row, Button, Col } from "react-bootstrap";
import FilterDifficultyOptions from "./FilterDifficultyOptions";

const FilterTopicOptions = props => {
  const list = props.questionList;

  const [type, setType] = useState({})

  const [difficulty, setDifficulty] = useState({})
  const [loading, setLoading] = useState(true)

   const sortType = () => {
     let state = {}
     let afterMap = props.allQuestionList.map(obj => {
      let topic = obj.topic.toUpperCase()
      if (!state.hasOwnProperty(topic)) {
        state = {
          ...state,
          [topic] : [obj]
        }
        // setType(type[topic] = [])
        // setType(type[topic].push(obj))
      } else {
        //console.log("came into else")
        let prevArr = state[topic]
        prevArr.push(obj)
        state = {
          ...state,
          [topic] : prevArr
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
    //console.log("Button Clicked for", key, props.difficulty)
    props.updateTopic(key)
    props.updater(key, props.difficulty)
  }



  return(
    <>
        {!loading &&
        (Object.keys(sortType(props.questionList)).map((key, index) =>
            <Col key={key}><button className="btn-lg btn-light" onClick={e => onClickHandler(e, key)}>{key}</button></Col>
          )
        )}
        {loading && <Col><Button className="btn-lg btn-primary" onClick={sortType}>Categorize By Topic</Button></Col>}

    </>
  )
}

export default FilterTopicOptions




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
