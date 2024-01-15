// import {  useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import React, { useEffect, useState } from 'react';


const Choices = ({dataFromApi, index, answer, answerPicked, dispatch}) => {

    function shuffleArray(array){
        for(let i = 0; i < array.length; i++){
            const randomIndex = Math.floor(Math.random() * array.length);
            const index = array[i];
        
            array[i] = array[randomIndex];
            array[randomIndex] = index;
        }

        return array;
    }

    // const arrayAnswers = shuffleArray([...dataFromApi[index]?.incorrectAnswers ?? "hello", dataFromApi[index]?.correctAnswer]);  //used nulish coalescing operator to handle that in the meantime I spread the values from array taken from incorrectAnswers is a falsy value, it'll spread the work "hello" instead of error

    const [shuffledArray, setShuffledArray] = useState( shuffleArray([...dataFromApi[index]?.incorrectAnswers ?? "hello", dataFromApi[index]?.correctAnswer])); //we use useState, because with the const "arrayAnswers" above, every time we picked a new answer, that changed the state of "answer", and considering we have it as a prop, that re-rendered this component, making to shuffle the answers again after use had picked the answer already. hooks does not change thorugh re-renders

    useEffect(() => {
        setShuffledArray(shuffleArray([...dataFromApi[index]?.incorrectAnswers ?? "hello", dataFromApi[index]?.correctAnswer]));
    },[index, dataFromApi])
    //with useEffect we make sure that every time "index" or "dataFromApi" changes, it runs again the shuffle the new array in the current position.

  return (
    <div className='choices'>
        {
        shuffledArray.map(element => 

            <button 
                disabled={answerPicked} 
                key={uuidv4()} 
                onClick={() => dispatch({type: "answerPicked", payload: element})}
                className={`btn ${answerPicked && element === dataFromApi[index]?.correctAnswer ? "correct" : ""} ${answerPicked && element !== dataFromApi[index]?.correctAnswer ? "wrong" : ""} ${answerPicked && element === answer ? "selected" : ""}`}
            >{element}</button>)
               
        }
    </div>
  )
}

export default React.memo(Choices);