import React, { Component } from 'react'

import Board from './Board'
import {
  mergeIntoStack,
  overlays,
  rotateLeft,
  rotateRight,
  wouldCollide
} from '../../overlays'
import './index.css'

class App extends Component {
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
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', 'O', 'O', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'I'],
      ['J', 'J', 'O', 'O', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'I'],
      [' ', 'J', 'Z', 'Z', 'T', 'T', 'T', ' ', 'S', 'S', ' ', 'I'],
      ['T', 'J', ' ', 'Z', 'Z', 'T', ' ', 'S', 'S', 'T', ' ', 'I']
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
    return (
      <div className='app'>
        <div className='left pane' />

        <div className='middle pane'>
          <Board stack={tetromino ? mergeIntoStack(tetromino, stack) : stack} />

          <div className='backdrop'>
            <div className='text'>
              <h3>New Game</h3>
              <p className='blink'>&lt;Press any key&gt;</p>
            </div>
          </div>
        </div>

        <div className='right pane' />
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

export default App
