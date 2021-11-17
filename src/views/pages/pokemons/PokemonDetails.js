import React, { Component } from 'react'
import { Alert, Col, Row, Tabs, Tab } from 'react-bootstrap'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as pokemonActions from '../../../services/redux/actions/pokemonActions'
import PrevNextOptions from '../../common/PrevNextOptions'
import PokemonBasicInfo from './pokemonInfo/PokemonBasicInfo'
import PokemonSpritesDisplay from './pokemonInfo/PokemonSpritesDisplay'
import Loader from '../../common/Loader'
import PokemonModel from '../../../services/models/PokemonModel'
import { capitalize } from '../../../utils/common'
import PokemonEvolution from './pokemonInfo/PokemonEvolution'
import { apiCustom } from '../../../services/api/api'
import { getPokemonFormInfoById } from '../../../services/api/pokemon-api'

export class PokemonDetails extends Component {
    constructor(props){
        super(props);
        this.state = {
            evolutionChain: [],
            indexPokemon: 0,
            pokemonName: "",
            pokemon: new PokemonModel(),
            loaded: false,
            failed: false,
            version: "red",
            errorMessage: ""
        }
    }

    async componentDidMount() {
        const pokemonName = this.props.match.params.name;
        await this.getPokemonInfo(pokemonName);
    }

    async componentDidUpdate(prevProps) {
        if (this.props.match.params.name !== prevProps.match.params.name) {
            await this.getPokemonInfo(this.props.match.params.name);
        }
    }

    getPokemonInfo = async (pokemonName) => {
        this.setState({ loaded: false, failed: false });
        await this.props.getPokemonByName(pokemonName);
        const index = this.getPokemonIndex(pokemonName);

        this.setState({
            indexPokemon: index,
            pokemonName, 
            pokemon: {...this.props.pokemon.actualPokemon}
        }, async () => {
            const res = await apiCustom(this.props.pokemon.actualPokemon.species.evolution_chain.url)
            const { chain } = res;
            let evolutionChain = [];
            let chainIterative = chain;
            while (true) {
                const idPokemon = chainIterative.species.url.slice(42, chainIterative.species.url.length - 1);
                const pokemonChain = await getPokemonFormInfoById(idPokemon); 
                evolutionChain = [...evolutionChain, pokemonChain];

                if (chainIterative.evolves_to && chainIterative.evolves_to.length > 0) {
                    chainIterative = chainIterative.evolves_to[0];
                } else {
                    break;
                }
            }

            this.setState({
                evolutionChain: evolutionChain,
                loaded: !this.props.pokemon.isLoading,
                failed: this.props.pokemon.failed,
                errorMessage: this.props.pokemon.errorMessage
            });
        });
    }

    getPokemonIndex = (pokemonName) => {
        const { pokemonNameList = [] } = this.props.pokemon;
        for (let i=0; i<pokemonNameList.length; i++) {
            if (pokemonNameList[i] === pokemonName) return i;
        }
        return -1;
    } 

    onClickPrevNext = (prev, disable) => {
        if (!disable) {
            const { pokemonNameList = [] } = this.props.pokemon;
            if (prev) {
                this.props.history.push("/pokedex/" + pokemonNameList[this.state.indexPokemon - 1]);
            } else {
                this.props.history.push("/pokedex/" + pokemonNameList[this.state.indexPokemon + 1]);
            }
        }
    }

    render() {
        const { failed, loaded, errorMessage, pokemon, version, evolutionChain, indexPokemon } = this.state;
        const { pokemonNameList = [] } = this.props.pokemon;
        const nId = pokemon.id.toString().padStart(3, "0");
        const title = "N°" + nId + " - " + capitalize(pokemon.name);

        return (
            <>
                { failed && 
                    <Alert variant="warning">{errorMessage}</Alert>
                }
                { !failed && loaded &&
                    <>
                        <PrevNextOptions title={title} index={indexPokemon} size={pokemonNameList.length} onClickPrevNext={this.onClickPrevNext}/>
                        <Row className="pokemon_details">
                            <Col className="pokemon_details_img" xs="4">
                                <PokemonSpritesDisplay sprites={pokemon.sprites}/>
                            </Col>
                            <Col className="pokemon_details_info" xs="8">
                                <Tabs id="pokemon_details_tab" className="mb-3">
                                    <Tab eventKey="basic_info" title="Basic Info">
                                        <PokemonBasicInfo pokemon={pokemon} version={version}/>
                                    </Tab>
                                    <Tab eventKey="moves" title="Moves">
                                        <div>In construction.</div>
                                    </Tab>
                                    <Tab eventKey="extended_info" title="Extended Info">
                                        <div>In construction.</div>
                                    </Tab>
                                </Tabs>
                            </Col>
                        </Row>
                        <PokemonEvolution chain={evolutionChain}/>
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
