import React from 'react'

import Block from '../../Block'
import './index.css'
import './filling.css'

const Stack = ({ filling, stack, rowsToDrop }) => (
  <div className={'stack ' + (filling ? 'filling' : '')}>
    {stack.map((shapes, r) => (
      <div key={r} className={'row ' + ((rowsToDrop || []).includes(r) ? 'animateRowDrop' : '')}>
        {shapes.map((shape, c) => (
          <Block key={c} shape={shape} />
        ))}
      </div>
    ))}
  </div>
)

export default Stack
