export default class pagination {
    constructor(offset = '', limit = ''){
        this.offset = offset || 0;
        this.limit = limit || 60;
    }
} 
