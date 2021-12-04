import React, { Component } from 'react'
import { 
    Button,
    Row
} from 'react-bootstrap'
import { Hint } from 'react-autocomplete-hint'

export default class SearchPanel extends Component {
    constructor(props){
        super(props);
        this.state = {
            text: ""
        }
    }

    onKeyDown = (e) => {
        if (e.key === 'Enter') {
            this.redirectToPage();
        }
    }
    
    redirectToPage = () => {
        const { path } = this.props;
        this.props.onRedirect("/" + path + "/" + this.state.text);
    }

    render() {
        const { text } = this.state;
        const { options, title = "" } = this.props;

        return (
            <Row className="search-panel">
                <div className="title">{title}</div>
                <div className="input">
                    <Hint options={options} allowTabFill={true}>
                        <input
                            value={text}
                            onChange={e => this.setState({text: e.target.value})}
                            onKeyDown={this.onKeyDown}
                        />
                    </Hint>
                </div>
                <Button className="button" onClick={this.redirectToPage}>Search</Button>
            </Row>
        )
    }
}
