import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Card,
  Container,
  Input,
} from 'reactstrap';
import GameGo from './GameGo';
import Logger from './Logger';
import {Message} from '../../services/logger';
import { getMessages } from 'store/aber/logger/slice';
import * as loggerActions from 'store/aber/logger/thunks';
import * as mainWindowActions from 'store/aber/mainWindow/thunks';

interface GameGoProps {
  userId: string;
  arg0: string;
  name: string;
}

const Aber = (props: GameGoProps) => {
  const dispatch = useDispatch<any>();

  const messages: Message[] = useSelector(getMessages);

  const [userId, setUserId] = useState('User Id');
  const [arg0, setArg0] = useState('Arg0');
  const [name, setName] = useState('Name');
  const [started, setStarted] = useState(false);

  const handleChangeUserId = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setUserId(e.target.value);
    setStarted(false);
  }, []);

  const handleChangeArg0 = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setArg0(e.target.value);
    setStarted(false);
  }, []);

  const handleChangeName = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    setStarted(false);
  }, []);

  const handleReset = useCallback(() => {
    dispatch(mainWindowActions.onStart(userId, arg0, name));
    dispatch(loggerActions.getMessages());
    setStarted(true);
  }, [
    dispatch,
    arg0,
    name,
    userId,
  ]);

  useEffect(() => {
    handleReset();
  }, [
    handleReset,
  ]);

  useEffect(() => {
    if (!started) {
      handleReset();
    }
  }, [
    started,
    handleReset,
  ]);

  return (
    <Card>
      <Container>
        <Button onClick={handleReset}>Reset</Button>
      </Container>

      <Container>
        <Input
          value={userId}
          onChange={handleChangeUserId}
        />
        <Input
          value={arg0}
          onChange={handleChangeArg0}
        />
        <Input
          value={name}
          onChange={handleChangeName}
        />
        {/* */}
        <GameGo
          arg0={arg0}
          name={name}
        />
        {/* */}
        <Logger
          messages={messages}
        />
      </Container>
    </Card>
  );
}

export default Aber;
