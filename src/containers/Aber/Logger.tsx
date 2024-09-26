import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Button, Card, CardFooter, CardText, Container } from 'reactstrap';
import { getMessages } from 'store/logger/slice';
import * as loggerActions from 'store/logger/thunks';
import { LogMessage } from 'types/LogMessage';

const Logger = (): React.ReactElement => {
  const dispatch = useDispatch<any>();

  const messages: LogMessage[] = useSelector(getMessages)

  const reload = () => {
    dispatch(loggerActions.getMessages());
  };

  const handleReloadClick = () => {
    reload();
  };

  useEffect(() => {
    reload();
  }, []);

  return (<Card>
    <Container>
      { messages && <CardText>
        { messages.map((message, messageId) => <p key={messageId}>
          {message.message}
        </p>) }
      </CardText> }
    </Container>
    <CardFooter>
      <Button onClick={handleReloadClick}>
        Reload
      </Button>
    </CardFooter>
  </Card>);
};

export default Logger;
