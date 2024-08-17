import { decode } from 'html-entities';
import React from 'react'
// import quizData from './App.jsx'


export default function Answers(props) {


    return (
        <>
            <button type='button' onClick={props.trackAnswer}>{decode(props.answers[0])}</button>
            <button type='button' onClick={props.trackAnswer}>{decode(props.answers[1])}</button>
            <button type='button' onClick={props.trackAnswer}>{decode(props.answers[2])}</button>
            <button type='button' onClick={props.trackAnswer}>{decode(props.answers[3])}</button>
        </>
    )
}