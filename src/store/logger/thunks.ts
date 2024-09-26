import {Action} from 'redux';
import {
  ThunkAction,
  ThunkDispatch,
} from 'redux-thunk';
import logger from 'services/logger';
import { LogMessage } from 'types/LogMessage';
import { Store } from '..';
import {
  LoggerAction,
  logReset,
  logMessage,
} from './slice';

// Types
type Dispatch<A extends Action> = ThunkDispatch<Store, any, A>;
export type LoggerThunkAction<A extends Action> = ThunkAction<any, Store, any, A>;

export const getMessages = () => async (
  dispatch: Dispatch<LoggerAction>
) => {
  try {
    dispatch(logReset());
    const records = await logger.getLog();
    records.forEach((record: LogMessage) => dispatch(logMessage(record)));
  } catch(e) {
    console.error('Error in "getMessages":', e);
  }
};
