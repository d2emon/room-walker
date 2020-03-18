import {Action} from 'redux';
import {
    ThunkAction,
    ThunkDispatch,
} from 'redux-thunk';
import {
    MainWindowAction,
    startGame,
    setAlarm,
    setKeysOff, setTitle,
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
import users from '../../../services/users';
import {onWait} from "../talker/thunks";
import {canOnTimer} from "./reducer";
import {getTitle} from "../talker/reducer";

// Types
type Dispatch<A extends Action> = ThunkDispatch<MainWindowAction, any, A>;
export type MainWindowThunkAction<A extends Action> = ThunkAction<any, Store, any, A>;

const pbfr = () => Promise.resolve();
const logOut = () => {
    console.log('loose me');
};

const screenBottom = () => pbfr();
const screenTop = () => pbfr();

export const onStart = (userId: string, title: string, name: string): MainWindowThunkAction<MainWindowAction> => (
    dispatch: Dispatch<MainWindowAction | LoggerAction | ErrorsAction>
) => {
    dispatch(logReset());
    if (!userId || !title || !name) {
        dispatch(setErrorMessage('Args!'));
    } else {
        users.setUser({
            userId,
            name,
        })
            .then(() => dispatch(startGame(userId, title, name)))
    }
};

export const onError = (): MainWindowThunkAction<MainWindowAction> => (
    dispatch: Dispatch<MainWindowAction>
) => {
    dispatch(setAlarm(false));
    logOut();
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
    logOut();
    dispatch(setErrorMessage('Byeeeeeeeeee  ...........'));
};

export const onTimer = (): MainWindowThunkAction<MainWindowAction> => (
    dispatch: Dispatch<MainWindowAction>,
    getState: () => Store,
) => {
    if (!canOnTimer(getState().mainWindow)) {
        return;
    }
    dispatch(setAlarm(false));
    onWait(dispatch, getState)
        .then(() => {
            // key_reprint()
        })
        .then(() => dispatch(setAlarm(true)));
};

export const beforeInput = (): MainWindowThunkAction<MainWindowAction> => (
    dispatch: Dispatch<MainWindowAction>,
    getState: () => Store,
) => Promise.resolve()
    .then(screenBottom)
    .then(screenTop)
    .then(() => getTitle(getState().talker))
    .then(title => title && dispatch(setTitle(title)))
    .then(() => dispatch(setAlarm(true)));

export const afterInput = (): MainWindowThunkAction<MainWindowAction> => (
    dispatch: Dispatch<MainWindowAction>,
) => dispatch(setAlarm(false));
