import { decode } from 'html-entities';
import React from 'react'


export default function Questions(props) {
    
    return (
        <>
            <h2>{decode(props.question)}</h2>
        </>
    )
}