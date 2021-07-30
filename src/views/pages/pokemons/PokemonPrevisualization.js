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
import { getColorType } from '../../../utils/types';
import { capitalize, statsList } from '../../../utils/common'

export default class PokemonPrevisualization extends Component {
    render() {
        const { pokemon } = this.props;

        return (
            <Card>
                <Card.Body>
                    <Row>
                        <Col>
                            <Card.Title>
                                {capitalize(pokemon.name)}
                                <Button className="pokemon_prev" onClick={this.onClickSeeMore}>
                                    <Link to={"/pokemons/"+pokemon.name}>Ver más</Link>
                                </Button>
                            </Card.Title>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="6">
                            <Image className="pokemon_prev_img" src={pokemon.sprites.front_default} height="200px"></Image>
                        </Col>
                        <Col xs="6">
                            {pokemon.stats.map((stat, index) => 
                                <Row key={index} className="mb-0">
                                    <Card.Text className="mb-0" style={{width: "85px"}}>
                                        <b>{statsList[index]}:</b>
                                    </Card.Text>
                                    <Card.Text className="mb-0" style={{width: "55px", textAlign: "right"}}>
                                        {stat.base_stat}
                                    </Card.Text>
                                </Row>
                            )}
                            <Card.Text className="mt-2">
                                {pokemon.types.map(type => 
                                    <Badge key={type.slot} style={{marginRight: "5px", backgroundColor: getColorType(type.type.name)}}>
                                        {type.type.name.toUpperCase()}
                                    </Badge>  
                                )}
                            </Card.Text>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        )
    }
}
