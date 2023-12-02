import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Store } from 'store/reducers';
import { Message } from '../../../services/logger';

export interface ErrorsState {
  errorId?: number,
  errorMessage?: string,
};

const initialState: ErrorsState = {
};

type SetErrorMessageAction = PayloadAction<string>;
type SetErrorAction = PayloadAction<undefined>;
export type ErrorsAction = SetErrorMessageAction | SetErrorAction;

export const errorsSlice = createSlice({
  name: 'errors',
  initialState,
  reducers: {
    setErrorMessage: (state: ErrorsState, action: SetErrorMessageAction) => {
      /**
       * pbfr();
       */
      state.errorId = 0;
      state.errorMessage = action.payload;
    },
    setError: (state: ErrorsState) => {
      state.errorId = 255;
    },
   },
});

export const {
  setErrorMessage,
  setError,
} = errorsSlice.actions;

export default errorsSlice.reducer;
