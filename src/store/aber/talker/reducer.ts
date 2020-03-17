import * as types from './actionTypes';
import {TalkerAction} from './actions';

const MODE_0 = 'MODE_0';

type Mode = typeof MODE_0;

export interface TalkerState {
    inSetup: boolean,
    eventId?: number,
    channelId: number,
    name: string,
    mode: Mode,
}

const InitialState: TalkerState = {
    inSetup: false,
    eventId: undefined,
    channelId: 0,
    name: '',
    mode: MODE_0,
};

export default (state: TalkerState = InitialState, action: TalkerAction): TalkerState => {
    switch (action.type) {
        case types.RESET_EVENTS:
            return {
                ...state,
                eventId: undefined,
            };
        case types.SET_NAME:
            return {
                ...state,
                name: action.name,
            };
        case types.SET_IN_SETUP:
            return {
                ...state,
                inSetup: true,
            };
        default:
            return state;
    }
};
