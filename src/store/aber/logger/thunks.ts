import {Action} from 'redux';
import {
    ThunkAction,
    ThunkDispatch,
} from 'redux-thunk';
import {
    LoggerAction,
    logReset,
    logMessage,
} from './actions';
import {Store} from '../../reducers';
import logger from '../../../services/logger';

// Types
type Dispatch<A extends Action> = ThunkDispatch<Store, any, A>;
export type LoggerThunkAction<A extends Action> = ThunkAction<any, Store, any, A>;

export const getMessages = (): LoggerThunkAction<LoggerAction> => (
    dispatch: Dispatch<LoggerAction>
) => logger.getLog()
    .then((records) => {
        dispatch(logReset());
        records.forEach((record: any) => dispatch(logMessage(record.date, record.message)))
    });
