import React, { PureComponent } from 'react'

import StackLayer from './StackLayer'
import TetrominoLayer from './TetrominoLayer'
import { overlays } from '../../../overlays'
import './index.css'

// Tetromino shapes are I O T L J Z S

class Board extends PureComponent {
  // Board size is 18x12
  state = {
    stack: Array(18).fill(Array(12).fill(' ')),
    tetromino: null
  }

  constructor (props) {
    super(props)

    this.state.stack[14] = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'I'] // prettier-ignore
    this.state.stack[15] = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'I'] // prettier-ignore
    this.state.stack[16] = ['S', ' ', 'O', 'O', 'L', ' ', ' ', ' ', 'T', 'T', 'T', 'I'] // prettier-ignore
    this.state.stack[17] = ['S', ' ', 'O', 'O', 'L', ' ', 'J', 'J', 'Z', 'T', ' ', 'I'] // prettier-ignore

    this.state.tetromino = {
      overlay: overlays.S,
      bottom: 15,
      left: 5
    }
  }

  render () {
    const { tetromino, stack } = this.state
    return (
      <div className='board'>
        <StackLayer stack={stack} />
        {tetromino && <TetrominoLayer tetromino={tetromino} />}
      </div>
    )
  }
}

export default Board
