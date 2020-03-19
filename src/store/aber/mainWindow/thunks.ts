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
import {canOnTimer} from './reducer';
import {
    ErrorsAction,
    setErrorMessage
} from '../errors/actions';
import {logReset} from '../logger/actions';
import {
    setLoggedIn,
    setLoggedOut,
    setUser,
    TalkerAction,
    updateTitle,
} from '../talker/actions';
import {
    finishUser,
    onWait,
} from '../talker/thunks';
import {Store} from '../../reducers';
import Users from '../../../services/users';

// Types
type Dispatch<A extends Action> = ThunkDispatch<MainWindowAction, any, A>;
export type MainWindowThunkAction<A extends Action> = ThunkAction<any, Store, any, A>;

const pbfr = () => Promise.resolve();

const screenBottom = () => pbfr();
const screenTop = () => pbfr();

const startUser = (
    dispatch: Dispatch<Action>,
    userId: string,
) => Users.processEvents(userId)
    .then(() => Users.perform(userId, '.g'))
    .then(() => dispatch(setLoggedIn()));

const logOut = (
    dispatch: Dispatch<Action>,
    getState: () => Store,
) => {
    dispatch(setAlarm(false));
    dispatch(setLoggedOut());
    return finishUser(getState);
};

export const onStart = (userId: string, title: string, name: string): MainWindowThunkAction<MainWindowAction> => (
    dispatch: Dispatch<Action>,
) => {
    dispatch(logReset());
    if (!userId || !title || !name) {
        dispatch(setErrorMessage('Args!'));
    }
    Users.setUser({
        userId,
        name,
    })
        .then((user) => {
            dispatch(startGame(user.userId, title));
            dispatch(setUser(
                user.character.characterId || 0,
                user.character.name,
                user.character.channelId,
                title,
            ));
            return startUser(dispatch, userId);
        })
        .catch(e => dispatch(setErrorMessage(e)));
};

export const onError = (): MainWindowThunkAction<MainWindowAction> => (
    dispatch: Dispatch<MainWindowAction>,
    getState: () => Store,
) => logOut(dispatch, getState)
    .then(() => dispatch(setKeysOff(255)));

export const onExit = (): MainWindowThunkAction<MainWindowAction> => (
    dispatch: Dispatch<MainWindowAction | ErrorsAction>,
    getState: () => Store,
) => {
    // console.log("^C");
    if (getState().mainWindow.inFight) {
        return;
    }
    logOut(dispatch, getState)
        .then(() => dispatch(setErrorMessage('Byeeeeeeeeee  ...........')));
};

export const onTimer = (): MainWindowThunkAction<MainWindowAction> => (
    dispatch: Dispatch<MainWindowAction>,
    getState: () => Store,
) => {
    if (!canOnTimer(getState().mainWindow)) {
        return;
    }
    dispatch(setAlarm(false));
    onWait(dispatch, getState, getState().mainWindow.userId)
        .then(() => {
            // key_reprint()
        })
        .then(() => dispatch(setAlarm(true)));
};

export const beforeInput = (): MainWindowThunkAction<MainWindowAction> => (
    dispatch: Dispatch<MainWindowAction | TalkerAction>,
) => Promise.resolve()
    .then(screenBottom)
    .then(screenTop)
    .then(() => dispatch(updateTitle()))
    .then(() => dispatch(setAlarm(true)));

export const afterInput = (): MainWindowThunkAction<MainWindowAction> => (
    dispatch: Dispatch<MainWindowAction>,
) => dispatch(setAlarm(false));
