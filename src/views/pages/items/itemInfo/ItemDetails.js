import React, { Component } from 'react'
import { Alert, Col, Row } from 'react-bootstrap'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as itemActions from '../../../../services/redux/actions/itemActions'
import ItemModel from '../../../../services/models/ItemModel'
import PrevNextOptions from '../../../common/PrevNextOptions'
import SpriteDisplay from '../../../common/SpriteDisplay'
import ItemBasicInfo from './ItemBasicInfo'
import Loader from '../../../common/Loader'
import { itemNameList } from '../data'

export class ItemDetails extends Component {
    constructor(props){
        super(props);
        this.state = {
            indexItem: 0,
            itemName: "",
            item: new ItemModel(),
            loaded: false,
            failed: false,
            version: "red",
            errorMessage: ""
        }
    }

    async componentDidMount() {
        await this.getItemInfo(this.props.match.params.name);
    }

    async componentDidUpdate(prevProps) {
        if (this.props.match.params.name !== prevProps.match.params.name) {
            await this.getItemInfo(this.props.match.params.name);
        }
    }

    async getItemInfo(itemName) {
        this.setState({loaded: false, failed: false})

        const index = this.getItemIndex(itemName);
        if (index >= 0) {
            await this.props.getItemByNameOrId(itemName);
            this.setState({
                item: this.props.item.actualItem, 
                indexItem: index,
                loaded: true, 
                failed: false
            });
        } else {
            await this.props.setErrorItem();
            this.setState({
                loaded: !this.props.item.isLoading, 
                failed: this.props.item.failed,
                errorMessage: this.props.item.errorMessage
            });
        }
    }

    getItemIndex = (itemName) => {
        for (let i=0; i<itemNameList.length; i++) {
            if (itemNameList[i] === itemName) return i;
        }
        return -1;
    }

    onClickPrevNext = async (prev, disable) => {
        if (!disable) {
            if (prev) {
                this.props.history.push("/items/" + itemNameList[this.state.indexItem - 1]);
            } else {
                this.props.history.push("/items/" + itemNameList[this.state.indexItem + 1]);
            }
        }
    }

    render() {
        const { failed, loaded, errorMessage, item, indexItem } = this.state;
        const nId = item.id.toString().padStart(3, "0");
        const name = item.names.find(name => name.language.name === "en") ? item.names.find(name => name.language.name === "en").name : '';
        const title = "N??" + nId + " - " + name;

        return (
            <>
                { failed && 
                    <Alert variant="warning">{errorMessage}</Alert>
                }
                { !failed && loaded &&
                    <div className="content">
                        <PrevNextOptions title={title} index={indexItem} size={itemNameList.length} onClickPrevNext={this.onClickPrevNext}/>
                        <Row className="details">
                            <Col className="details_img" xs="12" md="4">
                                <SpriteDisplay sprite={item.sprites}/>
                            </Col>
                            <Col className="details_info" xs="12" md="8">
                                <ItemBasicInfo item={item}/>
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
        item: state.item
    }
}

const mapDispatchToProps = dispatch => {
    return {
        ...bindActionCreators(itemActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemDetails)
