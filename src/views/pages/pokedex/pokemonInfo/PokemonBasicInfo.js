import React, { Component } from 'react'
import { Badge, Col, Row } from 'react-bootstrap'
import { capitalize } from 'src/utils/common';
import { getColorType } from '../../../../utils/types'

export default class PokemonBasicInfo extends Component {
    generateAbilityText = (a) => {
        const ability = a.ability;
        const entry = ability.effect_entries.find(e => e.language.name === "en");
        return (
            <Col key={a.slot}>
                <Row className="mb-2">
                    <Col xs="4" md="2" style={{fontWeight: '300'}}>{capitalize(ability.name)} </Col>
                    <Col xs="8" md="10" style={{fontWeight: '300'}}>{entry ? entry.effect : "No definition found"}</Col>
                </Row>
            </Col>
        )
    }

    render() {
        const { pokemon } = this.props;
        const { species } = pokemon;
        let flavorText = species.flavor_text_entries.find(flavorText => flavorText.language.name === "en");
        flavorText = flavorText ? flavorText.flavor_text : "";
        flavorText = flavorText.replace('', ' ');
        
        return (
            <Row xs="12">
                <Col xs="12" className="mb-4" style={{fontWeight: '300'}}>{flavorText}</Col>
                { pokemon.abilities && pokemon.abilities.length > 0 && 
                    <Col xs="12" className="mb-4">
                        <Col>Abilities</Col>
                        { pokemon.abilities.map(a => this.generateAbilityText(a)) }
                    </Col>
                }
                <Col xs="12" md="4">
                    <Row className="mb-2">
                        <Col xs="4" md="3">Types:</Col>
                        <Col xs="8" md="9">
                            { pokemon.types.map(type => 
                                <Badge key={type.slot} style={{backgroundColor: getColorType(type.type.name), marginRight: '1rem'}}>
                                    {type.type.name.toUpperCase()}
                                </Badge>  
                            )}
                        </Col>
                    </Row>
                    <Row className="mb-2">
                        <Col xs="4" md="3">Height:</Col>
                        <Col xs="8" md="9" style={{fontWeight: '300'}}>{pokemon.height}</Col>
                    </Row>
                    <Row className="mb-2">
                        <Col xs="4" md="3">Weight:</Col>
                        <Col xs="8" md="9" style={{fontWeight: '300'}}>{pokemon.weight}</Col>
                    </Row>
                </Col>
                <Col xs="12" md="8">
                    <Row>
                        <Col xs="12">
                            <Row>
                                { pokemon.stats.map((s, index) => 
                                    <Col xs="6" key={index}>
                                        <Row className="mb-2">
                                            <Col xs="8" md="6" style={{lineHeight: 'normal'}}>{capitalize(s.stat.name.replace('-', ' ')) || ''}:</Col>
                                            <Col xs="4" md="6" style={{fontWeight: '300'}}>{s.base_stat}</Col>
                                        </Row>
                                    </Col>
                                ) }
                            </Row>
                        </Col>
                    </Row>
                </Col>
            </Row>
        )
    }
}
