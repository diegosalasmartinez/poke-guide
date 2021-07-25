import React, { Component } from 'react'
import { 
    Col,
    Container, 
    Row,
    Card
} from 'react-bootstrap'

export default class Pokemons extends Component {
    render() {
        return (
            <Container>
                <Row>
                    <Col xs="2">
                        <Card>
                            Hola soy el header
                        </Card>
                    </Col>
                    <Col xs="2">
                        <Card>
                            Hola soy el header
                        </Card>
                    </Col>
                </Row>
            </Container>
        )
    }
}
