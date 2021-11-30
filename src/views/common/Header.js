import React, { Component } from 'react'
import { Nav, Navbar, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'


export default class Header extends Component {
    onClickNav = (e) => {
        const lastNav = document.querySelector(".nav-link.current");
        if(lastNav){
            lastNav.classList.remove('current');
        }

        const currentNav = e.target;
        currentNav.classList.toggle("current");
    }

    render() {
        return (
            <Row>
                <Navbar collapseOnSelect expand="md" className="mb-4">
                    <Navbar.Brand>
                        <Link to="/" className="navbar-brand">
                            <img src="../../assets/pokeball.svg" width="30" height="30" className="d-inline-block align-top" alt="Poke Guide"/>
                        </Link>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Link to="/pokedex" className="nav-link current" onClick={this.onClickNav}>Pokedex</Link>
                            <Link to="/items" className="nav-link" onClick={this.onClickNav}>Items</Link>
                            <Link to="/berries" className="nav-link" onClick={this.onClickNav}>Berries</Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </Row>
        )
    }
}