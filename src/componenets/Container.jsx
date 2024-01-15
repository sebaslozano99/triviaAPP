import Loading from "./Loading";
import ReUsableBtn from "./ReUsableBtn";
import ScoreBar from "./ScoreBar";
import React from "react";
import Choices from "./Choices";


const Container = ({dataFromApi, index, status, answer, points, dispatch, children}) => {

  const answerPicked = answer !== null;
  const numQuest = dataFromApi?.length;
  const currentQuestion = index + 1;


  return (
    <>
      {
        status === "loading" ?
        <Loading />
        :
        <div className="container">

          <ScoreBar numQuest={numQuest} currentQuestion={currentQuestion} points={points}  />

          <h3>{dataFromApi[index]?.question.text}</h3>

          <Choices dataFromApi={dataFromApi} index={index} answer={answer} answerPicked={answerPicked}  dispatch={dispatch} />

            <div className="next-btn-container">
          
              {children} {/*  timer component  */}

              <div>
                {
                  answerPicked && index < 9 && 
                  <ReUsableBtn className="btn-next" width={5} dispatch={dispatch} /> 
                }

                {
                  answerPicked && index === 9 &&
                  <ReUsableBtn className="btn-next" text="Finish" dispatchType="finish" dispatch={dispatch} width={5} />
                }
              </div>
            </div>    
        </div>
      }
    </>
  )
}

export default Container