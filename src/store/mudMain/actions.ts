import { Dispatch } from '@reduxjs/toolkit';
import { Store } from 'store';
import { getArgsCount, getName } from './selectors';
import { ErrorAction, setError } from 'store/error/slice';
import { main } from 'store/aber2/gamego/actions';
import { startGame } from './slice';

export const startMain = () => async (
  dispatch: Dispatch<ErrorAction | any>,
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
  /*
   */
};
