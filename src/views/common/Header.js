import React, { Component } from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
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
            <Navbar collapseOnSelect expand="lg" bg="light" variant="light" className="mb-4">
                <Container>
                    <Link to="/" className="navbar-brand">Poke Guide</Link>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Link to="/pokedex" className="nav-link current" onClick={this.onClickNav}>Pokedex</Link>
                            <Link to="/pokemons" className="nav-link" onClick={this.onClickNav}>Pokemons</Link>
                            <Link to="/items" className="nav-link" onClick={this.onClickNav}>Items</Link>
                            <Link to="/berries" className="nav-link" onClick={this.onClickNav}>Berries</Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        )
    }
}
