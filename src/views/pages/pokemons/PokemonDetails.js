import React, { Component } from 'react'

export default class PokemonDetails extends Component {
    constructor(props){
        super(props);
        this.state = {
            pokemonName: ""
        }
    }

    componentDidMount(){
        this.setState({pokemonName: this.props.match.params.name});
    }

    render() {
        const { pokemonName } = this.state;
        return (
            <div>
                Estas viendo la informacion de {pokemonName} 
            </div>
        )
    }
}
