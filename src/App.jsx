import { useState, useEffect } from 'react'
import './App.css'
import StartQuiz from './StartQuiz'
import { decode } from 'html-entities';
import React from 'react'

function App() {
  const [startQuiz, setStartQuiz] = useState(false) 
  const [quizData, setQuizData] = useState([])
  
  // this useEffect gets the data from the API and stores in the quizzicalData state
  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5&category=10&type=multiple")
      .then(res => res.json())
      .then(data => setQuizData(data.results.map(quizObj => {
        return {
          question: quizObj.question,
          correct_answer: quizObj.correct_answer,
          incorrect_answers: [...quizObj.incorrect_answers],
          selected_answer: ""
        }
      })))
  }, [])
  
console.log(quizData)

  // this function is used to toggle whether the quiz has started or not
  function toggleStartQuiz() {
    setStartQuiz(true)
  }

  function shuffleAnswers(correctAnswer, incorrectAnswers) {
    // puts the incorrect and correct answers into one array
    const allAnswers = [correctAnswer, ...incorrectAnswers]

    // Shuffle the combined array using Fisher-Yates algorithm
    for (let i = allAnswers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [allAnswers[i], allAnswers[j]] = [allAnswers[j], allAnswers[i]];
    }

    return(allAnswers)
  }

  // returns only the question and array of answers for the quizData
  const shuffledAnswers = quizData.map(quizItem => {
    const shuffledAnswers = shuffleAnswers(quizItem.correct_answer, quizItem.incorrect_answers);
    return {
      answers: shuffledAnswers
    };
  });
  
  function selectedAnswer(event) {
    const {name, value, type, checked} = event.target
    setQuizData(prevData => {
      return {
        ...prevData,
        [selected_answer]: type === "checkbox" ? checked : value
      }
    })
  }


  return (
    <>
      {/* conditionally renders the start page or the quizzical form  */}
      {startQuiz === true ? 
        <form className='quiz-form'>
          {/* question 0 */}
          <label>{decode(quizData[0].question)}</label><br />
            <input
            type='radio'
            value={shuffledAnswers[0].answers[0]}
            name="answer-set-0"
            checked={quizData.selected_answer === shuffledAnswers[0].answers[0]}
            onClick={selectedAnswer}
            />
            <label htmlFor={shuffledAnswers[0].answers[0]}>{decode(shuffledAnswers[0].answers[0])}</label> <br />
            <input
            type='radio'
            value={shuffledAnswers[0].answers[1]}
            name="answer-set-0"
            checked={quizData.selected_answer === shuffledAnswers[0].answers[1]}
            onClick={selectedAnswer}
            />
            <label htmlFor='3'>{decode(shuffledAnswers[0].answers[1])}</label> <br />
            <input
            type='radio'
            value={shuffledAnswers[0].answers[2]}
            name="answer-set-0"
            
            checked={quizData.selected_answer === shuffledAnswers[0].answers[2]}
            onClick={selectedAnswer}
            />
            <label htmlFor='8'>{decode(shuffledAnswers[0].answers[2])}</label> <br />
            <input
            type='radio'
            value={shuffledAnswers[0].answers[3]}
            name="answer-set-0"
            checked={quizData.selected_answer === shuffledAnswers[0].answers[3]}
            onClick={selectedAnswer}
            />
            <label htmlFor='5'>{decode(shuffledAnswers[0].answers[3])}</label> <br />
            <br />

          {/* question 1 */}
          <label>{decode(quizData[1].question)}</label><br />
            <input
            type='radio'
            value={shuffledAnswers[1].answers[0]}
            name="answer-set-1"
            />
            <label htmlFor={shuffledAnswers[1].answers[0]}>{decode(shuffledAnswers[1].answers[0])}</label> <br />
            <input
            type='radio'
            value={shuffledAnswers[1].answers[1]}
            name="answer-set-1"
            />
            <label htmlFor='3'>{decode(shuffledAnswers[1].answers[1])}</label> <br />
            <input
            type='radio'
            value={shuffledAnswers[1].answers[2]}
            name="answer-set-1"
            />
            <label htmlFor='8'>{decode(shuffledAnswers[1].answers[2])}</label> <br />
            <input
            type='radio'
            value={shuffledAnswers[1].answers[3]}
            name="answer-set-1"
            />
            <label htmlFor='5'>{decode(shuffledAnswers[1].answers[3])}</label> <br />
            <br />

          {/* question 2 */}
          <label>{decode(quizData[2].question)}</label><br />
            <input
            type='radio'
            value={shuffledAnswers[2].answers[0]}
            name="answer-set-2"
            />
            <label htmlFor={shuffledAnswers[2].answers[0]}>{decode(shuffledAnswers[2].answers[0])}</label> <br />
            <input
            type='radio'
            value={shuffledAnswers[2].answers[1]}
            name="answer-set-2"
            />
            <label htmlFor='3'>{decode(shuffledAnswers[2].answers[1])}</label> <br />
            <input
            type='radio'
            value={shuffledAnswers[2].answers[2]}
            name="answer-set-2"
            />
            <label htmlFor='8'>{decode(shuffledAnswers[2].answers[2])}</label> <br />
            <input
            type='radio'
            value={shuffledAnswers[2].answers[3]}
            name="answer-set-2"
            />
            <label htmlFor='5'>{decode(shuffledAnswers[2].answers[3])}</label> <br />
            <br />

          {/* question 3*/}
          <label>{decode(quizData[3].question)}</label><br />
            <input
            type='radio'
            value={shuffledAnswers[3].answers[0]}
            name="answer-set-3"
            />
            <label htmlFor={shuffledAnswers[3].answers[0]}>{decode(shuffledAnswers[3].answers[0])}</label> <br />
            <input
            type='radio'
            value={shuffledAnswers[3].answers[1]}
            name="answer-set-3"
            />
            <label htmlFor='3'>{decode(shuffledAnswers[3].answers[1])}</label> <br />
            <input
            type='radio'
            value={shuffledAnswers[3].answers[2]}
            name="answer-set-3"
            />
            <label htmlFor='8'>{decode(shuffledAnswers[3].answers[2])}</label> <br />
            <input
            type='radio'
            value={shuffledAnswers[3].answers[3]}
            name="answer-set-3"
            />
            <label htmlFor='5'>{decode(shuffledAnswers[3].answers[3])}</label> <br />
            <br />

          {/* question 4 */}
          <label>{decode(quizData[4].question)}</label><br />
            <input
            type='radio'
            value={shuffledAnswers[4].answers[0]}
            name="answer-set-4"
            />
            <label htmlFor={shuffledAnswers[4].answers[0]}>{decode(shuffledAnswers[4].answers[0])}</label> <br />
            <input
            type='radio'
            value={shuffledAnswers[4].answers[1]}
            name="answer-set-4"
            />
            <label htmlFor='3'>{decode(shuffledAnswers[4].answers[1])}</label> <br />
            <input
            type='radio'
            value={shuffledAnswers[4].answers[2]}
            name="answer-set-4"
            />
            <label htmlFor='8'>{decode(shuffledAnswers[4].answers[2])}</label> <br />
            <input
            type='radio'
            value={shuffledAnswers[4].answers[3]}
            name="answer-set-4"
            />
            <label htmlFor='5'>{decode(shuffledAnswers[4].answers[3])}</label> <br />
            <br />
          
          <button>Check Answers</button>
      </form>
      :
      <StartQuiz
        toggleStartQuiz={toggleStartQuiz}
      />
      }
    </>
  )
}

export default App
