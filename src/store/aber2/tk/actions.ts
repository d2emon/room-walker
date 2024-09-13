import { ThunkDispatch } from '@reduxjs/toolkit';
import { closeworld, getMaxu, getMynum, makebfr, openworld, putmeon, rte, setCms, setGlobme, setISetup, special } from '../external';
import { stopWithMessage } from 'store/mudMain/actions';

const crapup = (message: string) => null;

export const start = (name: string) => async (
  dispatch: ThunkDispatch<any, any, any>,
) => {
  setGlobme(name);
  await makebfr();

  setCms(-1);
  putmeon(name);
  const world = await openworld();
  if (!world) {
    return dispatch(stopWithMessage('Sorry AberMUD is currently unavailable'));
  }

  const mynum = getMynum();
  const maxu = getMaxu();
  if (mynum >= maxu) {
    return dispatch(stopWithMessage('Sorry AberMUD is full at the moment'));
  }

  setGlobme(name);
  await rte(name, false);
  await closeworld();

  setCms(-1);
  await special('.g', name);
  setISetup(true);
}

export const loose = (message?: string) => {
  if (message) {
    crapup(message);
  }
};