import SimpleProperty from './SimpleProperty'

export default class PokemonModel extends SimpleProperty {
    id = 0;
    name = "";
    abilities = [];
    height = 0;
    weight = 0;
    moves = [];
    pokemon = {};
    species = {
        names: []
    };
    sprites = [];
    stats = [];
    types = [];
}
