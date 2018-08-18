import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = ({ username, handleClick, isLoggedIn }) => (
    <nav className="navbar navbar-expand-lg sticky-top navbar-brown navbar-fixed-top">
        <div className="container">
            <NavLink className="navbar-brand js-scroll-trigger" to="/">
                Markov's Bookstore
            </NavLink>
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
                <NavLink className="nav-link" to="/about">
                    About
                </NavLink>
            </div>
        </div>
    </nav>
)

export default Navbar
