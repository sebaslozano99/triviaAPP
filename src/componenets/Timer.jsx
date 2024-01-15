import React, { useEffect } from 'react';



const Timer = ({timer, dispatch}) => {

    const {seconds, minutes} = timer; //seconds = 50 -- minutes = 2

    useEffect(() => {
        const id = setInterval(() => {
            if(seconds > 0){
                dispatch({type: "secondsDown"});
                
                if(seconds < 1){
                    dispatch({type: "minutesDown"});
                }
               
            }
            else if(seconds === 0 && minutes > 0){
                dispatch({type: "secondsUpdate", payload: 59})
            }
            else if(seconds === 0 && minutes === 0) {
                dispatch({type: "finish"});
            }
        }, 1000)

        return () => {
            clearInterval(id);
        }
    }, [seconds, minutes, dispatch])

  return (
    <div className='timer' >
        {minutes < 10 && seconds < 10 && `0${minutes}:0${seconds}`}
        {minutes < 10 && seconds >= 10 && `0${minutes}:${seconds}`}
        {minutes >= 10 && seconds < 10 && `${minutes}:0${seconds}`}
        {minutes >= 10 && seconds >= 10 && `${minutes}:${seconds}`}
    </div>
  )
}

export default Timer