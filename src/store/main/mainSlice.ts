import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {Alarm} from '../../types';

interface SetFinishedPayload {
  code: number,
  message: string,
}

interface SetTitlePayload {
  title: string,
}

interface SetInterruptPayload {
  interrupt: boolean,
}

// TODO: Remove interfaces
interface SetPrDuePayload {
  prDue: boolean,
}

export type SetFinishedAction = PayloadAction<SetFinishedPayload>;
export type SetTitleAction = PayloadAction<SetTitlePayload>;
export type SetInterruptAction = PayloadAction<SetInterruptPayload>;
export type SetPrDueAction = PayloadAction<SetPrDuePayload>;

export type MainAction = SetFinishedAction | SetTitleAction
  | SetInterruptAction | SetPrDueAction;

export interface MainState {
  userId?: number,
  title: string,
  error: {
      code: number,
      message: string,
  } | null,
  interrupt: boolean,
  // TODO: Remove fields
  name?: string,
  inFight?: boolean,
  prDue?: boolean,
}

const initialState: MainState = {
  title: '',
  error: null,
  interrupt: false,
};

export const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    setFinished: (state: MainState, action: SetFinishedAction) => ({
      ...state,
      error: {
        code: action.payload.code,
        message: action.payload.message,
      },
      userId: undefined,
    }),
    // setProgname
    setTitle: (state: MainState, action: SetTitleAction) => ({
      ...state,
      title: action.payload.title,
    }),
    setInterrupt: (state: MainState, action: SetInterruptAction) => ({
      ...state,
      interrupt: action.payload.interrupt,
    }),
    // TODO: Remove actions
    setName: (state: MainState, action) => ({
      ...state,
      name: action.payload.name,
    }),
    setPrDue: (state: MainState, action) => ({
      ...state,
      prDue: action.payload.prDue,
    }),
  },
});

export const { setFinished, setInterrupt, setName, setPrDue, setTitle } = mainSlice.actions;

export default mainSlice.reducer;
