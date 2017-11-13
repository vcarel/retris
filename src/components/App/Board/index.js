import React from 'react'

import Row from './Row'
import './index.css'

const Board = ({ stack }) => (
  <div className='board'>
    <div className='stack'>
      {stack.map((shapes, r) => <Row key={r} shapes={shapes} />)}
    </div>
  </div>
)

export default Board
