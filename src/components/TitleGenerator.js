import React, {Component} from 'react'

import {generateTitleWithTPD} from './generateTitleWithTPD'

const initialState = {
  title: 'Hello, World! And Other Exciting Titles',
}

class TitleGenerator extends Component {
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
    this.setState({title: title})
  }

  handleChange = evt => {
    this.setState({[evt.target.name]: evt.target.value})
  }

  render() {
    return (
      <div className="App container-fluid">
        <div className="container">
          <div
            className="card main-card mx-auto text-center"
            style={{width: 50 + 'em'}}
          >
            <div className="card-body">
              <h3> {this.state.title}</h3>
            </div>
          </div>
          <form onSubmit={this.handleSubmit}>
            <div className="row justify-content-md-center">
              <div className="col-5">
                <input
                  onChange={this.handleChange}
                  className="form-control"
                  name="seedWord"
                  result="title"
                  placeholder="enter a seed word"
                  aria-label="seedWord"
                />
              </div>
              <div className="col-3">
                <button type="button" className="form-control btn btn-primary">
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

export default TitleGenerator
