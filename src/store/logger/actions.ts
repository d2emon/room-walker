import { Dispatch } from '@reduxjs/toolkit';
import { LoggerAction, addLogMessage } from './slice';

export const syslog = (message: string) => async (dispatch: Dispatch<LoggerAction>) => {
  dispatch(addLogMessage({
    date: new Date(),
    message,
  }));
};
  
  