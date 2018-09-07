import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
    Container,
    Row,
    Col,
    Button,
} from 'reactstrap';

import * as roomsSelector from "../store/rooms/reducer";
import * as roomsActions from "../store/rooms/actions";

class Compass extends Component {
    goToRoom = (roomId) => () => {
        this.props.dispatch(roomsActions.getRoom(roomId));
    };

    button(title, exit) {
        return <Button
            color="primary"
            title={exit}
            disabled={!exit}
            onClick={this.goToRoom(exit).bind(this)}
            block
        >
            {title}
        </Button>
    }

    render() {
        const room = this.props.room || {};
        const exits = room.exits || {};
        console.log(room, exits);

        return (<Container>
            <Row>
                <Col xs="3" className="p-0">&nbsp;</Col>
                <Col xs="3" className="p-0">
                    {this.button('North', exits.north)}
                </Col>
                <Col xs="3" className="p-0">&nbsp;</Col>
                <Col xs="3" className="p-0">
                    {this.button('Up', exits.up)}
                </Col>
            </Row>
            <Row>
                <Col xs="3" className="p-0">
                    {this.button('West', exits.west)}
                </Col>
                <Col xs="3" className="p-0">&nbsp;</Col>
                <Col xs="3" className="p-0">
                    {this.button('East', exits.east)}
                </Col>
                <Col xs="3" className="p-0">&nbsp;</Col>
            </Row>
            <Row>
                <Col xs="3" className="p-0">&nbsp;</Col>
                <Col xs="3" className="p-0">
                    {this.button('South', exits.south)}
                </Col>
                <Col xs="3" className="p-0">&nbsp;</Col>
                <Col xs="3" className="p-0">
                    {this.button('Down', exits.down)}
                </Col>
            </Row>
        </Container>);
    }
}

function mapStateToProps(state) {
    return {
        room: roomsSelector.getRoom(state)
    };
}

export default connect(mapStateToProps)(Compass);
