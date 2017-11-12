import React, { PureComponent } from 'react'

import Row from './Row'
import {
  mergeIntoStack,
  overlays,
  rotateLeft,
  rotateRight,
  wouldCollide
} from '../../../overlays'
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
      overlay: overlays.I,
      bottom: 1,
      left: 5
    }
  }

  handleKeyDown = this.handleKeyDown.bind(this)

  componentDidMount () {
    document.addEventListener('keydown', this.handleKeyDown)
  }

  componentWillUnmount () {
    document.removeEventListener('keydown', this.handleKeyDown)
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

  handleKeyDown (e) {
    const { stack } = this.state
    let { tetromino, tetromino: { bottom, left, overlay } } = this.state

    const code = e.code
    if (code === 'ArrowLeft') {
      left -= 1
    } else if (code === 'ArrowRight') {
      left += 1
    } else if (code === 'ArrowDown') {
      bottom += 1
    } else if (code === 'ArrowUp' || code === 'AltLeft') {
      overlay = rotateRight(overlay)
    } else if (code === 'ControlLeft') {
      overlay = rotateLeft(overlay)
    } else {
      return
    }

    tetromino = { ...tetromino, bottom, left, overlay }
    if (!wouldCollide(tetromino, stack)) {
      this.setState({ tetromino })
    }
  }
}

export default Board
