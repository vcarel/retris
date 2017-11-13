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
      ['S', 'J', 'O', 'O', 'L', ' ', ' ', 'Z', 'Z', 'T', ' ', 'I']
    ],
    // tetromino: null,
    tetromino: {
      overlay: overlays.L,
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
    const code = e.code
    const shiftKey = e.shiftKey
    const { stack } = this.state
    let { tetromino, tetromino: { bottom, left, overlay } } = this.state

    if (code === 'ArrowLeft') {
      left--
    } else if (code === 'ArrowRight') {
      left++
    } else if (code === 'Enter' && !shiftKey) {
      bottom++
    } else if (code === 'ArrowUp' || code === 'End') {
      left += Math.floor(overlay[0].length / 2)
      overlay = rotateRight(overlay)
      left -= Math.floor(overlay[0].length / 2)
    } else if (code === 'ArrowDown' || code === 'Home') {
      left += Math.floor(overlay[0].length / 2)
      overlay = rotateLeft(overlay)
      left -= Math.floor(overlay[0].length / 2)
    } else if (code === 'Space' || (code === 'Enter' && shiftKey)) {
      while (!wouldCollide({ ...tetromino, bottom: ++bottom }, stack)) {}
      bottom--
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
