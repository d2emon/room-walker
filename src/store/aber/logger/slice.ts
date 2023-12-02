import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Store } from 'store/reducers';
import { Message } from '../../../services/logger';

export interface LoggerState {
  messages: Message[];
};

const initialState: LoggerState = {
  messages: [],
};

type LogResetAction = PayloadAction<undefined>;
type LogMessageAction = PayloadAction<Message>;
export type LoggerAction = LogResetAction | LogMessageAction;

export const loggerSlice = createSlice({
  name: 'logger',
  initialState,
  reducers: {
    logReset: (state: LoggerState) => {
      state.messages = [];
    },
    logMessage: (state: LoggerState, action: LogMessageAction) => {
      state.messages.push(action.payload);
    },
  },
});

// Selectors
export const getMessages = (state: Store) => state.logger.messages;

export const {
  logMessage,
  logReset,
} = loggerSlice.actions;

export default loggerSlice.reducer;
