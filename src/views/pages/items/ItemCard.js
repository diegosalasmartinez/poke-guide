import React, { Component } from 'react'
import { Image, Col } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons'
import { capitalize } from '../../../utils/common'

class ItemCard extends Component {
    onClickSeeMore = () => {
        this.props.setActualItem(this.props.item);
        this.props.history.push("/items/"+this.props.item.name);
    }

    render() {
        const { item } = this.props;
        const nId = item.id.toString().padStart(3, "0");

        return (
            <Col xs="6" sm="6" md="4" xl="3" className="m-auto">
                <div className="item_card">
                    <div className="item_card_img_container">
                        <div className="item_card_img">
                            <Image src={item.sprites.default}></Image>
                        </div>
                    </div>
                    <div className="item_card_info">
                        <div className="item_card_info_title">
                            <span>N°{nId} -</span> {capitalize(item.name)}
                        </div>
                    </div>
                    <div className="item_card_btn" onClick={this.onClickSeeMore}>
                        <FontAwesomeIcon icon={faAngleDoubleRight}/>
                    </div>
                </div>
            </Col>
        )
    }
}

export default withRouter(ItemCard)