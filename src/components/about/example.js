import React from 'react'
import s from './example.css'
import exampleSVG from './example.svg'

export default function Example (props) {
  return (
    <div className={ s.root }>
      <h1>Example</h1>
      <img className={ s.image } src={ exampleSVG } />
    </div>
  )
}
