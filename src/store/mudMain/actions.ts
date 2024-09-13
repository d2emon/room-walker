import { ThunkDispatch } from '@reduxjs/toolkit';
import { Store } from 'store';
import { getArgsCount, getName } from './selectors';
import { ErrorAction, setError } from 'store/error/slice';
import { finalMessage, finish, main } from 'store/aber2/gamego/actions';
import { startGame } from './slice';
import { GamegoAction } from 'store/aber2/gamego/slice';

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

  const name = getName(getState());

  dispatch(startGame());

  await dispatch(main(name));
};

const dashes = '\n-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-\n';

const stopWithMessage = (message: string) => async (
  dispatch: ThunkDispatch<Store, null, ErrorAction>,
) => {
  await dispatch(finalMessage());
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
  dispatch: ThunkDispatch<Store, null, GamegoAction>,
) => {
  await dispatch(finish(message));

  if (message) {
    stopWithMessage(message);
  }
};
