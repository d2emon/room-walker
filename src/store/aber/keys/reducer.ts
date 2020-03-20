import * as types from './actionTypes';
import {KeysAction} from './actions';

export interface KeysState {
    isInInput: boolean,
    isDirty: boolean,
    buffer: string,
}

const InitialState: KeysState = {
    isInInput: false,
    isDirty: false,
    buffer: '',
};

export default (state: KeysState = InitialState, action: KeysAction): KeysState => {
    switch (action.type) {
        case types.SET_CLEAN:
            return {
                ...state,
                isDirty: false,
            };
        case types.SET_INPUT_MODE:
            return {
                ...state,
                isInInput: true,
            };
        case types.UNSET_INPUT_MODE:
            return {
                ...state,
                isInInput: false,
                buffer: action.buffer,
            };
        default:
            return state;
    }
};

export const getDirty = (state: KeysState): boolean => state.isInInput && state.isDirty;
