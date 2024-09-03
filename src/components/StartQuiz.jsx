import React from "react";

function StartQuiz(props) {


    return (
        <div className="start-quiz-section">
            <img className="anya-start-quiz" src="src/assets/anya-1.png" alt="the anime character anya pointing to the righ"/>
            <h1>Anime Quiz</h1>
            <p>Test your anime knowledge!</p>
            <button onClick={props.toggleStartQuiz}>Start Quiz</button>
        </div>
    )
}

export default StartQuiz