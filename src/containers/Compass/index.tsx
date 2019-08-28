import * as React from 'react';
import { connect } from 'react-redux';
import {
    Container,
    Row,
    Col,
} from 'reactstrap';
import CompassButton from './CompassButton';
import * as roomsSelector from '../../store/rooms/reducer';

export class Exits {
    north: number = 0;
    east: number = 0;
    south: number = 0;
    west: number = 0;
    up: number = 0;
    down: number = 0;
}

export class Room {
    exits: Exits = new Exits();
}

export class CompassProps {
    room: Room = new Room();
    // Dispatch
    getRoom: ((roomId: number) => any) | undefined;
}

function Compass(props: CompassProps) {
    const {
        room = new Room(),
    } = props;
    const exits = room.exits || new Exits();
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

function mapStateToProps(state: any) {
    return {
        room: roomsSelector.getRoom(state)
    };
}

export default connect(
    mapStateToProps,
)(Compass);
