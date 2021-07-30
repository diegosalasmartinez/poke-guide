import React, { Component } from 'react'
import { Alert } from 'react-bootstrap';
import PokemonModel from '../../../services/models/PokemonModel';
import { getPokemonByName } from '../../../services/api/pokemon-api';

export default class PokemonDetails extends Component {
    constructor(props){
        super(props);
        this.state = {
            pokemonName: "",
            pokemon: new PokemonModel(),
            loaded: false,
            failed: false,
            errorMessage: ""
        }
    }

    async componentDidMount(){
        try{
            const pokemonName = this.props.match.params.name;
            const pokemon = await getPokemonByName(pokemonName);
            this.setState({pokemonName, pokemon});
        } catch(e){
            let errorMessage = "Hubo un problema al conectarse con el servidor."
            if(e.response.status === 404){
                errorMessage = "El pokemón no existe"
            }
            this.setState({failed: true, errorMessage})
        }
    }

    render() {
        const { failed, pokemonName, errorMessage } = this.state;

        return (
            <>
                { failed && 
                    <Alert variant="warning">{errorMessage}</Alert>
                }
                <div>
                    Estas viendo la informacion de {pokemonName} 
                </div>
            </>
        )
    }
}
