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
import ItemCard from './ItemCard'
import { itemNameList } from './data'

export class Items extends Component {
    constructor(props){
        super(props);
        this.state = {
            pagination: new pagination(0,20),
            items: [],
            itemsTotalLength: 0,
            itemsHashMap: {},
            itemSelected: new ItemModel(),
            pageSelected: 1,
            loaded: false,
            failed: false
        }
    }

    async componentDidMount(){
        await this.loadList();
    }

    onClickPage = (indexPage) => {
        const { pagination } = this.state;
        let paginationUpdated = {...pagination};
        paginationUpdated.offset = paginationUpdated.limit * (indexPage - 1);
        this.setState({ pagination: paginationUpdated, pageSelected: indexPage }, async function(){
            await this.loadList();
        })
    }

    loadList = async () => {
        this.setState({loaded: false, failed: false});
        await this.props.getItems(this.state.pagination);
        const item = {...this.props.item};
        const items = [...item.items];
        this.setState({
            items,
            itemsTotalLength: item.count,
            itemsHashMap: arrayToMap(items),
            itemSelected: {...items[0]}, 
            loaded: !item.isLoading,
            failed: item.failed
        });
    }

    onRedirect = (route) => {
        this.props.history.push(route);
    }

    setActualItem = async (item) => {
        await this.props.setActualItem(item);
    }

    render() {
        const { failed, loaded, items, itemsTotalLength, pageSelected, pagination } = this.state;

        return (
            <div className="content">
                { failed && <Alert variant="warning">Hubo un problema al conectarse con el servidor</Alert> }
                { !failed && loaded &&
                    <>
                        <SearchPanel title="Type an item" path="items" options={itemNameList} onRedirect={this.onRedirect}/>
                        { items && items.length > 0 ?
                            <>
                                <Row className="panel items">
                                    {items.map(item => <ItemCard key={item.id} item={item} setActualItem={this.setActualItem}/>)}
                                </Row>
                                <RPagination itemsLength={itemsTotalLength} pageSelected={pageSelected} pagination={pagination} onClickPage={this.onClickPage} />
                            </>
                            :
                            <Alert color="info">No se encontraron resultados.</Alert>
                        }
                    </>
                }
                { !failed && !loaded && <Loader></Loader> }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        item: state.item
    }
}

const mapDispatchToProps = dispatch => {
    return {
        ...bindActionCreators(itemActions, dispatch)
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(Items)