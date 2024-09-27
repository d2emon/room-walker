import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Card,
  CardFooter,
  CardHeader,
  Container,
} from 'reactstrap';
import WithError from 'modules/error/components/WithError';
import Logger from 'modules/logger/containers/Logger';
import {
  getNeedCreateCharacter,
  getTitle,
  getUserId,
} from 'store/aber/mainWindow/selectors';
import { createUserCharacter, onStart } from 'store/aber/mainWindow/thunks';
import { getName } from 'store/aber/talker/selectors';
import StartModal, { StartingData } from './modals/StartModal';
import CreateCharacterModal, { CreateCharacterData } from './modals/CreateCharacterModal';
import Controls from './Controls';
import MainWindow from './MainWindow';

const Aber = () => {
  const dispatch = useDispatch<any>();

  const name = useSelector(getName);
  const title = useSelector(getTitle);
  const userId = useSelector(getUserId);
  const needCreateCharacter = useSelector(getNeedCreateCharacter);

  const [isShowingStartModal, setIsShowingStartModal] = useState(true);

  const handleReset = useCallback(() => {
    setIsShowingStartModal(true);
  }, []);

  const hadleCloseStartModal = useCallback((data: StartingData) => {
    setIsShowingStartModal(false);

    dispatch(onStart(data.userId, data.title, data.name));
  }, [
    dispatch,
  ]);

  const hadleCloseCreateCharacterModal = useCallback((data: CreateCharacterData) => {
    // keysetback();
    // keysetup();

    dispatch(createUserCharacter(userId, data?.sex))
  }, [
    dispatch,
    userId,
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

      <CreateCharacterModal
        isOpen={needCreateCharacter}
        onClose={hadleCloseCreateCharacterModal}
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

        <Logger />
      </Container>
    </Card>
  );
}

export default Aber;
