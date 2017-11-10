import React from 'react'

import Board from './Board'
import './index.css'

const App = () => (
  <div className='app'>
    <div className='left pane' />
    <div className='middle pane'>
      <Board />
    </div>
    <div className='right pane' />
  </div>
)

export default App
