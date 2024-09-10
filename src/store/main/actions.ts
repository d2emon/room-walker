import {Action} from 'redux';
import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import { MainAction, MainState, SetActiveAction, SetAlarmAction, setActive, setAlarm, setFinished, setInterrupt, setPrDue, setStarted } from './mainSlice';
import { TkAction } from '../tk/tkSlice';

// Types
type Dispatch<A extends Action> = ThunkDispatch<MainState, any, A>;
export type MainThunkAction<A extends Action> = ThunkAction<any, MainState, any, A>;

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
        dispatch(setStarted({ userId })),
        Promise.resolve(console.log(`GAME ENTRY: ${name}[${userId}]`)),
    ])
    // .then(() => dispatch(startWalk(name)))
    .then(() => {});

// crapup
export const finish = (message: string): MainThunkAction<Action> => (
    dispatch: Dispatch<Action>,
) => dispatch(pbfr)
    .then(() => dispatch(setPrDue({ prDue: false }))) // So we dont get a prompt after the exit
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
) => dispatch(setActive({ timerActive: active }));

// block_alarm / unblock_alarm
const setTimer = (active: boolean): MainThunkAction<Action> => (
    dispatch: Dispatch<SetAlarmAction>,
) => dispatch(setAlarm({
  alarm: {
    active,
    timeout: null,
  },
}));

// sig_occur
export const wait = (): MainThunkAction<Action> => (
    dispatch: Dispatch<Action>,
    getState: () => MainState,
) => getState().timerActive && getState().alarm.active && Promise.resolve(null)
    .then(() => dispatch(setTimerAlarm(false)))
    .then(() => dispatch(openworld))
    .then(() => dispatch(setInterrupt({ interrupt: true })))
    // .then(() => dispatch(readMessages(getState().name || '')))
    .then(() => dispatch(setInterrupt({ interrupt: false })))
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
    getState: () => MainState,
) => (!getState().inFight) && Promise.resolve(null)
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
