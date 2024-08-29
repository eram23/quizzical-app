import { decode } from 'html-entities';
import React from 'react'
import { useState, useEffect } from 'react'





export default function Answers(props) {
    
    // maps over answers data and returns a Button component for each answer choice
    const answerOptions = props.answers.map((answer, index) => {
        return (
            <Button
            key={index} 
            answer={answer} 
            handleClick={props.handleClick}
            isSelected={props.isSelected}
            />
        )
    })
    
    return (
        <div className='btn-container'>
            {answerOptions}
        </div>
    )
}

function Button(props) {
    const [answerSelected, setAnswerSelected] = useState(false)


    const styleSelected = {
        // border: props.isSelected ? '3px solid #6CA7FF' : 'none'
        // border: '3px solid #6CA7FF' 
    }
    
    //  if (userAnswers[index] === answer) {
    //     setAnswerSelected(true)
    //   }

    return (
            <button 
                type='button'
                key={props.index}
                onClick={props.handleClick}
                style={styleSelected}
                >
                {decode(props.answer)}
            </button>
        )
}