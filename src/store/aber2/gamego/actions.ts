/**
 * Two Phase Game System
 */
import { Dispatch } from '@reduxjs/toolkit';
import { openlock, getGlobme, setGlobme, printf, cuserid, keysetup, talker, pbfr, setPrDue, keysetback, fgetsAll, fcloselock, getchar, getcharWait, openworld, closeworld, rte, onTiming, keyReprint, loseme, getInFight } from '../external';
import { GamegoAction, setInterrupt, sigAlOff, sigAlOn } from './slice';
import { getSigActive } from './selectors';
import { Store } from 'store';
import { syslog } from 'store/logger/actions';

const dashes = '-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-';

export const main = (name: string) => async (dispatch: Dispatch<any>) => {
  setGlobme(name);

  try{
    await dispatch(syslog(`GAME ENTRY: ${name}[${cuserid()}]`));
  } catch (e) {
    loseme(`${e}`);
  }

  keysetup();
  await talker(name);
};

const crapup = (str: string) => async (dispatch: Dispatch<any>): Promise<number> => {
  await pbfr();
  dispatch(setPrDue(false));

  keysetback();
  printf(`\n${dashes}\n\n${str}\n\n${dashes}\n`)
  return 0;
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


const sigOccur = () => async (dispatch: Dispatch<GamegoAction>, getState: () => Store): Promise<void> => {
  const isActive = getSigActive(getState());
  if (!isActive) {
    return;
  }

  dispatch(sigAlOff());

  await openworld();
  dispatch(setInterrupt(true));
  const name = getGlobme();
  await rte(name);
  dispatch(setInterrupt(false));
  await onTiming();
  await closeworld();

  keyReprint();

  dispatch(sigAlOn());
};

const sigOops = () => async (dispatch: Dispatch<GamegoAction>): Promise<number> => {
  dispatch(sigAlOff());
  loseme();
  keysetback();
  return 255;
};

const sigCtrlc = () => async (dispatch: Dispatch<GamegoAction | any>) => {
  printf('^C\n');

  const inFight = getInFight();
  if (inFight) {
    return null;
  }

  dispatch(sigAlOff());
  loseme();
  return dispatch(crapup('Byeeeeeeeeee  ...........'));
};
