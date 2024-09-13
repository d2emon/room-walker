/**
 * Two Phase Game System
 */
import { Dispatch, ThunkDispatch } from '@reduxjs/toolkit';
import { openlock, getGlobme, setGlobme, printf, cuserid, keysetup, talker, pbfr, setPrDue, keysetback, fgetsAll, fcloselock, getchar, getcharWait, openworld, closeworld, rte, onTiming, keyReprint, loseme, getInFight } from '../external';
import { Store } from 'store';
import { syslog } from 'store/logger/actions';

export const finish = (message?: string) => async (dispatch: Dispatch) => {
  loseme(message || '');
};

export const main = (name: string) => async (dispatch: ThunkDispatch<Store, null, any>) => {
  setGlobme(name);

  try{
    dispatch(syslog(`GAME ENTRY: ${name}[${cuserid()}]`));
  } catch (e) {
    await dispatch(finish(`${e}`));
  }

  keysetup();
  await talker(name);
};

export const finalMessage = () => async (dispatch: Dispatch<any>) => {
  await pbfr();
  dispatch(setPrDue(false));

  keysetback();
};

const listfl = async (name: string): Promise<void> => {
  const a = openlock(name, 'r+');
  await fgetsAll(a, 128, async (record: string) => {
    printf(`${record}\n`);
  });
  await fcloselock(a);
};

const getkbd = async (s: string, maxLength: number): Promise<string> => {
  let c: number;
  let f = false;
  for (c = 0; c < maxLength; c += 1) {
    const n = await getchar();
    if (n === '\n') {
      f = true;
    } else {
      s += n;
    }
  }
  if (!f) {
    await getcharWait('\n');
  }
  return s;
};


export const onTimer = () => async (dispatch: ThunkDispatch<Store, null, any>, getState: () => Store): Promise<void> => {
  const name = getGlobme();

  await openworld();
  await rte(name, true);
  await onTiming();
  await closeworld();

  keyReprint();
};
