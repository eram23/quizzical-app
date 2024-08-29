import { decode } from 'html-entities';
import React from 'react'


export default function Questions(props) {
    
    return (
        <>
            <p className='question'>{decode(props.question)}</p>
        </>
    )
}