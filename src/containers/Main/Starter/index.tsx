import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Row,
  Col,
} from 'reactstrap';
import * as actions from '../../../store/main/actions';
import * as selector from '../../../store/main/selectors';
import * as errorSelector from 'modules/error/store/selectors';
import Starting from './Starting';
import Loading from './Loading';


const Starter = () => {
  const dispatch = useDispatch<any>();

  const [starting, setStarting] = useState(false);
  const [userId, setUserId] = useState(1);

  const started = useSelector(selector.getStarted);
  const name = useSelector(selector.getName);
  const alarm = useSelector(selector.getAlarm);
  const timeout = useSelector(selector.getTimeout);
  const error = useSelector(errorSelector.getErrorCode);
  const errorMessage = useSelector(errorSelector.getErrorMessage);

  const handleError = useCallback(
    () => {
      dispatch(actions.onError());
    },
    [dispatch],
  );

  const handleQuit = useCallback(
    () => {
      dispatch(actions.onQuit());
    },
    [dispatch],
  );

  const handleStart = useCallback(
    (name: string) => {
      setStarting(true);
      dispatch(actions.start(userId, name));
    },
    [
      dispatch,
      userId,
    ],
  );

  const handleWait = useCallback(
    () => {
      dispatch(actions.wait());
    },
    [dispatch],
  );

  useEffect(
    () => {
      setUserId(1);
    },
    []
  );

  useEffect(
    () => {
      console.log(error, starting);
      if (error && starting) {
        setStarting(false);
      }
    },
    [
      error,
      starting,
    ]
  );

  return (
    <Container>
      {
        starting
          ? (
            <Starting
              alarm={alarm}
              name={name}
              started={started}
              timeout={timeout}
              onError={handleError}
              onQuit={handleQuit}
              onWait={handleWait}
            />
          )
          : (
            <Loading
              onStart={handleStart}
            />
          )
      }

      {error && errorMessage && <Row>
        <Col xs="12">
          <hr />
          {errorMessage}
          <hr />
        </Col>
      </Row>}
    </Container>
  );
};

export default Starter;
