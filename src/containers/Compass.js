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

class CompassButton extends Component {
    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        const {
            dispatch,
            exit,
        } = this.props;
        dispatch(roomsActions.getRoom(exit));
    };

    render() {
        const {
            exit,
            children,
        } = this.props;
        return (
            <Button
                color="primary"
                title={exit}
                disabled={!exit}
                onClick={this.onClick}
                block
            >
                {children}
            </Button>
        );
    }
}

class Compass extends Component {
    render() {
        const room = this.props.room || {};
        const exits = room.exits || {};
        console.log(room, exits);

        return (
            <Container>
                <Row>
                    <Col xs="3" className="p-0">&nbsp;</Col>
                    <Col xs="3" className="p-0">
                        <CompassButton exit={exits.north}>North</CompassButton>
                    </Col>
                    <Col xs="3" className="p-0">&nbsp;</Col>
                    <Col xs="3" className="p-0">
                        <CompassButton exit={exits.up}>Up</CompassButton>
                    </Col>
                </Row>
                <Row>
                    <Col xs="3" className="p-0">
                        <CompassButton exit={exits.west}>West</CompassButton>
                    </Col>
                    <Col xs="3" className="p-0">&nbsp;</Col>
                    <Col xs="3" className="p-0">
                        <CompassButton exit={exits.east}>East</CompassButton>
                    </Col>
                    <Col xs="3" className="p-0">&nbsp;</Col>
                </Row>
                <Row>
                    <Col xs="3" className="p-0">&nbsp;</Col>
                    <Col xs="3" className="p-0">
                        <CompassButton exit={exits.south}>South</CompassButton>
                    </Col>
                    <Col xs="3" className="p-0">&nbsp;</Col>
                    <Col xs="3" className="p-0">
                        <CompassButton exit={exits.down}>Down</CompassButton>
                    </Col>
                </Row>
            </Container>
        );
    }
}

function mapStateToProps(state) {
    return {
        room: roomsSelector.getRoom(state)
    };
}

export default connect(mapStateToProps)(Compass);
