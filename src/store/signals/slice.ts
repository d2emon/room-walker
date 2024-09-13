import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SignalStateInterface } from './interface';

const initialState: SignalStateInterface = {
  isActive: false,
  isEnabled: false,
};

export type SignalAction = PayloadAction<undefined>;

export const signalSlice = createSlice({
  name: 'signal',
  initialState,
  reducers: {
    activate: (state: SignalStateInterface): SignalStateInterface => ({
      ...state,
      isActive: true,
      isEnabled: true,
      // alarm: 2,
    }),
    deactivate: (state: SignalStateInterface): SignalStateInterface => ({
      ...state,
      isActive: false,
      isEnabled: false,
      // alarm: 2147487643,
    }),
    pause: (state: SignalStateInterface): SignalStateInterface => ({
      ...state,
      isEnabled: false,
    }),
    resume: (state: SignalStateInterface): SignalStateInterface => ({
      ...state,
      isEnabled: true,
      // alarm: state.sigActive ? 2 : state.alarm,
    }),
  },
});

export const {
  activate,
  deactivate,
  pause,
  resume,
} = signalSlice.actions;

export default signalSlice.reducer;
