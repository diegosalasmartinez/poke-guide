import React, { Component } from 'react'
import { Image, FormCheck } from 'react-bootstrap'

export default class PokemonSpritesDisplay extends Component {
    constructor(props){
        super(props);
        this.state = {
            shinySprite: false
        }
    }
    onChangeType = () => (e) => {
        const value = e.target.checked;
        this.setState({shinySprite: value});
    }

    render() {
        const { sprites } = this.props;
        const { shinySprite } = this.state;
        const sprite = shinySprite ? sprites.front_shiny : sprites.front_default;

        return (
            <div className="pokemon_sprites">
                { sprites.front_shiny &&
                    <FormCheck 
                        id="selectShinySprite" 
                        type="switch"
                        checked={shinySprite}
                        onChange={this.onChangeType()}
                        label="Shiny"
                    />
                }
                <Image src={sprite}></Image>
            </div>
        )
    }
}
