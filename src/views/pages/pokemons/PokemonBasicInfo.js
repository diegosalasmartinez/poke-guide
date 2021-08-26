import React, { Component } from 'react'

export default class PokemonBasicInfo extends Component {
    render() {
        const { pokemon, version } = this.props;
        const { species } = pokemon;
        let flavorText = species.flavor_text_entries.find(flavorText => flavorText.language.name === "en" && flavorText.version.name === version);
        flavorText = flavorText && flavorText.flavor_text || "";
        flavorText = flavorText.replace('', ' ');

        return (
            <div>
                {flavorText}
            </div>
        )
    }
}
