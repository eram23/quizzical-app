import { useState, useEffect } from 'react'
import './App.css'
import StartQuiz from './StartQuiz'
import Questions from './Questions'
import Answers from './Answers'
import { nanoid } from 'nanoid'

function App(props) {
  const [startQuiz, setStartQuiz] = useState(false) 
  const [quizData, setQuizData] = useState([])
  // const [score, setScore] = useState(0) 
  let score = 0

  const [results, setResults] = useState(false)
  const [userAnswers, setUserAnswers] = useState({
    0: '',
    1: '',
    2: '',
    3: ''
  })
  
  // this useEffect gets the data from the API and stores in the quizzicalData state
  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5&category=31&difficulty=easy&type=multiple")
      .then(res => res.json())
      .then(data => setQuizData(data.results.map(quizObj => {
        const shuffledAnswers = shuffleAnswers(quizObj.correct_answer, quizObj.incorrect_answers);

        return {
          id: nanoid(),
          question: quizObj.question,
          correct_answer: quizObj.correct_answer,
          incorrect_answers: [...quizObj.incorrect_answers],
          answers: shuffledAnswers,
          selected_answer: ""
        }
      })))
  }, [])



  // this function is used to toggle whether the quiz has started or not
  function toggleStartQuiz() {
    setStartQuiz(prevValue => !prevValue)
  }


  // Shuffle the combined array using Fisher-Yates algorithm
  function shuffleAnswers(correctAnswer, incorrectAnswers) {
    const allAnswers = [correctAnswer, ...incorrectAnswers]

    for (let i = allAnswers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [allAnswers[i], allAnswers[j]] = [allAnswers[j], allAnswers[i]];
    }

    return(allAnswers)
  }

  function trackAnswer(index, answer) {
    let btnClicked = answer
    
        setUserAnswers(prevData => {
          return {
            ...prevData,
            [index]: btnClicked
          }
        })
        console.log(userAnswers)
        
    
  }

  function checkAnswers(num) {
    quizData.map((quizItem, index) => {
      if(quizItem.correct_answer === userAnswers[index]) {
        console.log("correct !")
        num += 1
      }
    })
    console.log(num)
    return num
  }

  function onSubmit(event) {
    event.preventDefault() 
    checkAnswers(score) 
    setResults(prevValue => !prevValue)
  }

  return (
    <>
      {/* conditionally renders the start page or the quizzical form  */}
      {startQuiz === true ? 
        <form className='quiz-form' onSubmit={onSubmit}>
          {/* map below grabs each question and puts it into the Question component as a prop */}
          {quizData.map((quizObj, index) => {

            return (
              <>
                <Questions
                question={quizObj.question}
                />
                <Answers
                key={quizObj.id}
                answers={quizObj.answers}
                trackAnswer={(e) => trackAnswer(index, e.target.innerText)}
                />
              </>
            )
          })}
          <br />
          <br />
          <button onClick={onSubmit}>{results === false ? 'Check Answers' : 'Try Again'}</button>
          {results && <p>You scored {checkAnswers(score)}/5 answers</p> }
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