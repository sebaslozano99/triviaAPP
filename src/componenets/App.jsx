import {  useEffect, useReducer } from "react";
import Logo from "./Logo";
import Container from "./Container";
import Error from "./Error";
import StartScreen from "./StartScreen";
import FinishedScreen from "./FinishedScreen";
import Timer from "./Timer";


const initialState = {
  status: "loading",
  dataFromApi: [],
  index: 0,
  start: false,
  answer: null,
  points: 0,
  finished: false,
  highScore: JSON.parse(localStorage.getItem("highScore")) ?? 0,
  timer: {
    seconds: 25,
    minutes: 2,
  }
}


function reducerFunction(state, action){
  switch(action.type){
    
    case "start":
      return{
        ...state,
        start: true,
      }

    case "received":
      return {
        ...state,
        status: "received",
        dataFromApi: action.payload,
      }
    
    case "error":
      return{
        ...state,
        status: "error",
      }
    
    case "answerPicked":
      return{
        ...state,
        answer: action.payload,
        points: action.payload === state.dataFromApi[state.index].correctAnswer ? state.points + 10 : state.points,
      }

    case "nextQuestion":
      return {
        ...state,
        index: state.index < 9 ? state.index + 1 : state.index,
        answer: null,
      }
    
      case "finish":
        return{
          ...state,
          finished: !state.finished,
          highScore: state.points > state.highScore ? state.points : state.highScore,
        }
      
      case "restart":
        return {
          ...state,
          finished: !state.finished,
          index: 0,
          answer: null,
          points: 0,
          timer: {
            seconds: 25,
            minutes: 2,
          }
        }
      
      case "secondsDown":
        return {
          ...state,
          timer: {
            ...state.timer,
            seconds: state.timer.seconds - 1,
          }
        }
      
      case "secondsUpdate":
        return {
          ...state,
          timer: {
            seconds: action.payload,
            minutes: state.timer.minutes > 0 ? state.timer.minutes - 1 : state.timer.minutes ,
          }
        }
      
    default:
      console.log("Error");
  }
}


function App() {

  const [{dataFromApi, status, index, start, answer, points, finished, highScore, timer} , dispatch] = useReducer(reducerFunction, initialState);
  const numQuest = dataFromApi.length;


  useEffect(() => {
    async function fetchingData(){
      try{
        const res = await fetch(`https://the-trivia-api.com/v2/questions/`);
        const data = await res.json();
        dispatch({type: "received", payload: data})
      }
      catch(error){
        console.log(error);
        dispatch({type:"error"});
      }
    }
    fetchingData();
  }, [finished])



  useEffect(() => {
    localStorage.setItem("highScore", JSON.stringify(highScore))
  }, [highScore])

  
  
  return (
    <div className="app">

      <Logo />

      {!start && status !== "error" && <StartScreen numQuest={numQuest} dispatch={dispatch} />}

      {status !== "error" && start && !finished &&
      <>
        <Container dataFromApi={dataFromApi} index={index} status={status} dispatch={dispatch} answer={answer} points={points} timer={timer}  >
          <Timer timer={timer} dispatch={dispatch} />
        </Container>
      </>
      }

      {status === "error" && <Error />}

      {finished && <FinishedScreen points={points} dispatch={dispatch} highScore={highScore} /> } 
    </div>
  );
}

export default App;
