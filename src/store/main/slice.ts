import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Store } from 'store/reducers';
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

type SetStartedAction = PayloadAction<number>;
interface SetFinishedPayload {
  code: number;
  message: string;
}
type SetFinishedAction = PayloadAction<SetFinishedPayload>;
type SetTitleAction = PayloadAction<string>;
type SetActiveAction = PayloadAction<boolean>;
type SetAlarmAction = PayloadAction<boolean>;
  
export type MainAction = SetStartedAction | SetTitleAction | SetActiveAction | SetAlarmAction;

export const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    // Setters
    setStarted: (state: MainState, action: SetStartedAction) => {
      state.userId = action.payload;
      state.title = '';
      state.error = null;
      state.timerActive = false;
      state.alarm = new Alarm();
      state.interrupt = false;
    },
    setFinished: (state: MainState, action: SetFinishedAction) => {
      state.error = {
        code: action.payload.code,
        message: action.payload.message,
      };
      state.userId = undefined;
    },

    // setProgname
    setTitle: (state: MainState, action: SetTitleAction) => {
      state.title = action.payload;
    },
    setActive: (state: MainState, action: SetActiveAction) => {
      state.timerActive = action.payload;
      state.alarm = {
        active: action.payload,
        timeout: action.payload ? 2 : 2147487643,
      };
    },
    setAlarm: (state: MainState, action: SetActiveAction) => {
      state.alarm = {
        active: action.payload,
        timeout: action.payload ? 2 : null,
      };
    },
    setInterrupt: (state: MainState, action: SetActiveAction) => {
      state.interrupt = action.payload;
    },

    // TODO: Remove actions
    setPrDue: (state: MainState, action: SetActiveAction) => {
      state.prDue = action.payload;
    },
  },
});

// Selectors
export const getStarted = (state: Store) => !!state.main.userId;

export const {
  setActive,
  setAlarm,
  setInterrupt,
  setFinished,
  setPrDue,
  setStarted,
  setTitle,
} = mainSlice.actions;

export default mainSlice.reducer;
