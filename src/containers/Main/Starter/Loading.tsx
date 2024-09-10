import React from 'react';
import {
  Container,
  Row,
} from 'reactstrap';
import StartArgs from '../StartArgs';

interface LoadingProps {
  onStart: (name: string) => void;
};
  
const Loading = ({ onStart }: LoadingProps) => {
  return (
    <Container>
      <Row>
        <StartArgs
          onSubmit={onStart} 
        />
      </Row>
    </Container>
  );
};

export default Loading;
