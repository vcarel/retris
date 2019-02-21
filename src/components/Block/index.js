import React from 'react'
import PropTypes from 'prop-types'

import './index.css'

const Block = ({ shape }) => <div className={`block ${shape === ' ' ? 'void' : shape}`} />

Block.propTypes = {
  shape: PropTypes.oneOf(['I', 'O', 'T', 'L', 'J', 'Z', 'S', ' ']).isRequired
}

export default Block
