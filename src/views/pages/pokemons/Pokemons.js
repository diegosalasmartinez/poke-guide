import React, { Component } from 'react'
import { 
    Image, 
    Row,
    Col
} from 'react-bootstrap'
import {
    RButton,
    RTable
} from '../../../components'
import Loader from '../../../views/common/Loader'
import { apiCustom } from '../../../services/api/api'
import { getPokemons } from '../../../services/api/pokemon-api'
import pagination from '../../../services/models/common/pagination'
import PokemonModel from '../../../services/models/PokemonModel'
import { arrayToMap, capitalize } from '../../../utils/common'
import PokemonPrevisualization from './PokemonPrevisualization'
import RPagination from 'src/components/RPagination'

export default class Pokemons extends Component {
    constructor(props){
        super(props);
        this.state = {
            pagination: new pagination(0,20),
            pokemons: [],
            pokemonsHashMap: {},
            pokemonSelected: new PokemonModel(),
            loaded: false
        }
    }

    async componentDidMount(){
        const res = await getPokemons(this.state.pagination);
        let pokemons = [];
        for(let i=0; i<res.results.length; i++){
            const newPokemon = await apiCustom(res.results[i].url);
            pokemons = [...pokemons, {...newPokemon}];
        }
        this.setState({
            pokemons, 
            pokemonsHashMap: arrayToMap(pokemons),
            pokemonSelected: {...pokemons[0]}, 
            loaded: true
        });
    }
    
    prepareData = () => {
        const pokemons = [...this.state.pokemons];
        let pokemonsList = [];
        for(let i=0; i<pokemons.length; i++){
            const obj = {
                id: pokemons[i].id,
                name: capitalize(pokemons[i].name),
                height: pokemons[i].height,
                weight: pokemons[i].weight,
                photo_url: pokemons[i].sprites.front_default,
            }
            pokemonsList = [...pokemonsList, {...obj}];
        }
        return pokemonsList;
    }

    onClickPokemon = (idPokemon = 1) => {
        console.log("Ah sos tu mi pana", idPokemon);
    }
    
    onClickCellPokemon = (idPokemon = 1) => {
        const pokemonSelected = this.state.pokemonsHashMap[idPokemon];
        this.setState({pokemonSelected});
    }

    render() {
        const { loaded, pokemonSelected } = this.state;
        const headers = ["N°", "Name", "Height", "Weight", "Photo"];
        const fieldNames = ["id", "name", "height", "weight", "photo", "showDetails"];
        const pokemons = this.prepareData();

        return (
            <>
                {loaded ? 
                    <Row>
                        <Col xs="7">
                            <RTable 
                                className="pokemon_table"
                                headers={headers} 
                                fieldNames={fieldNames} 
                                items={pokemons}
                                clickeable={true}
                                onClickCell={this.onClickCellPokemon}
                                scopedSlots={{
                                    "photo": (item) => (
                                        <Image src={item.photo_url} height="50px"/>
                                    ),
                                    "showDetails": (item) => (
                                        <RButton onClick={() => this.onClickPokemon(item.id)}>See more</RButton>
                                    ),
                                }}
                            />
                            <RPagination/>
                        </Col>
                        <Col xs="5">
                            <PokemonPrevisualization pokemon={pokemonSelected}/>
                        </Col>
                    </Row>
                    :
                    <Loader></Loader>
                }
            </>
        )
    }
}
