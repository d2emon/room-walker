import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Store } from '..';
import {Alarm} from '../../types';

export interface MainState {
  userId?: number,
  title: string,
  error: {
    code: number,
    message: string,
  } | null,
  timerActive: boolean, // sig_active
  alarm: Alarm,
  interrupt: boolean,
  // TODO: Remove fields
  name?: string,
  inFight?: boolean,
  prDue?: boolean,
};

const initialState: MainState = {
  title: '',
  error: null,
  timerActive: false,
  alarm: new Alarm(),
  interrupt: false,
};

/*
interface SetStartedPayload {
  userId: number,
}

interface SetFinishedPayload {
  code: number,
  message: string,
}

interface SetTitlePayload {
  title: string,
}

interface SetActivePayload {
  timerActive: boolean,
}

interface SetAlarmPayload {
  alarm: Alarm,
}

interface SetInterruptPayload {
  interrupt: boolean,
}

// TODO: Remove interfaces
interface SetPrDuePayload {
  prDue: boolean,
}

export type SetStartedAction = PayloadAction<SetStartedPayload>;
export type SetFinishedAction = PayloadAction<SetFinishedPayload>;
export type SetTitleAction = PayloadAction<SetTitlePayload>;
export type SetActiveAction = PayloadAction<SetActivePayload>;
export type SetAlarmAction = PayloadAction<SetAlarmPayload>;
export type SetInterruptAction = PayloadAction<SetInterruptPayload>;
export type SetPrDueAction = PayloadAction<SetPrDuePayload>;
*/

type SetStartedAction = PayloadAction<number>;
interface SetFinishedPayload {
  code: number;
  message: string;
}
type SetFinishedAction = PayloadAction<SetFinishedPayload>;
type SetTitleAction = PayloadAction<string>;
type SetActiveAction = PayloadAction<boolean>;
type SetAlarmAction = PayloadAction<boolean>;
type SetInterruptAction = PayloadAction<boolean>;
  
export type MainAction = SetStartedAction | SetTitleAction | SetActiveAction | SetAlarmAction;

export const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    // Setters
    setStarted: (state: MainState, action: SetStartedAction) => ({
      ...state,
      userId: action.payload,
      title: '',
      error: null,
      timerActive: false,
      alarm: new Alarm(),
      interrupt: false,
    }),
    setFinished: (state: MainState, action: SetFinishedAction) => ({
      ...state,
      error: {
        code: action.payload.code,
        message: action.payload.message,
      },
      userId: undefined,
    }),

    // setProgname
    setTitle: (state: MainState, action: SetTitleAction) => ({
      ...state,
      title: action.payload,
    }),
    setActive: (state: MainState, action: SetActiveAction) => ({
      ...state,
      timerActive: action.payload,
      alarm: {
        active: action.payload,
        timeout: action.payload ? 2 : 2147487643,
      },
    }),
    setAlarm: (state: MainState, action: SetAlarmAction) => ({
      ...state,
      alarm: {
        active: action.payload,
        timeout: action.payload ? 2 : null,
      },
    }),
    setInterrupt: (state: MainState, action: SetInterruptAction) => ({
      ...state,
      interrupt: action.payload,
    }),

    // TODO: Remove actions
    setPrDue: (state: MainState, action: SetActiveAction) => ({
      ...state,
      prDue: action.payload,
    }),
  },
});

// Selectors
export const getStarted = (state: Store) => !!state.main.userId;

export const {
  setActive,
  setAlarm,
  setFinished,
  setInterrupt,
  setPrDue,
  setStarted,
  setTitle,
} = mainSlice.actions;

export default mainSlice.reducer;
