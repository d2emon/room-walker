import * as types from './actionTypes';
import {LoggerAction} from './actions';

export type LoggerState = {
    messages: string[]
};

const InitialState: LoggerState = {
    messages: [],
};

export default (state: LoggerState = InitialState, action: LoggerAction): LoggerState => {
    switch (action.type) {
        case types.LOG_RESET:
            return {
                ...state,
                messages: [],
            };
        case types.LOG_MESSAGE:
            return {
                ...state,
                messages: [
                    ...state.messages,
                    action.message,
                ]
            };
        default:
            return state;
    }
};
