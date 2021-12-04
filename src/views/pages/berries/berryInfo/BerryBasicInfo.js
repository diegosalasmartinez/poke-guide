import React, { Component } from 'react'
import { Col, Row } from 'react-bootstrap'
import { capitalize } from '../../../../utils/common'

export default class BerryBasicInfo extends Component {
    render() {
        const { berry } = this.props;
        const { item } = berry;
        let flavorText = item.flavor_text_entries.find(flavorText => flavorText.language.name === "en");
        const effect = item.effect_entries.find(e => e.language.name === "en");
        let effectText = effect ? effect.effect : "";
        effectText = effectText.replace('', ' ');
        const attributes = item.attributes.map(a => capitalize(a.name)).join(", ");
        const category = item.category.name;
        const flavors = berry.flavors.filter(f => f.potency !== 0).map(f => 
            capitalize(f.flavor.name) + " ( Potency: " + f.potency + " )").join(", ");
            
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
                        <Col xs="2">Flavors</Col>
                        <Col xs="10" style={{fontWeight: '300'}}>{flavors}</Col>     
                    </Row>
                </Col>
                <Col xs="6" className="mb-4">
                    <Row>
                        <Col xs="4">Cost</Col>
                        <Col xs="8" style={{fontWeight: '300'}}>{item.cost}</Col>     
                    </Row>
                </Col>
                <Col xs="6" className="mb-4">
                    <Row>
                        <Col xs="4">Growth Time</Col>
                        <Col xs="8" style={{fontWeight: '300'}}>{berry.growth_time} hours</Col>     
                    </Row>
                </Col>
                <Col xs="6" className="mb-4">
                    <Row>
                        <Col xs="4">Max Harvest</Col>
                        <Col xs="8" style={{fontWeight: '300'}}>{berry.max_harvest} units</Col>     
                    </Row>
                </Col>
                <Col xs="6" className="mb-4">
                    <Row>
                        <Col xs="4">Size</Col>
                        <Col xs="8" style={{fontWeight: '300'}}>{berry.size} mm</Col>     
                    </Row>
                </Col>
            </Row>
        )
    }
}
