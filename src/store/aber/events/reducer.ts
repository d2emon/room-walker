import * as types from './actionTypes';
import {EventsAction} from './actions';

export interface EventsState {
    eventId?: number,
    forceEvents: boolean,
}

const InitialState: EventsState = {
    eventId: undefined,
    forceEvents: false,
};

export default (state: EventsState = InitialState, action: EventsAction): EventsState => {
    switch (action.type) {
        case types.RESET_EVENTS:
            return {
                ...state,
                eventId: undefined,
            };
        case types.SET_EVENT_ID:
            return {
                ...state,
                eventId: action.eventId,
            };
        case types.FORCED_EVENTS:
            return {
                ...state,
                forceEvents: false,
            };
        default:
            return state;
    }
};
