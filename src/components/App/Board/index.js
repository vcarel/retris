import React, { PureComponent } from 'react'

import Row from './Row'
import { mergeIntoStack, overlays } from '../../../overlays'
import './index.css'

// Tetromino shapes are I O T L J Z S

class Board extends PureComponent {
  // Board size is 18x12
  state = {
    // stack: Array(18).fill(Array(12).fill(' ')),
    stack: [
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'I'],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'I'],
      ['S', ' ', 'O', 'O', 'L', ' ', ' ', ' ', 'T', 'T', 'T', 'I'],
      ['S', ' ', 'O', 'O', 'L', ' ', 'J', 'J', 'Z', 'T', ' ', 'I']
    ],
    // tetromino: null,
    tetromino: {
      overlay: overlays.S,
      bottom: 14,
      left: 5
    }
  }

  render () {
    const { tetromino, stack } = this.state
    const mergedStack = tetromino ? mergeIntoStack(tetromino, stack) : stack
    return (
      <div className='board'>
        <div className='stack'>
          {mergedStack.map((shapes, r) => <Row key={r} shapes={shapes} />)}
        </div>
      </div>
    )
  }
}

export default Board
