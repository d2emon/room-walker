import * as types from './actionTypes';
import {ErrorsAction} from './actions';

export interface ErrorsState {
    errorId?: number,
    errorMessage?: string,
    // External
    keysAreSet?: boolean,
    prDue?: boolean,
}

const InitialState: ErrorsState = {
};

export default (state: ErrorsState = InitialState, action: ErrorsAction): ErrorsState => {
    switch (action.type) {
        case types.SET_ERROR_MESSAGE:
            /**
             * pbfr();
             */
            return {
                ...state,
                errorId: 0,
                errorMessage: action.errorMessage,
                keysAreSet: false,
                prDue: false,
            };
        /*
        case types.SET_ERROR:
            return {
                ...state,
                errorId: 255,
                keysAreSet: false,
            };
        */
        default:
            return state;
    }
};
