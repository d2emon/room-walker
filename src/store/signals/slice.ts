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
    }),
    deactivate: (state: SignalStateInterface): SignalStateInterface => ({
      ...state,
      isActive: false,
      isEnabled: false,
    }),
    pause: (state: SignalStateInterface): SignalStateInterface => ({
      ...state,
      isEnabled: false,
    }),
    resume: (state: SignalStateInterface): SignalStateInterface => ({
      ...state,
      isEnabled: true,
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
