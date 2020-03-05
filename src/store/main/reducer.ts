import {Alarm} from '../../types';
import * as types from './actionTypes';
import {MainAction} from './actions';

export interface MainState {
    userId?: number,
    title: string,
    error: {
        code: number,
        message: string,
    } | null,
    timerActive: boolean, // sig_active
    alarm: Alarm,
    interrupt: boolean,
    // TODO: Remove fields
    name?: string,
    inFight?: boolean,
    prDue?: boolean,
}

const InitialState: MainState = {
    title: '',
    error: null,
    timerActive: false,
    alarm: new Alarm(),
    interrupt: false,
};

export default (state: MainState = InitialState, action: MainAction): MainState => {
    switch (action.type) {
        case types.SET_STARTED:
            return {
                ...state,
                userId: action.userId,
                title: '',
                error: null,
                timerActive: false,
                alarm: new Alarm(),
                interrupt: false,
            };
        case types.SET_FINISHED:
            return {
                ...state,
                error: {
                    code: action.code,
                    message: action.message,
                },
                userId: undefined,
            };
        case types.SET_TITLE:
            return {
                ...state,
                title: action.title,
            };
        case types.SET_ACTIVE:
            return {
                ...state,
                timerActive: action.timerActive,
                alarm: {
                    active: action.timerActive,
                    timeout: action.timerActive ? 2 : 2147487643,
                },
            };
        case types.SET_ALARM:
            return {
                ...state,
                alarm: {
                    active: action.alarm.active,
                    timeout: action.alarm.active ? 2 : state.alarm.timeout,
                },
            };
        case types.SET_INTERRUPT:
            return {
                ...state,
                interrupt: action.interrupt,
            };
        // TODO: Remove actions
            /*
        case types.SET_NAME:
            return {
                ...state,
                name: action.name,
            };
             */
        case types.SET_PR_DUE:
            return {
                ...state,
                prDue: action.prDue,
            };
        default:
            return state;
    }
};

// Selectors
export const getStarted = (state: MainState) => !!state.userId;
