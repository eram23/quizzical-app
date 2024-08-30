import { decode } from 'html-entities';
import React from 'react'
import { useState, useEffect } from 'react'





export default function Answers(props) {
    
    
    // maps over answers data and returns a Button component for each answer choice
    const answerOptions = props.answers.map((answer, index) => {
        return (
            <Button
            key={props.key} 
            index={props.index}
            answer={answer} 
            trackAnswer={props.trackAnswer}
            quizData={props.quizData}
            userAnswers={props.userAnswers}
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

    function toggleSelectedAnswer(index, eventTarget) {
        console.log(eventTarget, props.userAnswers[index])
        
        setAnswerSelected(prevValue => !prevValue)
        // if (props.userAnswers[index] !== eventTarget.innerText) {
        //     setAnswerSelected(false)

        // } 
    }

    const styleSelected = {
        border: answerSelected ? '3px solid #6CA7FF' : 'none'
        // border: '2px solid #6CA7FF' 
    }
    
    
    return (
            <button 
                type='button'
                key={props.key}
                onClick={(e) => {
                    props.trackAnswer(props.index, e.target.innerText)
                    toggleSelectedAnswer(props.index, e.target)
                }} 
                style={styleSelected}
                userAnswers={props.userAnswers}
                >
                {decode(props.answer)}
            </button>
        )
}
