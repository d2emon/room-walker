import React, { useCallback, useState } from 'react';
import {
  Button,
  Col,
  Container,
  Input,
  Row,
} from 'reactstrap';

interface Props {
  disabled?: boolean,
  name?: string,
  onSubmit?: (name: string) => any,
}

const StartArgs = (props: Props) => {
  const {
    disabled = false,
    onSubmit,
  } = props;

  const [name, setName] = useState(props.name || '');

  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    /* 
  if (props.length !== 2) {
    exit(0);
    return (
      <div>Args!</div>
    );
  }
    */
  }, []);

  const handleSubmit = useCallback(
    () => {
      if (onSubmit) onSubmit(name);
    },
    [
      name,
      onSubmit,
    ],
  );

  return (
    <Container>
      <Row>
        <Col xs="8">
          <Input
            placeholder="Name"
            value={name}
            disabled={disabled}
            onChange={handleChange}
          />
        </Col>

        <Col xs="4">
          <Button
            disabled={disabled || !name}
            onClick={handleSubmit}
          >
            Start
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default StartArgs;
