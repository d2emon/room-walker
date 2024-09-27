import {Action} from 'redux';
import {
  ThunkAction,
  ThunkDispatch,
} from 'redux-thunk';
import Users, { AddUserResponse, addUser, createCharacter, loadUser } from 'services/users';
import { User, UserId } from 'services/users/types';
import { setError } from 'store/error/slice';
import { setAlarm } from 'store/main/alarm/slice';
import { getAlarm } from 'store/main/selectors';
import { setTitle } from 'store/main/slice';
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
  updateTitle,
} from '../talker/slice';
/*
import {
  finishUser,
  onWait,
} from '../talker/thunks';
*/
import {Store} from '../..';
import { getPrompt } from '../talker/selectors';

// Types
type Dispatch<A extends Action> = ThunkDispatch<Store, any, A>;
export type MainWindowThunkAction<A extends Action> = ThunkAction<any, Store, any, A>;

const showMessages = (addLineBreak: boolean = false): Promise<void> => Promise.resolve();
const sendMessage = (message: string): Promise<void> => Promise.resolve();
const sendAndShow = (message: string): Promise<void> => sendMessage(message)
    .then(() => showMessages(false));

const logOut = async (
  dispatch: Dispatch<Action>,
  getState: () => Store,
  code?: number,
  message?: string,
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

const screenBottom = () => showMessages();
const screenTop = () => showMessages();

const onUserResponse = (user: User | null, title?: string) => async (
  dispatch: Dispatch<Action>,  
) => {
  if (!user) {
    throw new Error('No user!');
  }

  const userId = user?.userId;
  const character = user?.character;
  const isSaved = user?.isSaved;

  if (isSaved) {
    await Users.perform(userId, '.g');
  }

  dispatch(startGame({
    userId,
    isSaved,
  }));
  dispatch(setUser({
    characterId: user?.characterId,
    name: user?.name,
    channelId: character?.channelId,
    title,
  }));
}

// Start system

export const onStart = (userId: UserId, title: string, name: string) => async (
  dispatch: Dispatch<Action>,
) => {
  try {
    if (!userId) {
      throw new Error('Unauthorized user!');
    }
    if (!title) {
      throw new Error('Title is required!');
    }
    if (!name) {
      throw new Error('Name is required!');
    }

    dispatch(setTitle(title));

    const loadUserResponse = await loadUser(userId);
    if (loadUserResponse) {
      console.log(loadUserResponse);
      return;
    }

    const user = await addUser(userId, name);
    dispatch(onUserResponse(user, title));
  } catch(e) {
    console.error('Error in "onStart":', e);
    dispatch(setError({
      code: 0,
      message: (e as Error).message,
    }));
  }
};

// Start system with new user

export const createUserCharacter = (userId: UserId, sex: string) => async (
  dispatch: Dispatch<Action>,
) => {
  try {
    if (!userId) {
      throw new Error('Args!');
    }

    const user = await createCharacter(userId, {
      sex,
    });
    dispatch(onUserResponse(user || null));
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
  dispatch: Dispatch<Action>,
  getState: () => Store,
) => {
  await logOut(dispatch, getState, 0, '');
};

export const onExit = async (
  dispatch: Dispatch<Action>,
  getState: () => Store,
) => {
  if (getState().mainWindow.inFight) {
    return;
  }

  await logOut(dispatch, getState, 255, 'Byeeeeeeeeee  ...........');
};

export const onTimer = async (
  dispatch: Dispatch<Action>,
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
