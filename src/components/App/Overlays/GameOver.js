import React from 'react'

const titles = ['Ouch!', 'Too bad!', 'Check it baby!', 'That hurts!']
const GameOver = () => (
  <div className='backdrop'>
    <div className='text'>
      <h3>{titles[Math.floor(Math.random() * titles.length)]}</h3>
      <p className='blink'>&lt;Press any key&gt;</p>
    </div>
  </div>
)

export default GameOver
