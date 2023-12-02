import React, { useCallback, useEffect, useState } from 'react';
import {
    Alert,
    Card,
    Col,
    Row,
} from 'reactstrap';
import MainWindow from './MainWindow';
import Controls from './Controls';
import Talker from './Talker';
import WelcomeModal from './modals/WelcomeModal';
import {Store} from '../../store/reducers';
import { useSelector } from 'react-redux';

interface ErrorMessageProps {
  errorId?: number,
  message?: string,
}

const ErrorMessage = (props: ErrorMessageProps) => <Alert
  color={props.errorId ? 'danger' : 'success'}
>
  { props.errorId
    ? <strong>{props.errorId}:</strong>
    : null
  }
  { props.message }
</Alert>;

interface GameGoProps {
  arg0: string,
  name: string,
}

const GameGo = (props: GameGoProps) => {
  const {
    arg0,
    name,
  } = props;

  const stateErrorId = useSelector((store: Store) => (store.errors.errorId));
  const stateErrorMessage = useSelector((store: Store) => (store.errors.errorMessage));
  const stateName = useSelector((store: Store) => (store.talker.name));
  const userId = useSelector((store: Store) => (store.mainWindow.userId));

  const [errorId, setErrorId] = useState<number | undefined>(undefined);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
  const [hasStarted, setHasStarted] = useState(false);

  const closeStartModal = useCallback(() => {
    setHasStarted(true);
  }, []);

  useEffect(() => {
    const noArgs = !arg0 || !name;
    const newErrorMessage = stateErrorMessage
      || (noArgs && 'Args!')
      || undefined;
    const idFromMessage = newErrorMessage ? 0 : undefined;
    

    setErrorId((stateErrorId !== undefined)
      ? stateErrorId
      : idFromMessage
    );
    setErrorMessage(newErrorMessage);
  }, [
    arg0,
    name,
    stateErrorId,
    stateErrorMessage,
    stateName,
    userId,
  ]);

  useEffect(() => {
    setHasStarted(false);
  }, [userId]);

  return (
    <Card>
      <Controls />
      <Row>
        <Col>
          <WelcomeModal
            show={!hasStarted}
            onClose={closeStartModal}
          />
          {(((errorId === undefined) && !errorMessage)
            ? (<MainWindow>
              <Talker name={stateName} />
            </MainWindow>)
            : <ErrorMessage
              errorId={errorId}
              message={errorMessage}
            />
          )}
        </Col>
      </Row>
    </Card>    
  );
};

export default GameGo;
