import {Alarm} from '../../types';
import * as types from './actionTypes';
import {TkAction} from './actions';

export interface TkState {
    iSetup: number | boolean,

    messageId: number, // cms
    locationId: number, // curch
    name?: string, // globme
    mode: number, // curmode

    convflg: number,

    rdQd: number

    playerId: number, // mynum
    updated: number, // lasup

    // TODO: Remove fields
    ailBlind: boolean,
    brmode: boolean,
    debugMode: boolean,
    maxu: number,
    myLev: number,
    mySex: number,
    myStr: number,
    zapped: boolean,
}

const InitialState: TkState = {
    convflg: 0,
    iSetup: 0,
    locationId: 0,
    messageId: -1,
    mode: 0,
    playerId: 0,
    rdQd: 0,
    updated: 0,

    // TODO: Remove fields
    ailBlind: false,
    brmode: false,
    debugMode: false,
    maxu: 16,
    myLev: 0,
    mySex: 0,
    myStr: 0,
    zapped: true,
};

export default (state: TkState = InitialState, action: TkAction): TkState => {
    switch (action.type) {
        case types.SET_PLAYER:
            return {
                ...state,
                playerId: action.playerId,
                name: action.name,
                messageId: -1,
            };
        case types.SET_NAME:
            return {
                ...state,
                name: action.name,
            };
        case types.SET_MESSAGE_ID:
            return {
                ...state,
                messageId: action.messageId,
            };
        case types.SET_LOCATION_ID:
            return {
                ...state,
                locationId: action.locationId,
            };
        case types.SET_I_SETUP:
            return {
                ...state,
                iSetup: action.iSetup,
            };
        case types.SET_MODE:
            return {
                ...state,
                mode: action.mode,
            };
        case types.SET_UPDATE:
            return {
                ...state,
                messageId: state.messageId,
            };
        // TODO: Remove actions
        default:
            return state;
    }
};

// Selectors
// export const getStarted = (state: MainState) => !!state.userId;
