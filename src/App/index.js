import React, { Component } from 'react'

import Board from './Board'
import './index.css'

class App extends Component {
  render () {
    return (
      <div className='app'>
        <div className='left pane' />
        <div className='middle pane'>
          <Board />
        </div>
        <div className='right pane' />
      </div>
    )
  }
}

export default App
