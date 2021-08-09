import React, { Component } from 'react'
import { 
    Card,
    Image, 
    Row,
    Col,
    Badge,
    Button
} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import { getColorType } from '../../../utils/types';
import { capitalize } from '../../../utils/common'


export default class PokemonCard extends Component {
    render() {
        const { pokemon } = this.props;

        return (
            <Col xs="3">
                <Card>
                    <Card.Body>
                        <Row>
                            <Col>
                                <Card.Title className="pokemon_card_title">
                                    <span>
                                        {capitalize(pokemon.name)}
                                    </span>
                                    <Button onClick={this.onClickSeeMore}>
                                        <Link to={"/pokemons/"+pokemon.name}>{">>"}</Link>
                                    </Button>
                                </Card.Title>
                                <FontAwesomeIcon icon={faCoffee}/>
                            </Col>
                        </Row>
                        <Row className="m-auto">
                            <Col>
                                <Image className="pokemon_prev_img" src={pokemon.sprites.front_default} height="200px"></Image>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Card.Text className="mt-2">
                                    Types:
                                    {pokemon.types.map(type => 
                                        <Badge key={type.slot} style={{marginLeft: "5px", backgroundColor: getColorType(type.type.name)}}>
                                            {type.type.name.toUpperCase()}
                                        </Badge>  
                                    )}
                                </Card.Text>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Col>
        )
    }
}
