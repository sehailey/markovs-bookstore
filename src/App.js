import React, { Component } from 'react'
import './App.css'
import Navbar from './components/Navbar'

import CFD from './parser/CFD'
import TPD from './parser/TPD'
import {
    randInt,
    titleCase,
    generateTitleWithTPD
} from './generateTitleWithTPD'

const initialState = {
    title: 'Hello, World! And Other Exciting Titles'
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
                <Navbar />
                <div className="container">
                    <div
                        className="card main-card mx-auto text-center"
                        style={{ width: 50 + 'em' }}
                    >
                        <div className="card-body">
                            <h3> {this.state.title}</h3>
                        </div>
                    </div>
                    <form onSubmit={this.handleSubmit}>
                        <div className="row">
                            <div className="col-8">
                                <input
                                    onChange={this.handleChange}
                                    className="form-control"
                                    name="seedWord"
                                    result="title"
                                    placeholder="enter a seed word"
                                    aria-label="seedWord"
                                />
                            </div>
                            <div className="col">
                                <button
                                    type="button"
                                    className="form-control btn btn-primary"
                                >
                                    Generate title
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default App
