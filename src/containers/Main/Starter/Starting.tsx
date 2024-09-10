import React from 'react';
import {
  Container,
  Row,
  Col,
} from 'reactstrap';
import Started from './Started';

const Entering = () => (
  <Container>
    <Row>
      <Col xs="8">
        <p>Entering Game ....</p>
      </Col>
    </Row>
  </Container>
);
 
interface StartingProps {
  alarm: boolean;
  name?: string;
  started: boolean;
  timeout: number | null;
  onError: () => void;
  onQuit: () => void;
  onWait: () => void;
}

const Starting = ({
  alarm,
  name,
  started,
  timeout,
  onError,
  onQuit,
  onWait,
}: StartingProps) => {
  if (!started) {
    return (<Entering />);
  }
  
  return (
    <Started
      alarm={alarm}
      name={name}
      timeout={timeout}
      onError={onError}
      onQuit={onQuit}
      onWait={onWait}
    />
  );
};

export default Starting;
