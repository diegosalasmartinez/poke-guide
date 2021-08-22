import React, { Component } from 'react'
import { 
    Row,
    Alert
} from 'react-bootstrap'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as pokemonActions from '../../../services/redux/actions/pokemonActions'
import Loader from '../../../views/common/Loader'
import pagination from '../../../services/models/common/pagination'
import PokemonModel from '../../../services/models/PokemonModel'
import PokemonCard from './../pokemons/PokemonCard'
import { arrayToMap } from '../../../utils/common'
import RPagination from '../../../components/RPagination'

export class Pokedex extends Component {
    constructor(props){
        super(props);
        this.state = {
            pagination: new pagination(0,20),
            pokemons: [],
            pokemonsTotalLength: 0,
            pokemonsHashMap: {},
            pokemonSelected: new PokemonModel(),
            pageSelected: 1,
            loaded: false,
            failed: false
        }
    }

    async componentDidMount(){
        await this.loadList();
    }

    onClickPage = (indexPage) => {
        const { pagination } = this.state;
        let paginationUpdated = {...pagination};
        paginationUpdated.offset = paginationUpdated.limit * (indexPage - 1);
        this.setState({ pagination: paginationUpdated, pageSelected: indexPage }, async function(){
            await this.loadList();
        })
    }

    loadList = async () => {
        this.setState({loaded: false, failed: false});
        await this.props.getPokemonsBasicInfo(this.state.pagination);
        const pokemon = {...this.props.pokemon};
        const pokemons = [...pokemon.pokemons];
        this.setState({
            pokemons,
            pokemonsTotalLength: pokemon.count,
            pokemonsHashMap: arrayToMap(pokemons),
            pokemonSelected: {...pokemons[0]}, 
            loaded: !pokemon.isLoading,
            failed: pokemon.failed
        });
    }

    onClickPokemon = (idPokemon = 1) => {
        console.log("Ah sos tu mi pana", idPokemon);
    }

    render() {
        const { failed, loaded, pokemons, pokemonsTotalLength, pageSelected, pagination } = this.state;

        return (
            <>
                { failed && 
                    <Alert variant="warning">Hubo un problema al conectarse con el servidor</Alert>
                }
                { !failed && loaded &&
                    <>
                        {pokemons && pokemons.length > 0 ?
                            <Row>
                                {pokemons.map(pokemon => <PokemonCard key={pokemon.id} pokemon={pokemon}/>)}
                                <RPagination 
                                    itemsLength={pokemonsTotalLength}
                                    pageSelected={pageSelected}
                                    pagination={pagination}
                                    onClickPage={this.onClickPage}
                                />
                            </Row>
                            :
                            <Alert color="info">No se encontraron resultados.</Alert>
                        }
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
  
export default connect(mapStateToProps, mapDispatchToProps)(Pokedex)
