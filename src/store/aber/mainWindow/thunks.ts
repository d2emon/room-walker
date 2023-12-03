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

// Start system

export const onStart = (userId: string, title: string, name: string) => async (
  dispatch: Dispatch<Action>,
) => {
  dispatch(logReset());

  try {
    if (!userId || !title || !name) {
      throw new Error('Args!');
    }

    const user = await Users.setUser({
      userId,
      name,
    });

    dispatch(startGame({
      userId: user.userId,
      title,
    }));

    dispatch(setUser({
      characterId: user?.character?.characterId || 0,
      name: user?.character?.name || '',
      channelId: user?.character?.channelId || 0,
      title,
    }));

    await startUser(dispatch, userId);    
  } catch(e: any) {
    console.error(e);
    dispatch(setErrorMessage({
      errorId: 0,
      message: e,
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
  // if(sig_active==0) return;
  if (!canOnTimer(getState())) {
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
   await sendAndShow(getPrompt(getState().talker));
   dispatch(setClean());
};

export const afterInput = (message: string = '') => (
  dispatch: Dispatch<Action>,
) => {
  dispatch(unsetInputMode(message));
  dispatch(setAlarm(false));
};
