import React, { Component } from 'react'
import { Button } from 'react-bootstrap'

export default class RButton extends Component {
    render() {
        const { onClick } = this.props;
        const text = this.props.children;
        
        return (
            <Button onClick={onClick}>
                {text}
            </Button>
        )
    }
}
