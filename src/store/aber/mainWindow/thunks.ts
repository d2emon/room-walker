import {Action} from 'redux';
import {
  ThunkAction,
  ThunkDispatch,
} from 'redux-thunk';
import {
  // MainWindowAction,
  canOnTimer,
  startGame,
  setAlarm,
} from './slice';
import {
  setError,
  setErrorMessage
} from '../errors/slice';
import {
  setClean,
  setInputMode,
  unsetInputMode,
} from '../keys/slice';
import {
  logReset,
} from '../logger/slice';
import {
  setLoggedIn,
  setLoggedOut,
  setUser,
  updateTitle,
} from '../talker/slice';
/*
import {
  finishUser,
  onWait,
} from '../talker/thunks';
*/
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

const startUser = async (
  dispatch: Dispatch<Action>,
  userId: string,
) => {
  await Users.processEvents(userId);
  await Users.perform(userId, '.g');
  dispatch(setLoggedIn());
}

const logOut = async (
  dispatch: Dispatch<Action>,
  getState: () => Store,
  errorMessage?: string,
) => {
  dispatch(setAlarm(false));
  dispatch(setLoggedOut());

  // await finishUser(getState);

  return errorMessage && dispatch(setErrorMessage(errorMessage));
};

const screenBottom = () => showMessages();
const screenTop = () => showMessages();

export const onStart = (userId: string, title: string, name: string) => async (
  dispatch: Dispatch<Action>,
) => {
  dispatch(logReset());

  if (!userId || !title || !name) {
    dispatch(setErrorMessage('Args!'));
  }

  try {
    const user = await Users.setUser({
      userId,
      name,
    });
    dispatch(startGame({
      userId: user.userId,
      title,
    }));
    dispatch(setUser({
      characterId: user.character.characterId || 0,
      name: user.character.name,
      channelId: user.character.channelId,
      title,
    }));
    await startUser(dispatch, userId);    
  } catch(e: any) {
    dispatch(setErrorMessage(e));
  }
};

export const onError = () => async (
  dispatch: Dispatch<Action>,
  getState: () => Store,
) => {
  await logOut(dispatch, getState);
  dispatch(setError());
};

export const onExit = () => (
  dispatch: Dispatch<Action>,
  getState: () => Store,
) => getState().mainWindow.inFight || logOut(dispatch, getState, 'Byeeeeeeeeee  ...........');

export const onTimer = () => async (
  dispatch: Dispatch<Action>,
  getState: () => Store,
) => {
  if (!canOnTimer(getState())) {
    return;
  }
  dispatch(setAlarm(false));
  // await onWait(dispatch, getState, getState().mainWindow.userId);
  await showMessages(true);
  dispatch(setClean());
  await dispatch(setAlarm(true));
};

export const beforeInput = () => async (
  dispatch: Dispatch<Action>,
  getState: () => Store,
) => {
   await screenBottom();
   await screenTop();
   dispatch(updateTitle());
   dispatch(setAlarm(true));
   dispatch(setInputMode());
   await sendAndShow(getPrompt(getState().talker));
   dispatch(setClean());
};

export const afterInput = (message: string = '') => (
  dispatch: Dispatch<Action>,
) => {
  dispatch(unsetInputMode(message));
  dispatch(setAlarm(false));
};
