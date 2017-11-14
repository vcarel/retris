import React from 'react'

import Block from '../../Block'
import './index.css'

const Board = ({ stack, nbLinesToVanish }) => (
  <div className='board'>
    <div className='stack'>
      {stack.map((shapes, r) => (
        <div
          key={r}
          className={
            'row ' +
            (stack.length - r === nbLinesToVanish ? 'animateVanish' : '')
          }
        >
          {shapes.map((shape, c) => <Block key={c} shape={shape} />)}
        </div>
      ))}
    </div>
  </div>
)

export default Board
