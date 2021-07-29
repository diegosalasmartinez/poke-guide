import React, { Component } from 'react'
import { Pagination } from 'react-bootstrap'

export default class RPagination extends Component {
    render() {
        const { items = [], indexSelected = 0 } = this.props;

        return (
            <Pagination>
                {items.map((item, index) => 
                    <Pagination.Item key={index} active={index === indexSelected}>
                        {index}
                    </Pagination.Item>
                )}
            </Pagination>
        )
    }
}
