import React from 'react'
import { render } from 'react-snapshot'

import App from './components/App'
import './reset.css'
import './variables.css'

render(<App />, document.getElementById('root'))
