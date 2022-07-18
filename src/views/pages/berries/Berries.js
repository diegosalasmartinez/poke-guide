import React, { Component } from 'react'
import { 
    Row,
    Alert
} from 'react-bootstrap'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as berryActions from '../../../services/redux/actions/berryActions'
import pagination from '../../../services/models/common/pagination'
import BerryModel from 'src/services/models/BerryModel'
import { arrayToMap } from '../../../utils/common'
import SearchPanel from '../../common/SearchPanel'
import Loader from '../../common/Loader'
import RPagination from '../../../components/RPagination'
import BerryCard from './BerryCard'
import { berryNameList } from './data'

export class Berries extends Component {
    constructor(props){
        super(props);
        this.state = {
            pagination: new pagination(0,20),
            berries: [],
            berriesTotalLength: 0,
            berriesHashMap: {},
            berrySelected: new BerryModel(),
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
        await this.props.getBerries(this.state.pagination);
        const berry = {...this.props.berry};
        const berries = [...berry.berries];
        this.setState({
            berries,
            berriesTotalLength: berry.count,
            berriesHashMap: arrayToMap(berries),
            berrySelected: {...berries[0]}, 
            loaded: !berry.isLoading,
            failed: berry.failed
        });
    }

    onRedirect = (route) => {
        this.props.history.push(route);
    }

    setActualBerry = async (berry) => {
        await this.props.setActualBerry(berry);
    }

    render() {
        const { failed, loaded, berries, berriesTotalLength, pageSelected, pagination } = this.state;

        return (
            <div className="content">
                { failed && <Alert variant="warning">Hubo un problema al conectarse con el servidor</Alert> }
                { !failed && loaded &&
                    <>
                        <SearchPanel title="Type a berry" path="berries" options={berryNameList} onRedirect={this.onRedirect}/>
                        { berries && berries.length > 0 ?
                            <>
                                <Row className="panel items">
                                    {berries.map(berry => <BerryCard key={berry.id} berry={berry} setActualBerry={this.setActualBerry}/>)}
                                </Row>
                                <RPagination itemsLength={berriesTotalLength} pageSelected={pageSelected} pagination={pagination} onClickPage={this.onClickPage} />
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
        berry: state.berry
    }
}

const mapDispatchToProps = dispatch => {
    return {
        ...bindActionCreators(berryActions, dispatch)
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(Berries)