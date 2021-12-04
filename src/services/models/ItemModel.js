import SimpleProperty from './SimpleProperty'

export default class ItemModel extends SimpleProperty {
    id = 0;
    name = '';
    names = [];
    sprites = {};
    attributes = [];
    category = {};
    cost = 0;
    effect_entries = [];
    flavor_text_entries = [];
}
