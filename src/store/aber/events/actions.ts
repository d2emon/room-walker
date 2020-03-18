import {Action} from 'redux';
import * as types from './actionTypes';

// Interfaces
interface ResetEvents extends Action {
    type: types.RESET_EVENTS,
}

interface SetEventId extends Action {
    type: types.SET_EVENT_ID,
    eventId: number,
}

interface ForcedEvents extends Action {
    type: types.FORCED_EVENTS,
}

// Types
export type EventsAction = ResetEvents | SetEventId | ForcedEvents;

export const resetEvents = (): ResetEvents => ({
    type: types.RESET_EVENTS,
});

export const setEventId = (eventId: number): SetEventId => ({
    type: types.SET_EVENT_ID,
    eventId,
});

export const forcedEvents = (): ForcedEvents => ({
    type: types.FORCED_EVENTS,
});
