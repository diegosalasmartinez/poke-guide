import React, { Component } from 'react'
import { Alert, Col, Row, Tabs, Tab } from 'react-bootstrap'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as pokemonActions from '../../../services/redux/actions/pokemonActions'
import PrevNextOptions from '../../common/PrevNextOptions'
import PokemonBasicInfo from './PokemonBasicInfo'
import PokemonSpritesDisplay from './PokemonSpritesDisplay'
import Loader from '../../common/Loader'
import PokemonModel from '../../../services/models/PokemonModel'
import { capitalize } from 'src/utils/common'

export class PokemonDetails extends Component {
    constructor(props){
        super(props);
        this.state = {
            pokemonName: "",
            pokemon: new PokemonModel(),
            loaded: false,
            failed: false,
            version: "red",
            errorMessage: ""
        }
    }

    async componentDidMount(){
        const pokemonName = this.props.match.params.name;
        await this.props.getPokemonByName(pokemonName);
        this.setState({
            pokemonName, 
            pokemon: {...this.props.pokemon.actualPokemon},
            loaded: !this.props.pokemon.isLoading,
            failed: this.props.pokemon.failed,
            errorMessage: this.props.pokemon.errorMessage
        });
    }

    render() {
        const { failed, loaded, errorMessage, pokemon, version } = this.state;
        const nId = pokemon.id.toString().padStart(3, "0");

        return (
            <>
                { failed && 
                    <Alert variant="warning">{errorMessage}</Alert>
                }
                { !failed && loaded &&
                    <>
                        <Row>
                            <PrevNextOptions/>
                        </Row>
                        <Row className="pokemon_details">
                            <Col className="pokemon_details_img" xs="4">
                                <div>N°{nId} - {capitalize(pokemon.name)}</div>
                                <PokemonSpritesDisplay sprites={pokemon.sprites}/>
                            </Col>
                            <Col className="pokemon_details_info" xs="8">
                                <Tabs id="pokemon_details_tab" className="mb-3">
                                    <Tab eventKey="basic_info" title="Basic Info">
                                        <PokemonBasicInfo pokemon={pokemon} version={version}/>
                                    </Tab>
                                    <Tab eventKey="moves" title="Moves">
                                        <div>B</div>
                                    </Tab>
                                    <Tab eventKey="extended_info" title="Extended Info">
                                        <div>C</div>
                                    </Tab>
                                </Tabs>
                            </Col>
                        </Row>
                    </>
                }
                { !failed && !loaded &&
                    <Loader></Loader>
                }
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        pokemon: state.pokemon
    }
}

const mapDispatchToProps = dispatch => {
    return {
        ...bindActionCreators(pokemonActions, dispatch)
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(PokemonDetails)
