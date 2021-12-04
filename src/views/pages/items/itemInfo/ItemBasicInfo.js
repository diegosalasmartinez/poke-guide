import React, { Component } from 'react'
import { Col, Row } from 'react-bootstrap'
import { capitalize } from '../../../../utils/common'

export default class ItemBasicInfo extends Component {
    render() {
        const { item } = this.props;
        let flavorText = item.flavor_text_entries.find(flavorText => flavorText.language.name === "en");
        const effect = item.effect_entries.find(e => e.language.name === "en");
        let effectText = effect ? effect.effect : "";
        effectText = effectText.replace('', ' ');
        const attributes = item.attributes.map(a => capitalize(a.name)).join(", ");
        const category = item.category.name;

        return (
            <Row xs="12">
                <Col xs="12" className="mb-4" style={{fontWeight: '300'}}>{flavorText.text || ''}</Col>
                { category && 
                    <Col xs="12" className="mb-4">
                        <Row>
                            <Col xs="2">Category</Col>
                            <Col xs="10" style={{fontWeight: '300'}}>{capitalize(category)}</Col>     
                        </Row>
                    </Col>
                }
                { attributes && 
                    <Col xs="12" className="mb-4">
                        <Row>
                            <Col xs="2">Attributes</Col>
                            <Col xs="10" style={{fontWeight: '300'}}>{attributes}</Col>     
                        </Row>
                    </Col>
                }
                { effectText && 
                    <Col xs="12" className="mb-4">
                        <Row>
                            <Col xs="2">Effect</Col>
                            <Col xs="10" style={{fontWeight: '300'}}>{effectText}</Col>     
                        </Row>
                    </Col>
                }
                <Col xs="12" className="mb-4">
                    <Row>
                        <Col xs="2">Cost</Col>
                        <Col xs="10" style={{fontWeight: '300'}}>{item.cost}</Col>     
                    </Row>
                </Col>
            </Row>
        )
    }
}
