import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Store } from '../..';

export interface EventsState {
  eventId?: number;
  forceEvents: boolean;
};

const initialState: EventsState = {
  eventId: undefined,
  forceEvents: false,
};

type ResetEventsAction = PayloadAction<undefined>;
type SetEventIdAction = PayloadAction<number>;
export type EventsAction = ResetEventsAction | SetEventIdAction;

export const eventsSlice = createSlice({
  name: 'logger',
  initialState,
  reducers: {
    resetEvents: (state: EventsState) => {
      state.eventId = undefined;
    },
    setEventId: (state: EventsState, action: SetEventIdAction) => {
      state.eventId = action.payload;
    },
    forcedEvents: (state: EventsState) => {
      state.forceEvents = false;
    },
  },
});

// Selectors
export const getMessages = (state: Store) => state.logger.messages;

export const {
  resetEvents,
  setEventId,
  forcedEvents,
} = eventsSlice.actions;

export default eventsSlice.reducer;
