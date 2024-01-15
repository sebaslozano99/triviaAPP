import React from 'react'

const StartScreen = ({numQuest, dispatch}) => {
  return (
    <div className='startScreen'>
        <h2>Click Start to begin! </h2>
        <p>You have {numQuest} questions to answer!</p>

        <button  onClick={() => dispatch({type: "start"})} >Start</button>
    </div>
  )
}

export default StartScreen