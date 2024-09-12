import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MainStateInterface } from './interface';

const initialState: MainStateInterface = {
  arg0: '',
  name: 'Phantom',

  hasStarted: false,
};

interface SetNamePayload {
  argId: number;
  value: string;
};

type SetNameAction = PayloadAction<SetNamePayload>;
  
export type MainAction = SetNameAction;

export const mainMudSlice = createSlice({
  name: 'mainMud',
  initialState,
  reducers: {
    setName: (state: MainStateInterface, action: SetNameAction): MainStateInterface => ({
      ...state,
      arg0: action.payload.argId === 0 ? action.payload.value : state.arg0,
      name: action.payload.argId === 1 ? action.payload.value : state.name,
    }),
    startGame: (state: MainStateInterface): MainStateInterface => ({
      ...state,
      hasStarted: true,
    }),
    finishGame: (state: MainStateInterface): MainStateInterface => ({
      ...state,
      hasStarted: false,
    }),
  },
});

export const {
  setName,
  startGame,
} = mainMudSlice.actions;

export default mainMudSlice.reducer;
