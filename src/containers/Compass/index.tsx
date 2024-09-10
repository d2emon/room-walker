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
import { Store } from '../../store';
import * as roomsSelector from '../../store/rooms/selectors';

// interface State {}
interface OwnProps {}
class StateProps {
    room: Room = new Room();
}
interface DispatchProps {}
type Props = OwnProps & StateProps & DispatchProps;

function Compass(props: Props) {
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

const mapStateToProps = (states: Store): StateProps => ({
    room: roomsSelector.getRoom(states),
});

export default connect<StateProps, DispatchProps, OwnProps, Store>(
    mapStateToProps,
)(Compass);
