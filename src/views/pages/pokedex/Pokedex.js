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
import SearchPanel from 'src/views/common/SearchPanel'

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
        if (!this.props.pokemon.allPokemonsFetched) {
            await this.props.getAllPokemonName();
        }
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

    onRedirect = (route) => {
        this.props.history.push(route);
    }

    render() {
        const { failed, loaded, pokemons, pokemonsTotalLength, pageSelected, pagination } = this.state;
        const { pokemonNameList } = this.props.pokemon;

        return (
            <div className="content">
                { failed && <Alert variant="warning">Hubo un problema al conectarse con el servidor</Alert> }
                { !failed && loaded &&
                    <>
                        <SearchPanel options={pokemonNameList} onRedirect={this.onRedirect}/>
                        { pokemons && pokemons.length > 0 ?
                            <Row className="panel pokedex">
                                {pokemons.map(pokemon => <PokemonCard key={pokemon.id} pokemon={pokemon}/>)}
                                <RPagination itemsLength={pokemonsTotalLength} pageSelected={pageSelected} pagination={pagination} onClickPage={this.onClickPage} />
                            </Row>
                            :
                            <Alert color="info">No se encontraron resultados.</Alert>
                        }
                    </>
                }
                { !failed && !loaded && <Loader></Loader> }
            </div>
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
