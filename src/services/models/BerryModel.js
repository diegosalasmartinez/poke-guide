import SimpleProperty from './SimpleProperty'

export default class BerryModel extends SimpleProperty {
    id = 0;
    name = '';
    growth_time = 0;
    max_harvest = 0;
    size = 0;
    smoothness = 0;
    soil_dryness = 0;
    firmness = {};
    flavors = [];
    item = {
        names: []
    };
}
