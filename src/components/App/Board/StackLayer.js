import React from 'react'

import Line from './Line'

const StackLayer = ({ stack }) => (
  <div className='stack layer'>
    {stack.map((shapes, i) => <Line key={i} shapes={shapes} />)}
  </div>
)

export default StackLayer
