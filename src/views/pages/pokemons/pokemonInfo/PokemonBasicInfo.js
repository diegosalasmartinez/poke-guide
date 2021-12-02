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
                <Col>{capitalize(ability.name)}</Col>
                <Col style={{fontWeight: '300'}}>{entry.effect}</Col>
            </Col>
        )
    }

    render() {
        const { pokemon, version } = this.props;
        const { species } = pokemon;
        let flavorText = species.flavor_text_entries.find(flavorText => flavorText.language.name === "en" && flavorText.version.name === version);
        flavorText = flavorText ? flavorText.flavor_text : "";
        flavorText = flavorText.replace('', ' ');

        return (
            <Row xs="12">
                <Col xs="12" className="mb-4" style={{fontWeight: '300'}}>{flavorText}</Col>
                <Col xs="12" className="mb-4">
                    { pokemon.abilities.map(a => this.generateAbilityText(a)) }
                </Col>
                <Col xs="4">
                    <Row className="mb-2">
                        <Col xs="3">Types:</Col>
                        <Col xs="9">
                            { pokemon.types.map(type => 
                                <Badge key={type.slot} style={{backgroundColor: getColorType(type.type.name), marginRight: '1rem'}}>
                                    {type.type.name.toUpperCase()}
                                </Badge>  
                            )}
                        </Col>
                    </Row>
                    <Row className="mb-2">
                        <Col xs="3">Height:</Col>
                        <Col xs="9" style={{fontWeight: '300'}}>{pokemon.height}</Col>
                    </Row>
                    <Row className="mb-2">
                        <Col xs="3">Weight:</Col>
                        <Col xs="9" style={{fontWeight: '300'}}>{pokemon.weight}</Col>
                    </Row>
                </Col>
                <Col xs="8">
                    <Row>
                        <Col xs="12">
                            <Row>
                                { pokemon.stats.map((s, index) => 
                                    <Col xs="6" key={index}>
                                        <Row className="mb-2">
                                            <Col xs="6">{capitalize(s.stat.name) || ''}:</Col>
                                            <Col xs="6" style={{fontWeight: '300'}}>{s.base_stat}</Col>
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
