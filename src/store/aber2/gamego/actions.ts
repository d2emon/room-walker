/**
 * Two Phase Game System
 */
import { Dispatch, ThunkDispatch } from '@reduxjs/toolkit';
import {
  getGlobme, setGlobme, talker, pbfr,
  openworld, closeworld, rte, onTiming, loseme,
  setNeedReprint,
} from '../external';
import { Store } from 'store';

export const finish = (message?: string) => async (dispatch: Dispatch) => {
  loseme(message || '');
};

export const main = (name: string) => async (dispatch: ThunkDispatch<Store, null, any>) => {
  setGlobme(name);
  await talker(name);
};

export const finalMessage = () => async (dispatch: Dispatch<any>) => {
  await pbfr();
  dispatch(setNeedReprint(false));
};

export const onTimer = () => async (dispatch: ThunkDispatch<Store, null, any>, getState: () => Store): Promise<void> => {
  const name = getGlobme();

  await openworld();
  await rte(name, true);
  await onTiming();
  await closeworld();
};
