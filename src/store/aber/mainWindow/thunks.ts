import {Action} from 'redux';
import {
    ThunkAction,
    ThunkDispatch,
} from 'redux-thunk';
import {
    MainWindowAction,
    startGame,
    setAlarm,
    setKeysOff,
} from './actions';
import {
    LoggerAction,
    logReset,
} from '../logger/actions';
import {
    ErrorsAction,
    setErrorMessage
} from '../errors/actions';
import {Store} from '../../reducers';
import axios from "axios";

// Types
type Dispatch<A extends Action> = ThunkDispatch<MainWindowAction, any, A>;
export type MainWindowThunkAction<A extends Action> = ThunkAction<any, Store, any, A>;

const looseMe = () => {
    console.log('loose me');
};

export const onStart = (userId: string, title: string, name: string): MainWindowThunkAction<MainWindowAction> => (
    dispatch: Dispatch<MainWindowAction | LoggerAction | ErrorsAction>
) => {
    dispatch(logReset());
    if (!userId || !title || !name) {
        dispatch(setErrorMessage('Args!'));
    } else {
        axios.post(
            'http://127.0.0.1:4001',
            {
                userId,
                name,
            },
        )
            .then(() => dispatch(startGame(userId, title, name)))
    }
};

export const onError = (): MainWindowThunkAction<MainWindowAction> => (
    dispatch: Dispatch<MainWindowAction>
) => {
    dispatch(setAlarm(false));
    looseMe();
    dispatch(setKeysOff(255));
};

export const onExit = (): MainWindowThunkAction<MainWindowAction> => (
    dispatch: Dispatch<MainWindowAction | ErrorsAction>,
    getState: () => Store,
) => {
    // console.log("^C");
    if (getState().mainWindow.inFight) {
        return;
    }
    dispatch(setAlarm(false));
    looseMe();
    dispatch(setErrorMessage('Byeeeeeeeeee  ...........'));
};

export const onTimer = (): MainWindowThunkAction<MainWindowAction> => (
    dispatch: Dispatch<MainWindowAction>,
    getState: () => Store,
) => {
    if (getState().mainWindow.ignore
        || !getState().mainWindow.active
    ) {
        return;
    }
    dispatch(setAlarm(false));
    // openworld()
    // dispatch(setInterrupt(true));
    // rte(getState().mainWindow.name);
    // dispatch(setInterrupt(false));
    // on_timing()
    // closeworld()
    // key_reprint()
    dispatch(setAlarm(true));
};
