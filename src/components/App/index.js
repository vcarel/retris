import React, { Component } from 'react'

import Board from './Board'
import NewGameBackdrop from './NewGameBackdrop'
import {
  mergeIntoStack,
  overlays,
  rotateLeft,
  rotateRight,
  wouldCollide
} from '../../overlays'
import './index.css'

// Board size is 18x12
const initialState = {
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
    ['J', ' ', 'O', 'O', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'I'],
    ['J', ' ', 'Z', 'Z', 'T', 'T', 'T', ' ', 'S', 'S', ' ', 'I'],
    ['J', 'J', ' ', 'Z', 'Z', 'T', ' ', 'S', 'S', 'L', 'L', 'I']
  ],
  tetromino: null,
  gameStatus: 'new',
  level: null
}

class App extends Component {
  state = initialState

  handleKeyDown = this.handleKeyDown.bind(this)

  componentDidMount () {
    document.addEventListener('keydown', this.handleKeyDown)
  }

  componentWillUnmount () {
    document.removeEventListener('keydown', this.handleKeyDown)
  }

  render () {
    const { tetromino, stack, gameStatus } = this.state
    return (
      <div className='app'>
        <div className='left pane' />

        <div className='middle pane'>
          <Board stack={tetromino ? mergeIntoStack(tetromino, stack) : stack} />

          {gameStatus === 'new' && <NewGameBackdrop />}
        </div>

        <div className='right pane' />
      </div>
    )
  }

  handleKeyDown (e) {
    const code = e.code
    const key = e.key
    const shiftKey = e.shiftKey

    if (this.state.gameStatus === 'new' && key.length === 1) {
      // Alpha-numeric keys have a key length of 1
      this.setState({ gameStatus: 'started' })
    }

    if (this.state.gameStatus === 'playing') {
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

  startNewGame () {
    this.setState({
      stack: Array(18).fill(Array(12).fill(' ')), // Board size is 18x12
      tetromino: {
        overlay: overlays.L,
        bottom: 1,
        left: 5
      },
      gameStatus: 'started',
      level: 0
    })
  }
}

export default App
