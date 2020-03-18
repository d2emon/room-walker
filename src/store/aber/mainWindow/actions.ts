import {Action} from 'redux';
import * as types from './actionTypes';

// Interfaces
interface StartGame extends Action {
    type: types.START_GAME,
    userId: string,
    title: string,
    name: string,
}

interface SetTitle extends Action {
    type: types.SET_TITLE,
    title: string,
}

interface SetAlarm extends Action {
    type: types.SET_ALARM_OFF,
    value: boolean,
}

interface SetBlock extends Action {
    type: types.SET_BLOCK,
    value: boolean,
}

interface SetKeysOff extends Action {
    type: types.SET_KEYS_OFF,
    errorId: number,
}

// Types
export type MainWindowAction = StartGame | SetTitle | SetAlarm | SetBlock | SetKeysOff;

export const startGame = (userId: string, title: string, name: string): StartGame => ({
    type: types.START_GAME,
    userId,
    title,
    name,
});

export const setTitle = (title: string): SetTitle => ({
    type: types.SET_TITLE,
    title,
});

export const setAlarm = (value: boolean): SetAlarm => ({
    type: types.SET_ALARM_OFF,
    value,
});

export const setBlock = (value: boolean): SetBlock => ({
    type: types.SET_BLOCK,
    value,
});

export const setKeysOff = (errorId: number): SetKeysOff => ({
    type: types.SET_KEYS_OFF,
    errorId,
});
