import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Button,
    Nav,
    Navbar,
} from 'reactstrap';
import {
  getCanExit,
  getTimerIsOn,
} from 'store/aber/mainWindow/selectors';
import * as mainWindowActions from 'store/aber/mainWindow/thunks';
import GoodByeModal from './modals/GoodByeModal';

interface ControlsProps {
  inFight?: boolean,
}

const NewControls = (props: ControlsProps) => {
  const {
    inFight,
  } = props;

  const dispatch = useDispatch<any>();

  const canExit = useSelector(getCanExit);
  const timerIsOn = useSelector(getTimerIsOn);

  const [blockExit, setBlockExit] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  const handleCloseExitModal = useCallback(() => {
    setIsExiting(false);
  }, []);

  const handleError = useCallback(() => {
    dispatch(mainWindowActions.onError)
  }, [
    dispatch,
  ]);

  const handleExit = useCallback(() => {
    if (!blockExit) {
        setIsExiting(true);
        dispatch(mainWindowActions.onExit)
    }
  }, [
    dispatch,
    blockExit,
  ]);

  const handleTimer = useCallback(() => {
    dispatch(mainWindowActions.onTimer)
  }, [
    dispatch,
  ]);

  useEffect(() => {
    setBlockExit(!!inFight);
  }, [inFight]);

  return (
    <Navbar>
      <GoodByeModal
        show={isExiting}
        onClose={handleCloseExitModal}
      />

      <Nav>
        <Button
          onClick={handleError}
        >
          SIGHUP
        </Button>
        <Button
          onClick={handleExit}
          disabled={!canExit}
        >
          SIGINT
        </Button>
        <Button
          onClick={handleExit}
          disabled={!canExit}
        >
          SIGTERM
        </Button>
        <Button
          disabled={true}
        >
          SIGTSTP
        </Button>
        <Button
          disabled={true}
        >
          SIGQUIT
        </Button>
        <Button
          onClick={handleError}
        >
          SIGCONT
        </Button>
        <Button
          onClick={handleTimer}
          disabled={!timerIsOn}
        >
          SIGALRT
        </Button>
        <Button
          onClick={handleExit}
        >
          Exit
        </Button>
        <Button
          onClick={handleTimer}
        >
          Alert
        </Button>
      </Nav>
    </Navbar>    
  );
}

export default NewControls;
