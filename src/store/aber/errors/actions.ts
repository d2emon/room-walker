import {Action} from 'redux';
import * as types from './actionTypes';

// Interfaces
interface SetError extends Action {
    type: types.SET_ERROR_MESSAGE,
    errorMessage: string,
}

// Types
export type ErrorsAction = SetError;

// Actions
export const setErrorMessage = (errorMessage: string): SetError => ({
    type: types.SET_ERROR_MESSAGE,
    errorMessage,
});
