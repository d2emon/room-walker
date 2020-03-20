import {Action} from 'redux';
import * as types from './actionTypes';

// Interfaces
interface SetClean extends Action {
    type: types.SET_CLEAN,
}

interface SetInputMode extends Action {
    type: types.SET_INPUT_MODE,
}

interface UnsetInputMode extends Action {
    type: types.UNSET_INPUT_MODE,
    buffer: string,
}

// Types
export type KeysAction = SetClean | SetInputMode | UnsetInputMode;

export const setClean = (): SetClean => ({
    type: types.SET_CLEAN,
});

export const setInputMode = (): SetInputMode => ({
    type: types.SET_INPUT_MODE,
});

export const unsetInputMode = (buffer: string): UnsetInputMode => ({
    type: types.UNSET_INPUT_MODE,
    buffer,
});
