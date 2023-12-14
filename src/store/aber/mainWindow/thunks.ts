import {Action} from 'redux';
import {
  ThunkAction,
  ThunkDispatch,
} from 'redux-thunk';
import { getCanOnTimer } from './selectors';
import {
  // MainWindowAction,
  startGame,
  setAlarm,
} from './slice';
import {
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
import Users, { AddUserResponse, addUser, createCharacter } from '../../../services/users';
import { getPrompt } from '../talker/selectors';
import { UserId } from 'services/users/types';
import { setTitle } from 'store/main/slice';

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
  errorId?: number,
  message?: string,
) => {
  dispatch(setAlarm(false));

  dispatch(setLoggedOut());
  // await finishUser(getState);

  if (errorId || message) {
    dispatch(setErrorMessage({
      errorId,
      message,
    }));
  }
};

const screenBottom = () => showMessages();
const screenTop = () => showMessages();

const onUserResponse = (response: AddUserResponse, title?: string) => async (
  dispatch: Dispatch<Action>,  
) => {
  const {
    user,
  } = response;
  const userId = user?.userId || '';
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

export const onStart = (title: string, name: string) => async (
  dispatch: Dispatch<Action>,
) => {
  dispatch(logReset());

  try {
    if (!title || !name) {
      throw new Error('Args!');
    }

    dispatch(setTitle(title));

    const userResponse = await addUser(name);
    dispatch(onUserResponse(userResponse, title));
  } catch(e) {
    console.error('Error in "onStart":', e);
    dispatch(setErrorMessage({
      errorId: 0,
      message: (e as Error).message,
    }));
  }
};

export const createUserCharacter = (userId: UserId, sex: string) => async (
  dispatch: Dispatch<Action>,
) => {
  try {
    const userResponse = await createCharacter(userId, {
      sex,
    });
    dispatch(onUserResponse(userResponse));
  } catch(e) {
    console.error('Error in "createCharacter":', e);
    dispatch(setErrorMessage({
      errorId: 0,
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
  if (!getCanOnTimer(getState())) {
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
