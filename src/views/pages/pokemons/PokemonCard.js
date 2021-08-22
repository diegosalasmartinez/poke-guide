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
            <Col xs="12" sm="6"  md="4" xl="3" className="m-auto">
                <div className="pokemon_card">
                    <div className="pokemon_card_img_container">
                        <div className="pokemon_card_img">
                            <Image src={pokemon.sprites.front_default}></Image>
                        </div>
                    </div>
                    <div className="pokemon_card_info">
                        <span>
                            {capitalize(pokemon.name)}
                        </span>
                        <div className="types">
                            {pokemon.types.map(type => 
                                <Badge key={type.slot} style={{backgroundColor: getColorType(type.type.name)}}>
                                    {type.type.name.toUpperCase()}
                                </Badge>  
                            )}
                        </div>
                    </div>
                    <div className="pokemon_card_btn">
                        <Link to={"/pokemons/"+pokemon.name} onClick={this.onClickSeeMore}>
                            <FontAwesomeIcon icon={faAngleDoubleRight}/>
                        </Link>
                    </div>
                </div>
            </Col>
        )
    }
}
