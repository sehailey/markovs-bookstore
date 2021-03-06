import React from 'react'
import {Link} from 'react-router-dom'

const Navbar = () => (
  <nav className="navbar navbar-expand-lg sticky-top navbar-brown navbar-fixed-top">
    <div className="container">
      <Link className="navbar-brand js-scroll-trigger" to="/">
        Markov's Bookstore
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <a
          className="nav-link"
          href="https://github.com/sehailey/markovs-bookstore/blob/master/README.md"
        >
          About
        </a>
        <a
          className="nav-link"
          href="https://github.com/sehailey/markovs-bookstore"
        >
          Github
        </a>
      </div>
    </div>
  </nav>
)

export default Navbar
