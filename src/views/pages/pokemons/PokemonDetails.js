import React, { Component } from 'react'
import { Alert } from 'react-bootstrap'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as pokemonActions from '../../../services/redux/actions/pokemonActions'
import PokemonModel from '../../../services/models/PokemonModel'
import Loader from '../../common/Loader'

export class PokemonDetails extends Component {
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
        const { failed, loaded, pokemonName, errorMessage, pokemon } = this.state;
        
        return (
            <>
                { failed && 
                    <Alert variant="warning">{errorMessage}</Alert>
                }
                { !failed && loaded &&
                    <div>
                        Estas viendo la informacion de {pokemonName} 
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
