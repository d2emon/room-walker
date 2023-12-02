import {Action} from 'redux';
import {
    ThunkAction,
    ThunkDispatch,
} from 'redux-thunk';
import {
    MainWindowAction,
    startGame,
    setAlarm,
} from './actions';
import {canOnTimer} from './reducer';
import {
    setError,
    setErrorMessage
} from '../errors/actions';
import {
    setClean,
    setInputMode,
    unsetInputMode,
} from '../keys/actions';
import {logReset} from '../logger/actions';
import {
    setLoggedIn,
    setLoggedOut,
    setUser,
    updateTitle,
} from '../talker/actions';
import {
    finishUser,
    onWait,
} from '../talker/thunks';
import {Store} from '../../reducers';
import Users from '../../../services/users';
import {getPrompt} from "../talker/reducer";

// Types
type Dispatch<A extends Action> = ThunkDispatch<Store, any, A>;
export type MainWindowThunkAction<A extends Action> = ThunkAction<any, Store, any, A>;

const showMessages = (addLineBreak: boolean = false): Promise<void> => Promise.resolve();
const sendMessage = (message: string): Promise<void> => Promise.resolve();
const sendAndShow = (message: string): Promise<void> => sendMessage(message)
    .then(() => showMessages(false));

const startUser = (
    dispatch: Dispatch<Action>,
    userId: string,
) => Users.processEvents(userId)
    .then(() => Users.perform(userId, '.g'))
    .then(() => dispatch(setLoggedIn()));

const logOut = (
    dispatch: Dispatch<Action>,
    getState: () => Store,
    errorMessage?: string,
) => {
    dispatch(setAlarm(false));
    dispatch(setLoggedOut());
    return finishUser(getState)
        .then(() => errorMessage && dispatch(setErrorMessage(errorMessage)));
};

const screenBottom = () => showMessages();
const screenTop = () => showMessages();

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

export const onError = (): MainWindowThunkAction<Action> => (
    dispatch: Dispatch<Action>,
    getState: () => Store,
) => logOut(dispatch, getState)
    .then(() => dispatch(setError()));

export const onExit = (): MainWindowThunkAction<Action> => (
    dispatch: Dispatch<Action>,
    getState: () => Store,
) => getState().mainWindow.inFight || logOut(dispatch, getState, 'Byeeeeeeeeee  ...........');

export const onTimer = (): MainWindowThunkAction<Action> => (
    dispatch: Dispatch<Action>,
    getState: () => Store,
) => {
    if (!canOnTimer(getState().mainWindow)) {
        return;
    }
    dispatch(setAlarm(false));
    onWait(dispatch, getState, getState().mainWindow.userId)
        .then(() => showMessages(true))
        .then(() => dispatch(setClean()))
        .then(() => dispatch(setAlarm(true)));
};

export const beforeInput = (): MainWindowThunkAction<Action> => (
    dispatch: Dispatch<Action>,
    getState: () => Store,
) => Promise.resolve()
    .then(screenBottom)
    .then(screenTop)
    .then(() => {
        dispatch(updateTitle());
        dispatch(setAlarm(true));
        dispatch(setInputMode());
        return sendAndShow(getPrompt(getState().talker));
    })
    .then(() => dispatch(setClean()));

export const afterInput = (message: string = ''): MainWindowThunkAction<Action> => (
    dispatch: Dispatch<Action>,
) => {
    dispatch(unsetInputMode(message));
    dispatch(setAlarm(false));
};
