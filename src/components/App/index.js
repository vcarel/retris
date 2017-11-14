import React, { Component } from 'react'

import Board from './Board'
import NewGame from './Overlays/NewGame'
import GameOver from './Overlays/GameOver'
import Pause from './Overlays/Pause'
import {
  mergeIntoStack,
  sprites,
  rotateLeft,
  rotateRight,
  wouldCollide,
  dropRows,
  getRowsToDrop
} from '../../sprites'
import './index.css'

const initialState = {
  // Board size is 18x12
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
  status: 'new', // Can be new, playing, end, pause
  level: null,
  rowsToDrop: []
}

class App extends Component {
  state = initialState

  handleKeyDown = this.handleKeyDown.bind(this)
  handleVisibilityChange = this.handleVisibilityChange.bind(this)

  componentDidMount () {
    document.addEventListener('keydown', this.handleKeyDown)
    document.addEventListener('visibilitychange', this.handleVisibilityChange)
  }

  componentWillUnmount () {
    document.removeEventListener('keydown', this.handleKeyDown)
    document.removeEventListener(
      'visibilityChange',
      this.handleVisibilityChange
    )
  }

  render () {
    const { rowsToDrop, stack, status, tetromino } = this.state
    return (
      <div className='app'>
        <div className='left pane' />

        <div className='middle pane'>
          <Board
            stack={tetromino ? mergeIntoStack(tetromino, stack) : stack}
            rowsToDrop={rowsToDrop}
          />

          {status === 'new' && <NewGame />}
          {status === 'pause' && <Pause />}
          {status === 'end' && <GameOver />}
        </div>

        <div className='right pane' />
      </div>
    )
  }

  handleKeyDown (e) {
    const code = e.code
    const key = e.key
    const { status } = this.state

    if (status === 'new' || status === 'end') {
      if (key.length === 1 || ['Enter', 'Space'].includes(code)) {
        this.startNewGame()
      }
    } else if (status === 'pause') {
      if (key.length === 1 || ['Enter', 'Space'].includes(code)) {
        this.resumeGame()
      }
    } else if (status === 'playing') {
      const { stack } = this.state
      let { tetromino, tetromino: { bottom, left, sprite } } = this.state

      if (code === 'ArrowLeft') {
        left--
      } else if (code === 'ArrowRight') {
        left++
      } else if (code === 'ArrowDown') {
        bottom++
      } else if (code === 'ArrowUp' || code === 'End') {
        left += Math.floor(sprite[0].length / 2)
        sprite = rotateRight(sprite)
        left -= Math.floor(sprite[0].length / 2)
      } else if (code === 'Home') {
        left += Math.floor(sprite[0].length / 2)
        sprite = rotateLeft(sprite)
        left -= Math.floor(sprite[0].length / 2)
      } else if (code === 'Space' || code === 'Enter') {
        while (!wouldCollide({ ...tetromino, bottom: ++bottom }, stack)) {}
        bottom--
      } else if (code === 'Escape') {
        this.pauseGame()
      } else {
        return
      }

      tetromino = { ...tetromino, bottom, left, sprite }
      if (!wouldCollide(tetromino, stack)) {
        this.setState({ tetromino })
      }
    }
  }

  handleVisibilityChange () {
    if (document.hidden && this.state.status === 'playing') {
      this.pauseGame()
    }
  }

  startNewGame () {
    this.setState({
      stack: Array(18).fill(Array(12).fill(' ')), // Board size is 18x12
      tetromino: this.getRandomTetromino(),
      level: 0,
      rowsToDrop: []
    })
    this.resumeGame()
  }

  pauseGame () {
    this.setState({ status: 'pause' })
    clearInterval(this.dropIntervalId)
  }

  resumeGame () {
    this.setState({ status: 'playing' })

    this.dropIntervalId = setInterval(() => {
      const { stack, tetromino, tetromino: { bottom } } = this.state
      const nextTetromino = { ...tetromino, bottom: bottom + 1 }

      if (!wouldCollide(nextTetromino, stack)) {
        this.setState({ tetromino: nextTetromino })
      } else if (bottom > 1) {
        const newStack = mergeIntoStack(tetromino, stack)
        const rowsToDrop = getRowsToDrop(newStack)
        this.setState({
          stack: newStack,
          tetromino: this.getRandomTetromino(),
          rowsToDrop
        })
        if (rowsToDrop.length > 0) {
          this.deferDropLines()
        }
      } else {
        this.setState({ status: bottom > 1 ? 'playing' : 'end' })
        clearInterval(this.dropIntervalId)
      }
    }, 1000)
  }

  getRandomTetromino () {
    const shapes = Object.keys(sprites)
    const shape = shapes[Math.floor(Math.random() * shapes.length)]
    return {
      sprite: sprites[shape],
      bottom: 1,
      left: 5
    }
  }

  deferDropLines () {
    setTimeout(() => {
      const { rowsToDrop, stack } = this.state
      this.setState({
        stack: dropRows(stack, rowsToDrop),
        rowsToDrop: []
      })
    }, 400)
  }
}

export default App
