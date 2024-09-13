import { ThunkDispatch } from '@reduxjs/toolkit';
import { Store } from 'store';
import { getArgsCount, getName, getUserId } from './selectors';
import { ErrorAction, setError } from 'store/error/slice';
import { finalMessage, finish, main } from 'store/aber2/gamego/actions';
import { startGame } from './slice';
import { syslog } from 'store/logger/actions';
import { KeyAction, resetKeys, setFlags } from 'store/key/slice';

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

  const name = getName(getState());
  const userId = getUserId(getState());
  dispatch(syslog(`GAME ENTRY: ${name}[${userId}]`))

  await dispatch(main(name));
};

const dashes = '\n-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-\n';

const stopWithMessage = (message: string) => async (
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
