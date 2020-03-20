import {Action} from 'redux';
import * as types from './actionTypes';

// Interfaces
interface SetErrorMessage extends Action {
    type: types.SET_ERROR_MESSAGE,
    errorMessage: string,
}

interface SetError extends Action {
    type: types.SET_ERROR,
}

// Types
export type ErrorsAction = SetErrorMessage | SetError;

// Actions
export const setErrorMessage = (errorMessage: string): SetErrorMessage => ({
    type: types.SET_ERROR_MESSAGE,
    errorMessage,
});

export const setError = (): SetError => ({
    type: types.SET_ERROR,
});
