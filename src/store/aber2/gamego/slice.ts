import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface GamegoState {
  alarm: number;
  SIGHUP: string;
  SIGINT: string;
  SIGTERM: string;
  SIGTSTP: string;
  SIGQUIT: string;
  SIGCONT: string;
  SIGALRM: string;

  interrupt: boolean;
  sigActive: boolean;
};

const initialState: GamegoState = {
  alarm: 0,
  SIGHUP: '',
  SIGINT: '',
  SIGTERM: '',
  SIGTSTP: '',
  SIGQUIT: '',
  SIGCONT: '',
  SIGALRM: '',
  
  interrupt: false,
  sigActive: false,
};

type SetAction = PayloadAction<undefined>;
type SetInterruptAction = PayloadAction<boolean>;
  
export type GamegoAction = SetAction | SetInterruptAction;

export const gamegoSlice = createSlice({
  name: 'gamego',
  initialState,
  reducers: {
    setInterrupt: (state: GamegoState, action: SetInterruptAction): GamegoState => ({
      ...state,
      interrupt: action.payload,
    }),
    sigAlOn: (state: GamegoState): GamegoState => ({
      ...state,
      sigActive: true,
      SIGALRM: 'sigOccur',
      alarm: 2,
    }),
    sigAlOff: (state: GamegoState): GamegoState => ({
      ...state,
      sigActive: false,
      SIGALRM: '',
      alarm: 2147487643,
    }),
    blockAlarm: (state: GamegoState): GamegoState => ({
      ...state,
      SIGALRM: '',
    }),
    unblockAlarm: (state: GamegoState): GamegoState => ({
      ...state,
      SIGALRM: 'sigOccur',
      alarm: state.sigActive ? 2 : state.alarm,
    }),
  },
});

// Selectors
// export const getDirty = (state: Store): boolean => state.keys.isInInput && state.keys.isDirty;

export const {
  blockAlarm,
  setInterrupt,
  sigAlOff,
  sigAlOn,
  unblockAlarm,
} = gamegoSlice.actions;

export default gamegoSlice.reducer;
