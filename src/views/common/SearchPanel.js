import React, { Component } from 'react'
import { 
    Col,
    Form,
    Row
} from 'react-bootstrap'

export default class SearchPanel extends Component {
    render() {
        return (
            <Row className="search-panel">
                <Col xs="12">
                    Search
                </Col>
                <Col xs="12">
                    <Form>
                        <Form.Group as={Row}>
                            <Form.Label column sm="2">Enter a pokemon name</Form.Label>
                            <Col xs="4">
                                <Form.Control type="text" placeholder="Eg. Pikachu" />
                            </Col>
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
        )
    }
}
