import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ErrorsState {
  errorId?: number,
  errorMessage?: string,
};

const initialState: ErrorsState = {
};

interface ErrorPayload {
  errorId?: number,
  message?: string,
};type SetErrorMessageAction = PayloadAction<ErrorPayload>;
type SetErrorAction = PayloadAction<undefined>;
export type ErrorsAction = SetErrorMessageAction | SetErrorAction;

export const errorsSlice = createSlice({
  name: 'errors',
  initialState,
  reducers: {
    resetErrors: (state: ErrorsState) => {
      state.errorId = undefined;
      state.errorMessage = undefined;
    },
    setErrorMessage: (state: ErrorsState, action: SetErrorMessageAction) => {
      // pbfr();
      // pr_due=0; // So we dont get a prompt after the exit
      // keysetback();
      state.errorId = action.payload.errorId;
      state.errorMessage = action.payload.message;
    },
   },
});

export const {
  resetErrors,
  setErrorMessage,
} = errorsSlice.actions;

export default errorsSlice.reducer;
