import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
  // Additional
  isSaved: boolean,
};

const initialState: MainWindowState = {
  userId: '',
  title: '',

  active: false,
  alarm: 0,
  ignore: false,

  inFight: false,

  isSaved: true,
};

interface StartGamePayload {
  userId: string | number;
  isSaved: boolean;
}
type StartGameAction = PayloadAction<StartGamePayload>;
type SetAlarmAction = PayloadAction<boolean>;
type SetBlockAction = PayloadAction<boolean>;
type SetTitleAction = PayloadAction<string>;
  
export type MainWindowAction = StartGameAction | SetAlarmAction | SetBlockAction | SetTitleAction;

export const mainWindowSlice = createSlice({
  name: 'mainWindow',
  initialState,
  reducers: {
    startGame: (state: MainWindowState, action: StartGameAction) => {
      state.userId = action.payload.userId;
      state.isSaved = action.payload.isSaved;
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
    setTitle: (state: MainWindowState, action: SetTitleAction) => {
      state.title = action.payload;
    },
  },
});

export const {
  startGame,
  setAlarm,
  setBlock,
} = mainWindowSlice.actions;

export default mainWindowSlice.reducer;
