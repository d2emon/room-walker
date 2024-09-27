import React from 'react';
import {
  Alert,
  Card,
  Container,
} from 'reactstrap';

interface ErrorMessageProps {
  errorId?: number,
  message?: string,
}

const ErrorMessage = (props: ErrorMessageProps) => (
  <Card>
    <Container>
      <Alert
        color={props.errorId ? 'danger' : 'success'}
      >
        { props.errorId
          ? <strong>{props.errorId}:</strong>
          : null
        }
        { props.message }
      </Alert>
    </Container>
  </Card>
);

export default ErrorMessage;
