import React, { Component } from 'react'
import { Col, Row } from 'react-bootstrap'
import PokemonCard from '../PokemonCard'

export default class PokemonEvolution extends Component {
    render() {
        const { chain } = this.props;

        return (
            <Row className="pokemon_evolution">
                <Col xs="12" className="title">
                    Evolution Chain
                </Col>
                <Col className="chain">
                    <Row>
                        { chain.map((c, index) => 
                            <PokemonCard key={index} pokemon={c}></PokemonCard>
                        )}
                    </Row>
                </Col>
            </Row>
        )
    }
}
