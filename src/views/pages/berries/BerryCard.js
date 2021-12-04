import React, { Component } from 'react'
import { Image, Col } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons'
import { capitalize } from '../../../utils/common'

class BerryCard extends Component {
    onClickSeeMore = () => {
        this.props.setActualBerry(this.props.berry);
        this.props.history.push("/berries/"+this.props.berry.name);
    }

    render() {
        const { berry } = this.props;
        const nId = berry.id.toString().padStart(3, "0");
        const name = berry.item.names.find(name => name.language.name === "en") ? berry.item.names.find(name => name.language.name === "en").name : '';

        return (
            <Col xs="6" sm="6" md="4" xl="3" className="m-auto">
                <div className="berry_card">
                    <div className="berry_card_img_container">
                        <div className="berry_card_img">
                            <Image src={berry.item.sprites.default}></Image>
                        </div>
                    </div>
                    <div className="berry_card_info">
                        <div className="berry_card_info_title">
                            <span>N°{nId} -</span> {capitalize(name)}
                        </div>
                    </div>
                    <div className="berry_card_btn" onClick={this.onClickSeeMore}>
                        <FontAwesomeIcon icon={faAngleDoubleRight}/>
                    </div>
                </div>
            </Col>
        )
    }
}

export default withRouter(BerryCard)
