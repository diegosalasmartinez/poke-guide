import React, { Component } from 'react'
import { 
    Row,
    Alert
} from 'react-bootstrap'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as itemActions from '../../../services/redux/actions/itemActions'
import pagination from '../../../services/models/common/pagination'
import ItemModel from '../../../services/models/ItemModel'
import { arrayToMap } from '../../../utils/common'
import SearchPanel from '../../common/SearchPanel'
import Loader from '../../common/Loader'
import RPagination from '../../../components/RPagination'
// import ItemCard from './ItemCard'


export class Berries extends Component {
    render() {
        return (
            <div>
                soy una bierrieef sefes
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        berrie: state.berrie
    }
}

const mapDispatchToProps = dispatch => {
    return {
        // ...bindActionCreators(itemActions, dispatch)
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(Berries)