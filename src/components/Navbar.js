import React from 'react'
import { Link } from 'react-router-dom'

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
                <Link className="nav-link" to="/about">
                    About
                </Link>
            </div>
        </div>
    </nav>
)

export default Navbar
