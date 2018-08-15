import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import CFD from './server/parser/CFD'
import TPD from './server/parser/TPD'
import {
    randInt,
    titleCase,
    generateTitleWithTPD
} from './generateTitleWithTPD'

const initialState = {
    title: ''
}

class App extends Component {
    constructor() {
        super()
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.state = initialState
    }

    handleSubmit = evt => {
        evt.preventDefault()
        const word = this.state.seedWord
        const title = generateTitleWithTPD(word)
        console.log(title)
        this.setState({ title: title })
        console.log('state: ', this.state)
    }

    handleChange = evt => {
        this.setState({ [evt.target.name]: evt.target.value })
        console.log(this.state)
    }

    render() {
        return (
            <div className="App container-fluid">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Random Book Title Generator</h1>
                </header>
                <form onSubmit={this.handleSubmit}>
                    <input
                        onChange={this.handleChange}
                        className="form-control mt-5"
                        name="seedWord"
                        result="title"
                        placeholder="enter a seed word"
                        aria-label="seedWord"
                    />
                </form>
            </div>
        )
    }
}

export default App
