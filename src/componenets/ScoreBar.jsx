import React from 'react'

const ScoreBar = ({numQuest, currentQuestion, points}) => {
  return (
    <>
        <div className='score-bar'> <div className='score-fill' style={{width: `${points}%`}} ></div> </div>
        <div className='score-bar-info'>   
          <p>Questions {currentQuestion}/{numQuest}</p>
          <p>{points}/100 points</p>
        </div>
    </>
  )
}

export default React.memo(ScoreBar)