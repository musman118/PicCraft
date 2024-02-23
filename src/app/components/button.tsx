'use client'
import {useState} from 'react';




const Button = (props:{text:string}) => {
    return (
        <button className="container border-2 rounded color bg-purple p-4 m-4 w-[15%] top-15 " >
            <p className="text-center">{props.text}</p>
        </button>
    )
}
export default Button;