import React, { Component } from 'react'
import { Alert, Col, Row, Image, Tabs, Tab } from 'react-bootstrap'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as pokemonActions from '../../../services/redux/actions/pokemonActions'
import PanelPrevNextOptions from '../../common/PanelPrevNextOptions'
import PokemonBasicInfo from './PokemonBasicInfo'
import Loader from '../../common/Loader'
import PokemonModel from '../../../services/models/PokemonModel'

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

        return (
            <>
                { failed && 
                    <Alert variant="warning">{errorMessage}</Alert>
                }
                { !failed && loaded &&
                    <div>
                        <PanelPrevNextOptions/>
                        <Row className="pokemon_details">
                            <Col className="pokemon_details_img">
                                <Image src={pokemon.sprites.front_default}></Image>
                            </Col>
                            <Col className="pokemon_details_info">
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
                    </div>
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
