import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface MainAlarmState {
  active: boolean;
  timeout: number | null;
  timerActive: boolean; // sig_active
};

const initialState: MainAlarmState = {
  active: false,
  timeout: 0,
  timerActive: false,
};

type SetStartedAction = PayloadAction<null>;
export type SetActiveAction = PayloadAction<boolean>;
export type SetAlarmAction = PayloadAction<boolean>;
  
export type MainAlarmAction = SetStartedAction | SetActiveAction | SetAlarmAction;

export const mainAlarmSlice = createSlice({
  name: 'mainAlarm',
  initialState,
  reducers: {
    // Setters
    setAlarmStarted: (state: MainAlarmState) => ({
      ...state,
      active: false,
      timeout: 0,
    }),

    setActive: (state: MainAlarmState, action: SetActiveAction) => ({
      ...state,
      active: action.payload,
      timeout: action.payload ? 2 : 2147487643,
      timerActive: action.payload,
    }),
    setAlarm: (state: MainAlarmState, action: SetAlarmAction) => ({
      ...state,
      active: action.payload,
      timeout: action.payload ? 2 : null,
    }),
  },
});

export const {
  setActive,
  setAlarm,
  setAlarmStarted,
} = mainAlarmSlice.actions;

export default mainAlarmSlice.reducer;
