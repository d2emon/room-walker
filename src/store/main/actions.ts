import {Action} from 'redux';
import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {Alarm} from '../../types';
import {MainState} from './reducer';
import * as types from './actionTypes';
import {
    readMessages,
    startWalk,
    TkAction,
} from '../tk/actions';

// Interfaces
interface SetStarted {
    type: types.SET_STARTED,
    userId: number,
}

interface SetFinished {
    type: types.SET_FINISHED,
    code: number,
    message: string,
}

interface SetTitle {
    type: types.SET_TITLE,
    title: string,
}

interface SetActive {
    type: types.SET_ACTIVE,
    timerActive: boolean,
}

interface SetAlarm {
    type: types.SET_ALARM,
    alarm: Alarm,
}

interface SetInterrupt {
    type: types.SET_INTERRUPT,
    interrupt: boolean,
}

// TODO: Remove interfaces
interface SetPrDue {
    type: types.SET_PR_DUE,
    prDue: boolean,
}

// Types
export type MainAction = SetStarted | SetFinished | SetTitle | SetActive | SetAlarm | SetInterrupt
    | SetPrDue;
type Dispatch<A extends Action> = ThunkDispatch<MainState, any, A>;
export type MainThunkAction<A extends Action> = ThunkAction<any, MainState, any, A>;

// Setters
const setStarted = (userId: number): SetStarted => ({
    type: types.SET_STARTED,
    userId,
});

const setFinished = (code: number, message: string = ''): SetFinished => ({
    type: types.SET_FINISHED,
    code,
    message,
});

// setProgname
const setTitle = (title: string): SetTitle => ({
    type: types.SET_TITLE,
    title,
});

const setActive = (timerActive: boolean): SetActive => ({
    type: types.SET_ACTIVE,
    timerActive,
});

const setAlarm = (active: boolean): SetAlarm => ({
    type: types.SET_ALARM,
    alarm: {
        active,
        timeout: null,
    },
});

const setInterrupt = (interrupt: boolean): SetInterrupt => ({
    type: types.SET_INTERRUPT,
    interrupt,
});

// TODO: Remove actions
const setPrDue = (prDue: boolean): SetPrDue => ({
    type: types.SET_PR_DUE,
    prDue,
});

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
        Promise.resolve(console.log(`GAME ENTRY: ${name}[${userId}]`)),
    ])
    // .then(() => dispatch(startWalk(name)))
    .then(() => {});

// crapup
export const finish = (message: string): MainThunkAction<Action> => (
    dispatch: Dispatch<Action>,
) => dispatch(pbfr)
    .then(() => dispatch(setPrDue(false))) // So we dont get a prompt after the exit
    .then(() => dispatch(setFinished(0, message)));

// getkbd
// Getstr() with length limit and filter ctrl
export const getKeyboard = (maxLength: number): MainThunkAction<Action> => (
    dispatch: Dispatch<Action>,
) => dispatch(getchar)
    .then(text => text.substr(0, maxLength));

// sig_alon / sig_aloff
const setTimerAlarm = (active: boolean): MainThunkAction<Action> => (
    dispatch: Dispatch<Action>,
) => dispatch(setActive(active));

// block_alarm / unblock_alarm
const setTimer = (active: boolean): MainThunkAction<Action> => (
    dispatch: Dispatch<Action>,
) => dispatch(setAlarm(active));

// sig_occur
export const wait = (): MainThunkAction<Action> => (
    dispatch: Dispatch<Action>,
    getState: () => MainState,
) => getState().timerActive && getState().alarm.active && Promise.resolve(null)
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
    .then(() => dispatch(setFinished(255)));

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
