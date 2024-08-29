import React from "react";

function StartQuiz(props) {


    return (
        <div>
            <h1>Anime Quiz</h1>
            <p>Test your anime knowledge!</p>
            <button onClick={props.toggleStartQuiz}>Start Quiz</button>
        </div>
    )
}

export default StartQuiz