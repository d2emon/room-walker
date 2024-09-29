import {Action} from 'redux';
import {
  ThunkAction,
  ThunkDispatch,
} from 'redux-thunk';
import UserAPI from 'services/users';
import { User } from 'services/users/types';
import { resetErrors, setError } from 'modules/error/store/slice';
import { setAlarm } from 'store/main/alarm/slice';
import { getAlarm } from 'store/main/selectors';
import {
  setTitle,
  updateTitle,
} from 'store/main/slice';
import {
  // MainWindowAction,
  startGame,
} from './slice';
import {
  setClean,
  setInputMode,
  unsetInputMode,
} from '../keys/slice';
import {
  setLoggedOut,
  setUser,
} from '../talker/slice';
/*
import {
  finishUser,
  onWait,
} from '../talker/thunks';
*/
import {Store} from '../..';
import { getPrompt } from '../talker/selectors';
import { getCanExit } from './selectors';

// Types
type Dispatch<A extends Action> = ThunkDispatch<Store, any, A>;
export type MainWindowThunkAction<A extends Action> = ThunkAction<any, Store, any, A>;

export interface NewCharacterData {
  sex: string;
};

const showMessages = (addLineBreak: boolean = false): Promise<void> => Promise.resolve();
const sendMessage = (message: string): Promise<void> => Promise.resolve();
const sendAndShow = (message: string): Promise<void> => sendMessage(message)
    .then(() => showMessages(false));

const screenBottom = () => showMessages();
const screenTop = () => showMessages();

const logOut = (
  code?: number,
  message?: string,
) => async (
  dispatch: Dispatch<Action>,
  // getState: () => Store,
) => {
  dispatch(setAlarm(false));

  dispatch(setLoggedOut());
  // await finishUser(getState);

  if (code || message) {
    dispatch(setError({
      code,
      message,
    }));
  }
};

const setUserFromAPI = (user: User | null) => async (dispatch: Dispatch<Action>) => {
  if (!user) {
    throw new Error('No user!');
  }

  if (user?.isSaved) {
    await UserAPI.perform(user?.userId, '.g');
  }

  dispatch(setUser({
    characterId: user?.characterId,
    name: user?.name,
    channelId: user?.character?.channelId,
  }));

  dispatch(startGame({
    userId: user?.userId,
    isSaved: user?.isSaved,
  }));
}

// Start system

export const onStart = (token: string, title: string, name: string) => async (
  dispatch: Dispatch<Action>,
) => {
  dispatch(resetErrors());

  try {
    dispatch(setTitle(title));

    const user = await UserAPI.loadUser(token);
    if (user) {
      dispatch(setUserFromAPI(user));
      return;
    }

    const newUser = await UserAPI.addUser(token, name);
    dispatch(setUserFromAPI(newUser));
  } catch(e) {
    console.error('Error in "onStart":', e);
    dispatch(setError({
      code: 0,
      message: (e as Error).message,
    }));
  }
};

// Start system with new user

export const createUserCharacter = (token: string, data: NewCharacterData) => async (
  dispatch: Dispatch<Action>,
) => {
  try {
    // keysetback();
    // keysetup();
    const user = await UserAPI.createCharacter(token, data);
    dispatch(setUserFromAPI(user));
  } catch(e) {
    console.error('Error in "createCharacter":', e);
    dispatch(setError({
      code: 0,
      message: (e as Error).message,
    }));
  }
};

// Signals

export const onError = async (
  dispatch: ThunkDispatch<Store, null, Action>,
) => {
  await dispatch(logOut(0, ''));
};

export const onExit = async (
  dispatch: ThunkDispatch<Store, null, Action>,
  getState: () => Store,
) => {
  if (getCanExit(getState())) {
    return;
  }

  await dispatch(logOut(255, 'Byeeeeeeeeee  ...........'));
};

export const onTimer = async (
  dispatch: ThunkDispatch<Store, null, Action>,
  getState: () => Store,
) => {
  if (!getAlarm(getState())) {
    return;
  }

  dispatch(setAlarm(false));

  // await onWait(dispatch, getState, getState().mainWindow.userId);
  await showMessages(true);
  dispatch(setClean());

  dispatch(setAlarm(true));
};

// ----

export const beforeInput = () => async (
  dispatch: Dispatch<Action>,
  getState: () => Store,
) => {
   await screenBottom();
   await screenTop();
   dispatch(updateTitle());
   dispatch(setAlarm(true));
   dispatch(setInputMode());
   await sendAndShow(getPrompt(getState()));
   dispatch(setClean());
};

export const afterInput = (message: string = '') => (
  dispatch: Dispatch<Action>,
) => {
  dispatch(unsetInputMode(message));
  dispatch(setAlarm(false));
};
