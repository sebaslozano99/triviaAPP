import React, { useEffect, useRef, useState } from 'react';


    // const initialState = {
    //     state: "active",
    //     seconds: 0,
    //     minutes: 0,
    // }

    // function clockFunc(state, action){
    //     switch(action.type){
    //         case "active":
    //             return {
    //                 ...state,
    //                 seconds: state.seconds + 1,
    //             }

            

    //         default:
    //             return{
    //                 state: "active",
    //                 seconds: 0,
    //                 minutes: 0,
    //             }
    //     }
    // }
    const btnStyle = {
        padding: "5px 10px",
        outlineStyle: "none",
        borderStyle: "none",
        cursor: "pointer",
        borderRadius: "5px",
        display: "block",
        marginTop: "10px",
    }

const TimerTest = () => {
    const [seconds, setSeconds] = useState(50);
    const [minutes, setMinutes] = useState(59);
    const [start, setStart] = useState(false);
    const id = useRef(null);

    useEffect(() => {

        if(start){
            id.current = setInterval(() => {
                if(seconds < 60){
                    setSeconds(seconds => seconds + 1);
                
                    if(seconds === 59){
                        setMinutes(minutes => minutes + 1);
                    }
                    if(minutes === 59 && seconds === 59){
                        setMinutes(0);
                    }
                }
                if(seconds === 59){
                    setSeconds(0);
                }
            }, 10)
        }


        return () => {
            clearInterval(id.current);
        }
    },[seconds, minutes, start])

  return (
    <div>
        {minutes < 10 && seconds < 10 && `0${minutes}:0${seconds}`} 
        {minutes < 10 && seconds >= 10 && `0${minutes}:${seconds}`} 
        {minutes >= 10 && seconds < 10 && `${minutes}:0${seconds}`}
        {minutes >= 10 && seconds >= 10 && `${minutes}:${seconds}`}

        <button style={btnStyle} onClick={() => setStart(!start) } >{start ? "pause" : "start"}</button>
    </div>
  )
}

export default TimerTest