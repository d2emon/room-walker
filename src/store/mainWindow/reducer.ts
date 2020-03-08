import * as types from './actionTypes';
import {MainWindowAction} from './actions';

export interface MainWindowState {
    userId: string,
    title: string,
    name: string,
    errorId?: number,
    errorMessage?: string,
    keysAreSet: boolean,
    prDue: boolean,

    active: boolean,
    ignore: boolean,
    alarm: number,
}

const InitialState: MainWindowState = {
    userId: '',
    title: '',
    name: '',
    keysAreSet: true,
    prDue: false,

    active: false,
    ignore: false,
    alarm: 0,
};

const sigAlOff = {
    active: false,
    ignore: true,
    alarm: 2147487643,
};

export default (state: MainWindowState = InitialState, action: MainWindowAction): MainWindowState => {
    switch (action.type) {
        case types.START_GAME:
            return {
                ...InitialState,
                userId: action.userId,
                title: action.title,
                name: action.name,
            };
        case types.SET_ERROR_MESSAGE:
            // this.pbfr();
            return {
                ...state,
                errorId: 0,
                errorMessage: action.errorMessage,
                keysAreSet: false,
                prDue: false,
            };
        case types.SET_ERROR:
            return {
                ...state,
                errorId: 255,
                keysAreSet: false,
            };
        case types.SET_ALARM_OFF:
            return {
                ...state,
                active: false,
                alarm: 2147487643,
                ignore: true,
            };
        case types.SET_KEYS_OFF:
            return {
                ...state,
                errorId: action.errorId,
                keysAreSet: false,
            };
        default:
            return state;
    }
};

// Selectors
// export const getStarted = (state: GameGoState) => !!state.userId;
