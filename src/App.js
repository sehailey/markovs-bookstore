import React, {Component} from 'react'
import {Route} from 'react-router-dom'
import './App.css'

import {Navbar, TitleGenerator} from './components'

class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Route exact path="/" component={TitleGenerator} />
      </div>
    )
  }
}

export default App
