import {Action} from 'redux';
import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {MainAction, setFinished, setInterrupt, setPrDue, setStarted} from './slice';
import { SetActiveAction, SetAlarmAction, setActive, setAlarm, setAlarmStarted } from './alarm/slice';
import { TkAction } from '../tk/tkSlice';
import { Store } from '..';
import { getAlarm } from './selectors';

// Types
type Dispatch<A extends Action> = ThunkDispatch<Store, any, A>;
export type MainThunkAction<A extends Action> = ThunkAction<any, Store, any, A>;

const closeworld = () => Promise.resolve();
const getchar = () => Promise.resolve('a');
const keyReprint = () => Promise.resolve();
const loseme = () => Promise.resolve();
const onTiming = () => Promise.resolve();
const openworld = () => Promise.resolve();
const pbfr = () => Promise.resolve();

// Actions
/*
Two Phase Game System
*/
export const start = (userId: number, name: string): MainThunkAction<MainAction | TkAction> => (
    dispatch: Dispatch<MainAction | TkAction>,
) => Promise.all([
        dispatch(setStarted(userId)),
        dispatch(setAlarmStarted()),
        Promise.resolve(console.log(`GAME ENTRY: ${name}[${userId}]`)),
    ])
    // .then(() => dispatch(startWalk(name)))
    .then(() => {});

// crapup
export const finish = (message: string): MainThunkAction<Action> => (
    dispatch: Dispatch<Action>,
) => dispatch(pbfr)
    .then(() => dispatch(setPrDue(false))) // So we dont get a prompt after the exit
    .then(() => dispatch(setFinished({ code: 0, message })));

// getkbd
// Getstr() with length limit and filter ctrl
export const getKeyboard = (maxLength: number): MainThunkAction<Action> => (
    dispatch: Dispatch<Action>,
) => dispatch(getchar)
    .then(text => text.substr(0, maxLength));

// sig_alon / sig_aloff
const setTimerAlarm = (active: boolean): MainThunkAction<Action> => (
    dispatch: Dispatch<SetActiveAction>,
) => dispatch(setActive(active));

// block_alarm / unblock_alarm
const setTimer = (active: boolean): MainThunkAction<Action> => (
    dispatch: Dispatch<SetAlarmAction>,
) => dispatch(setAlarm(active));

// sig_occur
export const wait = (): MainThunkAction<Action> => (
    dispatch: Dispatch<Action>,
    getState: () => Store,
) => getAlarm(getState()) && Promise.resolve(null)
    .then(() => dispatch(setTimerAlarm(false)))
    .then(() => dispatch(openworld))
    .then(() => dispatch(setInterrupt(true)))
    // .then(() => dispatch(readMessages(getState().name || '')))
    .then(() => dispatch(setInterrupt(false)))
    .then(() => dispatch(onTiming))
    .then(() => dispatch(closeworld))
    .then(() => dispatch(keyReprint))
    .then(() => dispatch(setTimerAlarm(true)))
    .then(() => {});

// sig_oops
export const onError = (): MainThunkAction<Action> => (
    dispatch: Dispatch<Action>,
) => Promise.resolve(null)
    .then(() => dispatch(setTimerAlarm(false)))
    .then(() => dispatch(loseme))
    .then(() => dispatch(setFinished({ code: 255, message: '' })));

// sig_ctrlc
export const onQuit = (): MainThunkAction<Action> => (
    dispatch: Dispatch<Action>,
    getState: () => Store,
) => (!getState().main.inFight) && Promise.resolve(null)
    .then(() => dispatch(setTimerAlarm(false)))
    .then(() => dispatch(loseme))
    .then(() => dispatch(finish('Byeeeeeeeeee  ...........')));

// Signals
// const sigHup = onError;
// const sigInt = onQuit;
// const sigTerm = onQuit;
// const sigTstp = () => null;
// const sigQuit = () => null;
// const sigCont = onError;
