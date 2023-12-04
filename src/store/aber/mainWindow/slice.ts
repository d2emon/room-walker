import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Store } from 'store/reducers';

export interface MainWindowState {
  // Main Args
  userId: string | number,
  title: string,
  // Timer
  active: boolean,
  alarm: number,
  ignore: boolean,
  // External
  inFight: boolean,
};

const initialState: MainWindowState = {
  userId: '',
  title: '',

  active: false,
  alarm: 0,
  ignore: false,

  inFight: false,
};

interface StartGamePayload {
  userId: string | number;
  title: string;
}
type StartGameAction = PayloadAction<StartGamePayload>;
type SetAlarmAction = PayloadAction<boolean>;
type SetBlockAction = PayloadAction<boolean>;
  
export type MainWindowAction = StartGameAction | SetAlarmAction | SetBlockAction;

export const mainWindowSlice = createSlice({
  name: 'mainWindow',
  initialState,
  reducers: {
    startGame: (state: MainWindowState, action: StartGameAction) => {
      state.userId = action.payload.userId;
      state.title = action.payload.title;
    },
    setAlarm: (state: MainWindowState, action: SetAlarmAction) => {
      state.active = action.payload;
      state.alarm = action.payload ? 2 : 2147487643;
      state.ignore = !action.payload;
    },
    setBlock: (state: MainWindowState, action: SetBlockAction) => {
      if (!action.payload && state.active) {
        state.alarm = 2;
      }
      state.ignore = action.payload;
    },
  },
});

// Selectors
export const canExit = (state: Store) => !state.mainWindow.inFight;
export const timerIsOn = (state: Store) => !state.mainWindow.ignore;
export const canOnTimer = (state: Store) => state.mainWindow.active && !state.mainWindow.ignore;

export const {
  startGame,
  setAlarm,
  setBlock,
} = mainWindowSlice.actions;

export default mainWindowSlice.reducer;
