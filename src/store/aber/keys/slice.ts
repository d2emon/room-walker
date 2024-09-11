import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Store } from '../..';

export interface KeysState {
  isInInput: boolean,
  isDirty: boolean,
  buffer: string,
};

const initialState: KeysState = {
  isInInput: false,
  isDirty: false,
  buffer: '',
};

type SetCleanAction = PayloadAction<unknown>;
type SetInputModeAction = PayloadAction<unknown>;
type UnsetInputModeAction = PayloadAction<string>;
  
export type KeysAction = SetCleanAction | SetInputModeAction | UnsetInputModeAction;

export const keysSlice = createSlice({
  name: 'keys',
  initialState,
  reducers: {
    setClean: (state: KeysState) => {
      state.isDirty = false;
    },
    setInputMode: (state: KeysState) => {
      state.isInInput = true;
    },
    unsetInputMode: (state: KeysState, action: UnsetInputModeAction) => {
      state.isInInput = false;
      state.buffer = action.payload;
    },
  },
});

// Selectors
export const getDirty = (state: Store): boolean => state.keys.isInInput && state.keys.isDirty;

export const {
  setClean,
  setInputMode,
  unsetInputMode,
} = keysSlice.actions;

export default keysSlice.reducer;
