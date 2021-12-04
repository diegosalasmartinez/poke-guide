import React, { Component } from 'react'
import { Col, Row } from 'react-bootstrap'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as itemActions from '../../../../services/redux/actions/itemActions'
import ItemModel from '../../../../services/models/ItemModel'
import PrevNextOptions from '../../../common/PrevNextOptions'
import SpriteDisplay from '../../../common/SpriteDisplay'
import ItemBasicInfo from './ItemBasicInfo'
import Loader from '../../../common/Loader'
import { capitalize } from '../../../../utils/common'

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

    componentDidMount() {
        const index = this.getItemIndex(this.props.item.actualItem.name);
        this.setState({
            item: this.props.item.actualItem, 
            indexItem: index,
            loaded: true, 
            failed: false
        });
    }

    async componentDidUpdate(prevProps) {
        if (this.props.match.params.name !== prevProps.match.params.name) {
            this.setState({loaded: false, failed: false})
            await this.props.getItemByNameOrId(this.props.match.params.name);
            const index = this.getItemIndex(this.props.item.actualItem.name);
            this.setState({
                item: this.props.item.actualItem, 
                indexItem: index,
                loaded: true, 
                failed: false
            });
        }
    }

    getItemIndex = (itemName) => {
        const { itemNameList = [] } = this.props.item;
        for (let i=0; i<itemNameList.length; i++) {
            if (itemNameList[i] === itemName) return i;
        }
        return -1;
    }

    onClickPrevNext = async (prev, disable) => {
        if (!disable) {
            const { itemNameList = [] } = this.props.item;
            if (prev) {
                this.props.history.push("/items/" + itemNameList[this.state.indexItem - 1]);
            } else {
                this.props.history.push("/items/" + itemNameList[this.state.indexItem + 1]);
            }
        }
    }

    render() {
        const { failed, loaded, item, indexItem } = this.state;
        const { itemNameList = [] } = this.props.item;
        const nId = item.id.toString().padStart(3, "0");
        const name = item.names.find(name => name.language.name === "en") ? item.names.find(name => name.language.name === "en").name : '';
        const title = "N°" + nId + " - " + name;

        return (
            <>
                { !failed && loaded &&
                    <>
                        <PrevNextOptions title={title} index={indexItem} size={itemNameList.length} onClickPrevNext={this.onClickPrevNext}/>
                        <Row className="details">
                            <Col className="details_img" xs="4">
                                <SpriteDisplay sprite={item.sprites}/>
                            </Col>
                            <Col className="details_info" xs="8">
                                <ItemBasicInfo item={item}/>
                            </Col>
                        </Row>
                    </>
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
