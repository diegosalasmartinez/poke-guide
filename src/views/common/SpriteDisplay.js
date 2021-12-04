import React, { Component } from 'react'
import { Image } from 'react-bootstrap'

export default class SpriteDisplay extends Component {
    render() {
        const { sprite } = this.props;

        return (
            <div className="sprites">
                <Image src={sprite.default}></Image>
            </div>
        )
    }
}
