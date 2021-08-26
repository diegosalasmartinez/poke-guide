import React, { Component } from 'react'
import { 
    Image, 
    Col,
    Badge
} from 'react-bootstrap'
import { withRouter } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons'
import { getColorType } from '../../../utils/types';
import { capitalize } from '../../../utils/common'


class PokemonCard extends Component {
    onClickSeeMore = () => {
        this.props.history.push("/pokedex/"+this.props.pokemon.name);
    }

    render() {
        const { pokemon } = this.props;
        const nId = pokemon.id.toString().padStart(3, "0");

        return (
            <Col xs="12" sm="6" md="4" xl="3" className="m-auto">
                <div className="pokemon_card">
                    <div className="pokemon_card_img_container">
                        <div className="pokemon_card_img">
                            <Image src={pokemon.sprites.front_default}></Image>
                        </div>
                    </div>
                    <div className="pokemon_card_info">
                        <div className="pokemon_card_info_title">
                            <span>N°{nId} -</span> {capitalize(pokemon.name)}
                        </div>
                        <div className="types">
                            {pokemon.types.map(type => 
                                <Badge key={type.slot} style={{backgroundColor: getColorType(type.type.name)}}>
                                    {type.type.name.toUpperCase()}
                                </Badge>  
                            )}
                        </div>
                    </div>
                    <div className="pokemon_card_btn" onClick={this.onClickSeeMore}>
                        <FontAwesomeIcon icon={faAngleDoubleRight}/>
                    </div>
                </div>
            </Col>
        )
    }
}

export default withRouter(PokemonCard)