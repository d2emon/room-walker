import {Action} from 'redux';
import {
    ThunkAction,
    ThunkDispatch,
} from 'redux-thunk';
import axios from "axios";
import {
    LoggerAction,
    logReset,
    logMessage,
} from './actions';
import {Store} from '../../reducers';

// Types
type Dispatch<A extends Action> = ThunkDispatch<LoggerAction, any, A>;
export type LoggerThunkAction<A extends Action> = ThunkAction<any, Store, any, A>;

export const getMessages = (): LoggerThunkAction<LoggerAction> => (
    dispatch: Dispatch<LoggerAction>
) => Promise.resolve(dispatch(logReset()))
    .then(() => axios.get('http://127.0.0.1:4002'))
    .then(response => response.data)
    .then(data => data.records)
    .then(records => records.forEach((record: any) => dispatch(logMessage(record.date, record.message))));
