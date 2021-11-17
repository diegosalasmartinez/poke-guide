import React, { Component } from 'react'
import { Row } from 'react-bootstrap'

export default class PrevNextOptions extends Component {
    render() {
        const { title, index, size } = this.props;
        const prevClass = "prev " + (index === 0 ? "disable" : " ");
        const nextClass = "next " + (index === (size-1) ? "disable" : " ");

        return (
            <Row>
                <div className="prev_next_options">
                    <div className={prevClass} onClick={() => this.props.onClickPrevNext(true, index === 0)}>Previous</div>
                    <div className="title">{title}</div>
                    <div className={nextClass} onClick={() => this.props.onClickPrevNext(false, index === (size-1))}>Next</div>
                </div>
            </Row>
        )
    }
}
