import React from 'react'

const FinishedScreen = ({points, highScore, dispatch}) => {

  const percentage = points * 100 / 100;

  return (
    <div className='finish-screen'>
      <p>You have scored {points} points out of 100. ({percentage}%)</p>
      <p>Your highscore is: {highScore} </p>
      <button className='restart' onClick={() => dispatch({type: "restart"})}>Restart</button>
    </div>
  )
}

export default FinishedScreen