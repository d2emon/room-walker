import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Store } from '..';

export interface MainState {
  userId?: number,
  title: string,
  interrupt: boolean,
  // TODO: Remove fields
  name?: string,
  inFight?: boolean,
  prDue?: boolean,
  //
  isFullyInvisible?: boolean;
  isVisible?: boolean;
};

const initialState: MainState = {
  title: '',
  interrupt: false,
};

/*
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
*/

type SetStartedAction = PayloadAction<number>;
type SetTitleAction = PayloadAction<string>;
type SetInterruptAction = PayloadAction<boolean>;
type SetPrDueAction = PayloadAction<boolean>;
  
export type MainAction = SetStartedAction | SetTitleAction | SetInterruptAction | SetPrDueAction;

export const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    // Setters
    setStarted: (state: MainState, action: SetStartedAction) => ({
      ...state,
      userId: action.payload,
      title: '',
      timerActive: false,
      interrupt: false,
    }),
    setFinished: (state: MainState) => ({
      ...state,
      userId: undefined,
    }),

    // setProgname
    setTitle: (state: MainState, action: SetTitleAction) => ({
      ...state,
      title: action.payload,
    }),
    updateTitle: (state: MainState) => {
      if (state.isFullyInvisible) {
        return {
          ...state,
          title: '-csh',
        };
      }

      if (state.isVisible) {
        return {
          ...state,
          title: `   --}----- ROOM WALKER -----{--     Entered as ${state.name}`,
        };
      }
    
      return state;
    },

    setInterrupt: (state: MainState, action: SetInterruptAction) => ({
      ...state,
      interrupt: action.payload,
    }),

    // TODO: Remove actions
    setPrDue: (state: MainState, action: SetPrDueAction) => ({
      ...state,
      prDue: action.payload,
    }),
  },
});

// Selectors
export const getStarted = (state: Store) => !!state.main.userId;

export const {
  setFinished,
  setInterrupt,
  setPrDue,
  setStarted,
  setTitle,
  updateTitle,
} = mainSlice.actions;

export default mainSlice.reducer;
