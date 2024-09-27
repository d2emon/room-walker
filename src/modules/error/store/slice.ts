import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ErrorStateInterface {
  code?: number;
  message?: string;
};
  
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
    resetErrors: (state: ErrorStateInterface): ErrorStateInterface => ({
      ...state,
      code: undefined,
      message: undefined,
    }),
    setError: (state: ErrorStateInterface, action: SetErrorAction): ErrorStateInterface => ({
      ...state,
      // pbfr();
      // pr_due=0; // So we dont get a prompt after the exit
      // keysetback();
      code: action.payload.code,
      message: action.payload.message,
    }),
  },
});

export const {
  resetErrors,
  setError,
} = mudErrorSlice.actions;

export default mudErrorSlice.reducer;
