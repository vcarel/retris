import React, { Component } from 'react'

import Board from './Board'
import NewGame from './Backdrops/NewGame'
import GameOver from './Backdrops/GameOver'
import {
  mergeIntoStack,
  sprites,
  rotateLeft,
  rotateRight,
  wouldCollide
} from '../../sprites'
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

          {gameStatus === 'new' && <NewGame />}
          {gameStatus === 'end' && <GameOver />}
        </div>

        <div className='right pane' />
      </div>
    )
  }

  handleKeyDown (e) {
    const code = e.code
    const key = e.key

    if (this.state.gameStatus === 'new') {
      if (key.length === 1 || ['Enter', 'Space'].includes(code)) {
        // Alpha-numeric keys have a key length of 1
        this.startNewGame()
      }
    } else if (this.state.gameStatus === 'playing') {
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
      } else {
        return
      }

      tetromino = { ...tetromino, bottom, left, sprite }
      if (!wouldCollide(tetromino, stack)) {
        this.setState({ tetromino })
      }
    }
  }

  startNewGame () {
    this.setState({
      stack: Array(18).fill(Array(12).fill(' ')), // Board size is 18x12
      tetromino: this.getRandomTetromino(),
      gameStatus: 'playing',
      level: 0
    })

    this.dropIntervalId = setInterval(() => {
      const { stack, tetromino, tetromino: { bottom } } = this.state
      const nextTetromino = { ...tetromino, bottom: bottom + 1 }

      if (!wouldCollide(nextTetromino, stack)) {
        this.setState({ tetromino: nextTetromino })
      } else if (bottom > 1) {
        this.setState({
          stack: mergeIntoStack(tetromino, stack),
          tetromino: this.getRandomTetromino()
        })
      } else {
        this.setState({
          gameStatus: bottom > 1 ? 'playing' : 'end'
        })
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
}

export default App
