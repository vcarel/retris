import React from 'react'

import Block from '../../components/Block'

const Line = ({ shapes }) => (
  <div className='line'>
    {shapes.map((shape, i) => <Block key={i} shape={shape} />)}
  </div>
)

export default Line
