import React, { Component } from 'react'
import { Col, Row } from 'react-bootstrap'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as berryActions from '../../../../services/redux/actions/berryActions'
import BerryModel from '../../../../services/models/BerryModel'
import PrevNextOptions from '../../../common/PrevNextOptions'
import SpriteDisplay from '../../../common/SpriteDisplay'
import Loader from '../../../common/Loader'
import BerryBasicInfo from './BerryBasicInfo'

export class BerryDetails extends Component {
    constructor(props){
        super(props);
        this.state = {
            indexBerry: 0,
            berryName: "",
            berry: new BerryModel(),
            loaded: false,
            failed: false,
            version: "red",
            errorMessage: ""
        }
    }

    componentDidMount() {
        const index = this.getBerryIndex(this.props.berry.actualBerry.name);
        this.setState({
            berry: this.props.berry.actualBerry, 
            indexBerry: index,
            loaded: true, 
            failed: false
        });
    }

    async componentDidUpdate(prevProps) {
        if (this.props.match.params.name !== prevProps.match.params.name) {
            this.setState({loaded: false, failed: false})
            await this.props.getBerryByNameOrId(this.props.match.params.name);
            const index = this.getBerryIndex(this.props.berry.actualBerry.name);
            this.setState({
                berry: this.props.berry.actualBerry, 
                indexBerry: index,
                loaded: true, 
                failed: false
            });
        }
    }

    getBerryIndex = (berryName) => {
        const { berryNameList = [] } = this.props.berry;
        for (let i=0; i<berryNameList.length; i++) {
            if (berryNameList[i] === berryName) return i;
        }
        return -1;
    }

    onClickPrevNext = async (prev, disable) => {
        if (!disable) {
            const { berryNameList = [] } = this.props.berry;
            if (prev) {
                this.props.history.push("/berries/" + berryNameList[this.state.indexBerry - 1]);
            } else {
                this.props.history.push("/berries/" + berryNameList[this.state.indexBerry + 1]);
            }
        }
    }

    render() {
        const { failed, loaded, berry, indexBerry } = this.state;
        const { berryNameList = [] } = this.props.berry;
        const nId = berry.id.toString().padStart(3, "0");
        const name = berry.item.names.find(name => name.language.name === "en") ? berry.item.names.find(name => name.language.name === "en").name : '';
        const title = "N°" + nId + " - " + name;
        return (
            <>
                { !failed && loaded &&
                    <div className="panel-details">
                        <PrevNextOptions title={title} index={indexBerry} size={berryNameList.length} onClickPrevNext={this.onClickPrevNext}/>
                        <Row className="details">
                            <Col className="details_img" xs="12" md="4">
                                <SpriteDisplay sprite={berry.item.sprites}/>
                            </Col>
                            <Col className="details_info" xs="12" md="8">
                                <BerryBasicInfo berry={berry}/>
                            </Col>
                        </Row>
                    </div>
                }
                { !failed && !loaded &&
                    <Loader></Loader>
                }
            </>
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

export default connect(mapStateToProps, mapDispatchToProps)(BerryDetails)
