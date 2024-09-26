import * as React from 'react';
import { useSelector } from 'react-redux';
import {
  Container,
  Row,
  Col,
} from 'reactstrap';
import {
  Exits,
  Room,
} from '../../types';
import CompassButton from './CompassButton';
import * as roomsSelector from '../../store/rooms/selectors';

const Compass = () => {
  const room = useSelector(roomsSelector.getRoom) || new Room();
  const exits = room?.exits || new Exits();
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

export default Compass;
