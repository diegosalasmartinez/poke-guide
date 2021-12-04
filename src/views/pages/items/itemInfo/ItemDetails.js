import React, { Component } from 'react'
import { Col, Row } from 'react-bootstrap'
import { connect } from 'react-redux'
import ItemModel from '../../../../services/models/ItemModel'
import PrevNextOptions from '../../../common/PrevNextOptions'
import Loader from '../../../common/Loader'
import { capitalize } from 'src/utils/common'

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

    getItemIndex = (itemName) => {
        const { itemNameList = [] } = this.props.item;
        for (let i=0; i<itemNameList.length; i++) {
            if (itemNameList[i] === itemName) return i;
        }
        return -1;
    }

    onClickPrevNext = (prev, disable) => {
        if (!disable) {
            const { itemNameList = [] } = this.props.item;
            if (prev) {
                this.props.history.push("/item/" + itemNameList[this.state.indexItem - 1]);
            } else {
                this.props.history.push("/item/" + itemNameList[this.state.indexItem + 1]);
            }
        }
    }

    render() {
        const { failed, loaded, item, indexItem } = this.state;
        const { itemNameList = [] } = this.props.item;
        console.log(item);
        const nId = item.id.toString().padStart(3, "0");
        const title = "N°" + nId + " - " + capitalize(item.name);

        return (
            <>
                { !failed && loaded &&
                    <>
                        <PrevNextOptions title={title} index={indexItem} size={itemNameList.length} onClickPrevNext={this.onClickPrevNext}/>
                        <Row className="pokemon_details">
                            <Col className="pokemon_details_img" xs="4">
                                {/* <PokemonSpritesDisplay sprites={pokemon.sprites}/> */}
                            </Col>
                            <Col className="pokemon_details_info" xs="8">
                                {/* <PokemonBasicInfo pokemon={pokemon} version={version}/> */}
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
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemDetails)
