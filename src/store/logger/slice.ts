import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LoggerRecord, LoggerStateInterface } from './interface';

const initialState: LoggerStateInterface = {
  records: [],
};

type AddMessageAction = PayloadAction<LoggerRecord>;
  
export type LoggerAction = AddMessageAction;

export const loggerSlice = createSlice({
  name: 'logger',
  initialState,
  reducers: {
    addLogMessage: (state: LoggerStateInterface, action: LoggerAction): LoggerStateInterface => ({
        ...state,
        records: [
          ...state.records,
          action.payload,
        ],
      }),
  },
});

export const {
  addLogMessage,
} = loggerSlice.actions;

export default loggerSlice.reducer;
