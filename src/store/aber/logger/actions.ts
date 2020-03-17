import {Action} from 'redux';
import * as types from './actionTypes';
import {Message} from '../../../services/logger';

// Interfaces
interface LogReset extends Action {
    type: types.LOG_RESET,
}

interface LogMessage extends Action {
    type: types.LOG_MESSAGE,
    message: Message,
}

// Types
export type LoggerAction = LogReset | LogMessage;

export const logReset = (): LogReset => ({
    type: types.LOG_RESET,
});

export const logMessage = (date: number, message: string): LogMessage => ({
    type: types.LOG_MESSAGE,
    message: {
        date,
        message
    },
});
