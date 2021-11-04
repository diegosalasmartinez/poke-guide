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
                            {/* <Form.Label column sm="6" lg="2"></Form.Label> */}
                            <Col>
                                <Form.Control type="text" placeholder="Enter a pokemon name" />
                            </Col>
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
        )
    }
}
