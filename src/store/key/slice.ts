import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { KeyStateInterface } from './interface';

const initialState: KeyStateInterface = {
  saved: {
    echo: true,
    icanon: true,
  },
  actual: {
    echo: true,
    icanon: true,
  },
  prompt: '',
  keyBuffer: '',
  isInput: false,
};

type SetBufferAction = PayloadAction<string>;
type SetPromptAction = PayloadAction<string>;

export type KeyAction = PayloadAction<void> | SetBufferAction | SetPromptAction;

export const keySlice = createSlice({
  name: 'key',
  initialState,
  reducers: {
    setFlags: (state: KeyStateInterface): KeyStateInterface => ({
      ...state,
      saved: {...state.actual},
      actual: {
        ...state.actual,
        echo: false,
        icanon: false,
      }
    }),
    resetKeys: (state: KeyStateInterface): KeyStateInterface => ({
      ...state,
      actual: {...state.saved},
    }),
    setPrompt: (state: KeyStateInterface, action: SetPromptAction): KeyStateInterface => ({
      ...state,
      prompt: action.payload,
      isInput: true,
    }),
    setBuffer: (state: KeyStateInterface, action: SetBufferAction): KeyStateInterface => ({
      ...state,
      keyBuffer: action.payload,
      isInput: false,
    }),
  },
});

export const {
  resetKeys,
  setBuffer,
  setFlags,
  setPrompt,
} = keySlice.actions;

export default keySlice.reducer;
