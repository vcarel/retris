import React from 'react'

import Block from '../../Block'

const Row = ({ shapes }) => (
  <div className='row'>
    {shapes.map((shape, i) => <Block key={i} shape={shape} />)}
  </div>
)

export default Row
