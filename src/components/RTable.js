import React, { Component } from 'react'
import { 
    Table,
    Image
} from 'react-bootstrap'
import { Button } from 'bootstrap';

export default class RTable extends Component {
    constructor(props){
        super(props);
        this.state = {
            cellNo: 0
        }
    }

    cellsStyle = (index) => {
        return {
            backgroundColor: this.state.cellNo == index ? "rgba(0,255,0,0.3)" : "",
            borderColor: this.state.cellNo == index ? "rgba(0,255,0,0.3)" : ""
        }
    }

    renderObject = (item, fieldName, index) => {
        const { scopedSlots } = this.props;        

        //If fieldName, display as text
        if(item[fieldName]){
            return <td key={index}>{item[fieldName]}</td>
        }
        //If not, search in scopedSlots and display the component
        else if(scopedSlots[fieldName]){
            return <td key={index}>{scopedSlots[fieldName](item)}</td>
        }
        else return null;
    }

    onClickCell = (item, index) => {
        if(this.props.clickeable){
            this.props.onClickCell(item.id)
            this.setState({cellNo: index})
        }
    }

    render() {
        const { headers, fieldNames, items, className, clickeable } = this.props;

        return (
            <Table striped bordered hover responsive className={className}>
                <thead>
                    <tr>
                        {headers.map((header, index) => 
                            <th key={index}>{header}</th>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {items.map((item, index) => 
                        <tr key={item.id} onClick={() => this.onClickCell(item, index)} style={this.cellsStyle(index)}>
                            {headers.map((header, index) => {
                                return this.renderObject(item, fieldNames[index], index);
                            })}
                        </tr>
                    )}
                </tbody>
            </Table>
        )
    }
}
