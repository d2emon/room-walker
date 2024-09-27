import { ThunkDispatch } from '@reduxjs/toolkit';
import { Store } from 'store';
import { ErrorAction, setError } from 'modules/error/store/slice';
import { stopMain } from 'store/mudMain/actions';
import { MainAction } from 'store/mudMain/slice';
import { onTimer } from 'store/aber2/gamego/actions';
import { getIsActive } from './selectors';
import { SignalAction, activate, deactivate } from './slice';
import { resetKeys } from 'store/key/slice';
import { showReprint } from 'store/key/actions';

const sigNone = () => null;
    
const sigCtrlc = () => async (
  dispatch: ThunkDispatch<Store, null, MainAction | SignalAction>,
) => {
  /*
  const inFight = getInFight();
  if (inFight) {
    return;
  }
   */

  await dispatch(stopMain('Byeeeeeeeeee  ...........'));
};
  
const sigOops = () => async (
  dispatch: ThunkDispatch<Store, null, ErrorAction | MainAction | SignalAction>,
) => {
  await dispatch(stopMain());

  dispatch(resetKeys());
  dispatch(setError({ code: 255 }));
};

const sigOccur = () => async (
  dispatch: ThunkDispatch<Store, null,  SignalAction | any>,
  getState: () => Store,
) => {
  if (!getIsActive(getState())) {
    return;
  }

  dispatch(deactivate());
  await dispatch(onTimer());
  await dispatch(showReprint())
  //
  dispatch(activate());
};

export const sighup = sigOops;
export const sigint = sigCtrlc;
export const sigterm = sigCtrlc;
export const sigtstp = sigNone;
export const sigquit = sigNone;
export const sigcont = sigOops;
export const sigalrm = sigOccur;
