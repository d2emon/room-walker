import * as React from 'react';
import { connect } from 'react-redux';
import {
    Container,
    Row,
    Col,
} from 'reactstrap';
import {
    Room,
    Exits,
} from '../../types';
import CompassButton from './CompassButton';
import { Store } from '../../store/reducers';
import * as roomsSelector from '../../store/rooms/reducer';

export class CompassProps {
    room: Room = new Room();
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

const mapStateToProps = (state: Store): CompassProps => ({
    room: roomsSelector.getRoom(state),
});

export default connect(
    mapStateToProps,
)(Compass);
