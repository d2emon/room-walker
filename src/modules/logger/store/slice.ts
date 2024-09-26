import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LogMessage } from '../types/LogMessage';

export interface LoggerState {
  messages: LogMessage[];
};

const initialState: LoggerState = {
  messages: [],
};

type LogResetAction = PayloadAction<void>;
type LogMessageAction = PayloadAction<LogMessage>;
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

export const {
  logMessage,
  logReset,
} = loggerSlice.actions;

export default loggerSlice.reducer;
