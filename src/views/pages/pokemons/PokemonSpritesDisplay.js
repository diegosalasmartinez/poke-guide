import React, { Component } from 'react'
import { Image, Form } from 'react-bootstrap'

export default class PokemonSpritesDisplay extends Component {
    constructor(props){
        super(props);
        this.state = {
            imageMode: 0
        }
    }
    onChangeType = () => (e) => {
        const value = e.target.value;
        this.setState({imageMode: parseInt(value)});
    }

    render() {
        const { sprites } = this.props;
        const { imageMode } = this.state;
        const sprite = imageMode === 0 ? sprites.front_default : sprites.front_shiny;
        
        return (
            <div className="pokemon_sprites">
                {sprites.front_shiny &&
                    <Form.Select className="me-sm-2" id="inlineFormCustomSelect" onChange={this.onChangeType()}>
                        <option value="0">Default</option>
                        <option value="1">Shiny</option>
                    </Form.Select>
                }
                <Image src={sprite}></Image>
            </div>
        )
    }
}
