import React, { Component } from 'react'
import { Alert, Col, Row } from 'react-bootstrap'
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

    async componentDidMount() {
        await this.getBerryInfo(this.props.match.params.name);
    }

    async componentDidUpdate(prevProps) {
        if (this.props.match.params.name !== prevProps.match.params.name) {
            await this.getBerryInfo(this.props.match.params.name);
        }
    }

    async getBerryInfo(berryName) {
        this.setState({loaded: false, failed: false})

        const index = this.getBerryIndex(berryName);
        if (index >= 0) {
            await this.props.getBerryByNameOrId(berryName);
            this.setState({
                berry: this.props.berry.actualBerry, 
                indexItem: index,
                loaded: true, 
                failed: false
            });
        } else {
            await this.props.setErrorBerry();
            this.setState({
                loaded: !this.props.berry.isLoading, 
                failed: this.props.berry.failed,
                errorMessage: this.props.berry.errorMessage
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
        const { failed, loaded, errorMessage, berry, indexBerry } = this.state;
        const { berryNameList = [] } = this.props.berry;
        const nId = berry.id.toString().padStart(3, "0");
        const name = berry.item.names.find(name => name.language.name === "en") ? berry.item.names.find(name => name.language.name === "en").name : '';
        const title = "N°" + nId + " - " + name;
        return (
            <>
                { failed && 
                    <Alert variant="warning">{errorMessage}</Alert>
                }
                { !failed && loaded &&
                    <div className="content">
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
