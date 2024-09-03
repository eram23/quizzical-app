import { decode } from 'html-entities'
import { nanoid } from 'nanoid';
import React from 'react'
import { useState, useEffect } from 'react'
import classNames from 'classnames'





export default function Answers(props) {
    
    const [answerSelected, setAnswerSelected] = useState(false)

    function toggleSelectedAnswer(index, eventTarget) {
        console.log(props.userAnswers, props.quizData)

        setAnswerSelected(true)
    }
    
    // maps over answers data and returns a Button component for each answer choice
    const answerOptions = props.answers.map((answer, index) => {
        return (
            <Button
            index={props.index}
            answer={answer} 
            trackAnswer={props.trackAnswer}
            toggleSelectedAnswer={toggleSelectedAnswer}
            quizData={props.quizData}
            userAnswers={props.userAnswers}
            answerSelected={answerSelected}
            results={props.results}
            />
        )
    })
    
    return (
        <div className='btn-container'>
            {answerOptions}
        </div>
    )
}

function Button({index, userAnswers, answerSelected, answer, quizData, results, trackAnswer, toggleSelectedAnswer }) {
    
    const styleSelected = {
        outline: answerSelected && userAnswers[index]  === decode(answer) ? '3px solid #6CA7FF' : null
    }
    
    const btnClasses = classNames({
        button: true,
        'correct': answerSelected && results && userAnswers[index]  === decode(answer) && userAnswers[index] === quizData[index].correct_answer,
        'incorrect': answerSelected && results && userAnswers[index]  === decode(answer) && userAnswers[index] !== quizData[index].correct_answer,
        'correct-not-picked': results && quizData[index].correct_answer !== userAnswers[index] && quizData[index].correct_answer === answer,
    })
    // 'correct-not-picked': results && userAnswers[index]  === answer && quizData[index].incorrect_answers.includes(userAnswers[index])
    
    return (
            <button 
                type='button'
                index={index}
                id={nanoid()}
                onClick={(e) => {
                    trackAnswer(index, e.target.innerText)
                    toggleSelectedAnswer()
                }} 
                style={styleSelected}
                className={btnClasses}
                // answerSelected={answerSelected}
                >
                {decode(answer)}
            </button>
        )
}
