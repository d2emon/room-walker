import * as types from './actionTypes';
import {MainWindowAction} from './actions';

export interface MainWindowState {
    // Main Args
    userId: string,
    title: string,
    name: string,
    // Errors
    errorId?: number,
    errorMessage?: string,
    // Timer
    ignore: boolean,
    alarm: number,
    // Internal
    active: boolean,
    interrupt: boolean,
    // External
    keysAreSet: boolean,
    prDue: boolean,
    inFight: boolean,
}

const InitialState: MainWindowState = {
    userId: '',
    title: '',
    name: '',

    ignore: false,
    alarm: 0,

    active: false,
    interrupt: false,

    keysAreSet: true,
    prDue: false,
    inFight: false,
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
        case types.SET_ALARM_OFF:
            return {
                ...state,
                active: action.value,
                alarm: action.value ? 2 : 2147487643,
                ignore: !action.value,
            };
        case types.SET_BLOCK:
            return {
                ...state,
                alarm: (!action.value && state.active) ? 2 : state.alarm,
                ignore: action.value,
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
