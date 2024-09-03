import { useState, useEffect } from 'react'
import './App.css'
import StartQuiz from './components/StartQuiz'
import Questions from './components/Questions'
import Answers from './components/Answers.jsx'
import { nanoid } from 'nanoid'
import anyaQuiz from './assets/anya.png'
import bondQuiz from './assets/bond.png'

function App(props) {
  const [startQuiz, setStartQuiz] = useState(false) 
  const [quizData, setQuizData] = useState([])
  const [results, setResults] = useState(false)
  const [userAnswers, setUserAnswers] = useState({
    0: '',
    1: '',
    2: '',
    3: '',
    4: ''
  })
    
  let score = 0
  
  // fetches quiz data only when called
  function fetchQuizData() {
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
        selected_answer: "",
        quizStarted: false
      }
    })))
  }

  // calls the fetchQuizData to initiate the data
  useEffect(() => {
    fetchQuizData()
  }, [])

  function trackAnswer(index, answer) {
    console.log(index, answer)

    setUserAnswers(prevData => {
      return {
        ...prevData,
          [index]: answer,
      }
      })
  }

  // checks what answers are correct and incorrect
  function checkAnswers(num) {
    quizData.map((quizItem, index) => {
      if(quizItem.correct_answer === userAnswers[index]) {
        console.log("correct !")
        num += 1
      } else {
        console.log('incorrect')
      }
    })
    return num
  }

  



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

  // render quiz questions
  function getQuiz() {
    const quiz = quizData.map((quizObj, index) => {

      return (
        <>
          <Questions
          question={quizObj.question}
          />
          <Answers
          key={quizObj.id}
          answers={quizObj.answers}
          trackAnswer={trackAnswer}
          index={index}
          userAnswers={userAnswers}
          quizData={quizData}
          results={results}
          />
          <br />
          <br />
        </>
      )
    })

    return quiz
  }
  



  function onSubmit(event) {
    event.preventDefault() 
    setResults(prevValue => !prevValue)
  }
  

  // resets quiz, score, result state, and user answers
  function tryAgain(event) {
    event.preventDefault() 
    setStartQuiz(prevValue => prevValue = false)
    setResults(prevValue => prevValue = false)
    // setUserAnswers({
    // 0: '',
    // 1: '',
    // 2: '',
    // 3: '',
    // 4: ''
    // })
    score = 0
    fetchQuizData()
    getQuiz()
  }

  return (
    <>
      {/* conditionally renders quiz  */}
      {startQuiz === true ? 
        
        <form className='quiz-form' onSubmit={onSubmit}>
          <img className='anya-quiz' src={anyaQuiz} alt='anime character anya laughing suspiciously'/>
          <img className='bond-quiz' src={bondQuiz} alt='anime dog bond wearing a bow tie'/>
          <h2>Anime Quiz</h2>
          {getQuiz()}
          <button 
            onClick={results === false ? onSubmit : tryAgain}
          >
            {results === false ? 'Check Answers' : 'Try Again'}
          </button>
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