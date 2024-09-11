import {Action} from 'redux';
import {
  ThunkAction,
  ThunkDispatch,
} from 'redux-thunk';
import { Store } from '../..';
import logger, { Message } from '../../../services/logger';
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
    const records = await logger.getLog();
    dispatch(logReset());
    records.forEach((record: Message) => dispatch(logMessage(record)));
  } catch(e) {
    console.error('Error in "getMessages":', e);
  }
};
