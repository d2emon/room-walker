import {Action} from 'redux';
import * as types from './actionTypes';

// Interfaces
interface LogReset extends Action {
    type: types.LOG_RESET,
    message?: string,
}

interface LogMessage extends Action {
    type: types.LOG_MESSAGE,
    message: string,
}

// Types
export type LoggerAction = LogReset | LogMessage;

export const logReset = (message: string): LogReset => ({
    type: types.LOG_RESET,
    message,
});

export const logMessage = (message: string): LogMessage => ({
    type: types.LOG_MESSAGE,
    message,
});
