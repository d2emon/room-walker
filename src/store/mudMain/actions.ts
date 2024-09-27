import { ThunkDispatch } from '@reduxjs/toolkit';
import { Store } from 'store';
import { getArgsCount, getAuthToken, getName } from './selectors';
import { ErrorAction, setError } from 'modules/error/store/slice';
import { finalMessage, finish } from 'store/aber2/gamego/actions';
import { startGame } from './slice';
import { KeyAction, resetKeys, setFlags } from 'store/key/slice';
import SystemAPI from 'services/api/system';
import { start } from 'store/aber2/tk/actions';

export const startMain = () => async (
  dispatch: ThunkDispatch<Store, null, ErrorAction | any>,
  getState: () => Store,
) => {
  const argsCount = getArgsCount(getState());
  if (argsCount !== 2) {
    dispatch(setError({
      code: 0,
      message: 'Args!',
    }));
    return;
  }

  dispatch(startGame());
  dispatch(setFlags());

  const token = getAuthToken(getState());
  const name = getName(getState());

  await SystemAPI.start(token, name);
  await dispatch(start(name));
};

const dashes = '\n-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-\n';

export const stopWithMessage = (message: string) => async (
  dispatch: ThunkDispatch<Store, null, ErrorAction | KeyAction>,
) => {
  await dispatch(finalMessage());
  dispatch(resetKeys());
  dispatch(setError({
    code: 0,
    message: [
      dashes,
      message,
      dashes,
    ].join('\n'),
  }));
};

export const stopMain = (message?: string) => async (
  dispatch: ThunkDispatch<Store, null, any>,
) => {
  await dispatch(finish(message));

  if (message) {
    stopWithMessage(message);
  }
};
