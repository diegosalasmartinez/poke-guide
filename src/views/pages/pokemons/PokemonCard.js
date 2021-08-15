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
import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons'
import { getColorType } from '../../../utils/types';
import { capitalize } from '../../../utils/common'


export default class PokemonCard extends Component {
    render() {
        const { pokemon } = this.props;

        return (
            <Col xs="12" sm="6"  md="4" xl="3">
                <Card>
                    <Card.Body>
                        <Row>
                            <Col>
                                <Card.Title className="pokemon_card_title">
                                    <span>
                                        {capitalize(pokemon.name)}
                                    </span>
                                    <Button onClick={this.onClickSeeMore}>
                                        <Link to={"/pokemons/"+pokemon.name}>
                                            <FontAwesomeIcon icon={faAngleDoubleRight}/>
                                        </Link>
                                    </Button>
                                </Card.Title>
                            </Col>
                        </Row>
                        <Row className="m-auto">
                            <Col xs="12" style={{display: "flex"}}>
                                <Image className="pokemon_prev_img m-auto" src={pokemon.sprites.front_default} width="150px"></Image>
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
