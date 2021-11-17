import React, { Component } from 'react'
import { Pagination } from 'react-bootstrap'

export default class RPagination extends Component {
    constructor(props){
        super(props);
        this.state = {
            currentIndex: 1
        }
    }

    componentDidMount(){
        this.setState({currentIndex: this.props.pageSelected || 1})
    }

    onClickPage = (indexPage) => {
        this.setState({currentIndex: indexPage});
        this.props.onClickPage(indexPage);
    }

    render() {
        const { itemsLength = 0, pagination } = this.props;
        const indexSelected = this.state.currentIndex;
        const numberPages = Math.ceil(itemsLength / pagination.limit);
        const showFirstPages = indexSelected > 1;
        const showLastPages = indexSelected < numberPages;
        
        return (
            <Pagination>
                <Pagination.First disabled={!showFirstPages} onClick={() => this.onClickPage(1)}/>
                <Pagination.Prev disabled={!showFirstPages} onClick={() => this.onClickPage(indexSelected - 1)}/>
                {indexSelected - 2 > 0 && 
                    <Pagination.Item key={0} active={this.state.currentIndex === (indexSelected - 2)} onClick={() => this.onClickPage(indexSelected - 2)}>
                        {indexSelected - 2}
                    </Pagination.Item>
                }
                {indexSelected - 1 > 0 && 
                    <Pagination.Item key={1} active={this.state.currentIndex === (indexSelected - 1)} onClick={() => this.onClickPage(indexSelected - 1)}>
                        {indexSelected - 1}
                    </Pagination.Item>
                }
                <Pagination.Item key={2} active={this.state.currentIndex === indexSelected} onClick={() => this.onClickPage(indexSelected)}>
                    {indexSelected}
                </Pagination.Item>
                {indexSelected + 1 <= numberPages && 
                    <Pagination.Item key={3} active={this.state.currentIndex === (indexSelected + 1)} onClick={() => this.onClickPage(indexSelected + 1)}>
                        {indexSelected + 1}
                    </Pagination.Item>
                }
                {indexSelected + 2 <= numberPages && 
                    <Pagination.Item key={4} active={this.state.currentIndex === (indexSelected + 2)} onClick={() => this.onClickPage(indexSelected + 2)}>
                        {indexSelected + 2}
                    </Pagination.Item>
                }
                <Pagination.Next disabled={!showLastPages} onClick={() => this.onClickPage(indexSelected + 1)}/>
                <Pagination.Last disabled={!showLastPages} onClick={() => this.onClickPage(numberPages)}/>
            </Pagination>
        )
    }
}
