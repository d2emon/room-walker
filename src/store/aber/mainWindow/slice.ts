import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface MainWindowState {
  // Main Args
  userId: string | number;
  title: string;
  // External
  inFight: boolean;
  // Additional
  isSaved: boolean;
};

const initialState: MainWindowState = {
  userId: '',
  title: '',

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
    startGame: (state: MainWindowState, action: StartGameAction) => ({
      ...state,
      userId: action.payload.userId,
      isSaved: action.payload.isSaved,
    }),
  },
});

export const {
  startGame,
} = mainWindowSlice.actions;

export default mainWindowSlice.reducer;
