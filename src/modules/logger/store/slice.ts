import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LogMessage } from '../types/LogMessage';

export interface LoggerStateInterface {
  messages: LogMessage[];
};

const initialState: LoggerStateInterface = {
  messages: [],
};

type LogResetAction = PayloadAction<void>;
type LogMessageAction = PayloadAction<LogMessage>;
export type LoggerAction = LogResetAction | LogMessageAction;

export const loggerSlice = createSlice({
  name: 'logger',
  initialState,
  reducers: {
    logReset: (state: LoggerStateInterface) => {
      state.messages = [];
    },
    logMessage: (state: LoggerStateInterface, action: LogMessageAction) => {
      state.messages.push(action.payload);
    },
  },
});

export const {
  logMessage,
  logReset,
} = loggerSlice.actions;

export default loggerSlice.reducer;
