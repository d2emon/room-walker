import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {Alarm} from '../../types';

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

export type MainAction = SetStartedAction | SetFinishedAction | SetTitleAction
  | SetActiveAction | SetAlarmAction | SetInterruptAction | SetPrDueAction;

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
}

const initialState: MainState = {
  title: '',
  error: null,
  timerActive: false,
  alarm: new Alarm(),
  interrupt: false,
};

export const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    setStarted: (state: MainState, action: SetStartedAction) => ({
      ...state,
      userId: action.payload.userId,
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
      title: action.payload.title,
    }),
    setActive: (state: MainState, action: SetActiveAction) => ({
      ...state,
      timerActive: action.payload.timerActive,
      alarm: {
        active: action.payload.timerActive,
        timeout: action.payload.timerActive ? 2 : 2147487643,
      },
    }),
    setAlarm: (state: MainState, action: SetAlarmAction) => ({
      ...state,
      alarm: {
        active: action.payload.alarm.active,
        timeout: action.payload.alarm.active ? 2 : state.alarm.timeout,
      },
    }),
    setInterrupt: (state: MainState, action: SetInterruptAction) => ({
      ...state,
      interrupt: action.payload.interrupt,
    }),
    // TODO: Remove actions
    setName: (state: MainState, action) => ({
      ...state,
      name: action.payload.name,
    }),
    setPrDue: (state: MainState, action) => ({
      ...state,
      name: action.payload.prDue,
    }),
  },
});

export const { setActive, setAlarm, setFinished, setInterrupt, setName, setPrDue, setStarted, setTitle } = mainSlice.actions;

export default mainSlice.reducer;
