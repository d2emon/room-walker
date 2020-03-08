import {Action} from 'redux';
import {
    ThunkAction,
    ThunkDispatch,
} from 'redux-thunk';
import * as types from './actionTypes';

// Interfaces
interface StartGame extends Action {
    type: types.START_GAME,
    userId: string,
    title: string,
    name: string,
}

interface SetErrorMessage extends Action {
    type: types.SET_ERROR_MESSAGE,
    errorMessage: string,
}

interface SetAlarmOff extends Action {
    type: types.SET_ALARM_OFF,
}

interface SetKeysOff extends Action {
    type: types.SET_KEYS_OFF,
    errorId: number,
}

interface SetError extends Action {
    type: types.SET_ERROR,
}

// Types
export type MainWindowAction = StartGame | SetErrorMessage | SetAlarmOff | SetKeysOff | SetError;
type Dispatch<A extends Action> = ThunkDispatch<MainWindowAction, any, A>;
export type MainWindowThunkAction<A extends Action> = ThunkAction<any, MainWindowAction, any, A>;

export const startGame = (userId: string, title: string, name: string): MainWindowAction => ({
    type: types.START_GAME,
    userId,
    title,
    name,
});

const setErrorMessage = (errorMessage: string): SetErrorMessage => ({
    type: types.SET_ERROR_MESSAGE,
    errorMessage,
});

const setAlarmOff = (): SetAlarmOff => ({
    type: types.SET_ALARM_OFF,
});

const setKeysOff = (errorId: number): SetKeysOff => ({
    type: types.SET_KEYS_OFF,
    errorId,
});

const looseMe = () => {
    console.log('loose me');
};

export const onError = (): MainWindowThunkAction<Action> => (
    dispatch: Dispatch<Action>
) => {
    dispatch(setAlarmOff());
    looseMe();
    dispatch(setKeysOff(255));
};

export const onExit = (): MainWindowThunkAction<Action> => (
    dispatch: Dispatch<Action>
) => {
    /*
        if (this.props.inFight) {
            return;
        }
     */
    dispatch(setAlarmOff());
    looseMe();
    dispatch(setErrorMessage('Byeeeeeeeeee  ...........'));
};
