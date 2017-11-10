import React from 'react'

import Line from './Line'
import Block from '../../Block'

const TetrominoLayer = ({ tetromino: { top, left, overlay } }) => {
  return (
    <div className='tetromino layer'>
      {Array(top)
        .fill()
        .map((_, i) => <Line key={i} shapes={Array(12).fill(' ')} />)}

      {overlay.map((line, i) => (
        <div key={i} className='line'>
          {Array(left)
            .fill()
            .map((_, i) => <Block key={i} shape=' ' />)}

          {line.map((shape, j) => <Block key={j} shape={shape} />)}

          {Array(12 - left - line.length)
            .fill()
            .map((_, i) => <Block key={i} shape=' ' />)}
        </div>
      ))}

      {Array(18 - overlay.length - top)
        .fill()
        .map((_, i) => <Line key={i} shapes={Array(12).fill(' ')} />)}
    </div>
  )
}

export default TetrominoLayer
