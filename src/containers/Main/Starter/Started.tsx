import React from 'react';
import {
  Container,
  Row,
  Col,
  Button,
} from 'reactstrap';

interface StartedProps {
  alarm: boolean;
  name?: string;
  timeout: number | null;
  onError: () => void;
  onQuit: () => void;
  onWait: () => void;
}
  
const Started = ({
  alarm,
  name,
  timeout,
  onError,
  onQuit,
  onWait,
}: StartedProps) => {
  return (
    <Container>
      <Row>
        <Col xs="8">
          <p>Hello {name || ''}</p>
        </Col>
  
        <Col xs="4">
          <Container>
            <Row>
              <Col>
                <Button
                  disabled={!alarm}
                  onClick={onWait}
                >
                  Wait ({timeout})
                </Button>
              </Col>
            </Row>
            <Row>
              <Col>
                <Button
                  onClick={onError}
                >
                  Error
                </Button>
              </Col>
            </Row>
            <Row>
              <Col>
                <Button
                  onClick={onQuit}
                >
                  Quit
                </Button>
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
    </Container>
  );
};

export default Started;
