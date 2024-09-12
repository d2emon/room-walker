import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ErrorStateInterface } from './interface';

const initialState: ErrorStateInterface = {
};

interface SetErrorPayload {
  code?: number;
  message?: string;
};

type SetErrorAction = PayloadAction<SetErrorPayload>;
  
export type ErrorAction = SetErrorAction;

export const mudErrorSlice = createSlice({
  name: 'mudError',
  initialState,
  reducers: {
    setError: (state: ErrorStateInterface, action: SetErrorAction): ErrorStateInterface => ({
      ...state,
      code: action.payload.code,
      message: action.payload.message,
    }),
  },
});

export const {
  setError,
} = mudErrorSlice.actions;

export default mudErrorSlice.reducer;
