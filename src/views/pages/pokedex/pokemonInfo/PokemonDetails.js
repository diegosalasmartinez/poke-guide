import React, { Component } from 'react'
import { Alert, Col, Row } from 'react-bootstrap'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as pokemonActions from '../../../../services/redux/actions/pokemonActions'
import PrevNextOptions from '../../../common/PrevNextOptions'
import PokemonBasicInfo from './PokemonBasicInfo'
import PokemonSpritesDisplay from './PokemonSpritesDisplay'
import Loader from '../../../common/Loader'
import PokemonModel from '../../../../services/models/PokemonModel'
import { capitalize } from '../../../../utils/common'
import PokemonEvolution from './PokemonEvolution'
import { apiCustom } from '../../../../services/api/api'
import { getPokemonFormInfoById } from '../../../../services/api/pokemon-api'

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
            const evolutionChainRes = await apiCustom(this.state.pokemon.species.evolution_chain.url)
            const { chain } = evolutionChainRes;
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

            let pokemonUpdated = {...this.state.pokemon};
            let abilitiesUpdated = [...pokemonUpdated.abilities];
            for (let i=0; i<this.state.pokemon.abilities.length; i++) {
                const abilityRes = await apiCustom(this.state.pokemon.abilities[i].ability.url);
                abilitiesUpdated[i] = {...abilitiesUpdated[i], ability: {...abilityRes}};
            }
            pokemonUpdated.abilities = abilitiesUpdated;
            this.setState({
                pokemon: pokemonUpdated,
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
        const name = pokemon.species.names.find(e => e.language.name === "en") ? pokemon.species.names.find(e => e.language.name === "en").name : '';
        const title = "N°" + nId + " - " + capitalize(name);

        return (
            <>
                { failed && 
                    <Alert variant="warning">{errorMessage}</Alert>
                }
                { !failed && loaded &&
                    <div className="panel-details">
                        <PrevNextOptions title={title} index={indexPokemon} size={pokemonNameList.length} onClickPrevNext={this.onClickPrevNext}/>
                        <Row className="details">
                            <Col className="details_img" xs="12" md="4">
                                <PokemonSpritesDisplay sprites={pokemon.sprites}/>
                            </Col>
                            <Col className="details_info" xs="12" md="8">
                                <PokemonBasicInfo pokemon={pokemon} version={version}/>
                            </Col>
                        </Row>
                        <PokemonEvolution chain={evolutionChain}/>
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
