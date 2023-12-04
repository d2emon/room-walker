import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Card,
  CardFooter,
  CardHeader,
  Container,
} from 'reactstrap';
import Controls from './Controls';
import WithError from './WithError';
import Logger from './Logger';
import StartModal, { StartingData } from './modals/StartModal';
import {Message} from '../../services/logger';
import { getMessages } from 'store/aber/logger/slice';
import * as loggerActions from 'store/aber/logger/thunks';
import { onStart } from 'store/aber/mainWindow/thunks';
import MainWindow from './MainWindow';
import { resetErrors } from 'store/aber/errors/slice';

const Aber = () => {
  const dispatch = useDispatch<any>();

  const messages: Message[] = useSelector(getMessages);

  const [userId, setUserId] = useState('');
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [isShowingStartModal, setIsShowingStartModal] = useState(true);

  const handleReset = useCallback(() => {
    dispatch(resetErrors());
    setIsShowingStartModal(true);
  }, [
    dispatch,
  ]);

  const hadleCloseStartModal = useCallback((data: StartingData) => {
    setIsShowingStartModal(false);

    setUserId(data.userId);
    setTitle(data.title);
    setName(data.name);

    dispatch(onStart(data.userId, data.title, data.name));
    // syslog("GAME ENTRY: %s[%s]",globme,cuserid(NULL));
    console.log(`GAME ENTRY: ${data.name}[${data.userId}]`);
    dispatch(loggerActions.getMessages());
  }, [
    dispatch,
  ]);

  useEffect(() => {
    handleReset();
  }, [
    handleReset,
  ]);

  return (
    <Card>
      <StartModal
        show={isShowingStartModal}
        onClose={hadleCloseStartModal}
      />

      <Container className="my-2">
        <Card>
          <CardHeader>
            <Button onClick={handleReset}>Reset</Button>
          </CardHeader>

          <Container>
            <div>{userId}</div>
            <div><span>{title}</span> <span>{name}</span></div>
          </Container>

          <CardFooter>
            <Controls />
          </CardFooter>
        </Card>

        <hr />

        <WithError>
          <MainWindow />
        </WithError>

        <hr />

        <Card>
          <Container>
            <Logger
              messages={messages}
            />
          </Container>
        </Card>
      </Container>
    </Card>
  );
}

export default Aber;
