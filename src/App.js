import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css'

import { Navbar, TitleGenerator } from './components'

class App extends Component {
    render() {
        return (
            <div>
                <Navbar />
                <TitleGenerator />
            </div>
        )
    }
}

export default App
