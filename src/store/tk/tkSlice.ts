import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface SetPlayerPayload {
  playerId: number,
  name: string,
}

interface SetNamePayload {
  name: string,
}

interface SetMessageIdPayload {
  messageId: number,
}

interface SetLocationIdPayload {
  locationId: number,
}

interface SetISetupPayload {
  iSetup: boolean,
}

interface SetModePayload {
  mode: number,
}

export type SetPlayerAction = PayloadAction<SetPlayerPayload>;
export type SetNameAction = PayloadAction<SetNamePayload>;
export type SetMessageIdAction = PayloadAction<SetMessageIdPayload>;
export type SetLocationIdAction = PayloadAction<SetLocationIdPayload>;
export type SetISetupAction = PayloadAction<SetISetupPayload>;
export type SetModeAction = PayloadAction<SetModePayload>;
export type SetUpdateAction = PayloadAction<void>;

export type TkAction = SetPlayerAction | SetNameAction | SetMessageIdAction
  | SetLocationIdAction | SetISetupAction | SetModeAction | SetUpdateAction;

export interface TkState {
  iSetup: number | boolean,

  messageId: number, // cms
  locationId: number, // curch
  name?: string, // globme
  mode: number, // curmode

  convflg: number,

  rdQd: number

  playerId: number, // mynum
  updated: number, // lasup

  // TODO: Remove fields
  ailBlind: boolean,
  brmode: boolean,
  debugMode: boolean,
  maxu: number,
  myLev: number,
  mySex: number,
  myStr: number,
  zapped: boolean,
}

const initialState: TkState = {
  convflg: 0,
  iSetup: 0,
  locationId: 0,
  messageId: -1,
  mode: 0,
  playerId: 0,
  rdQd: 0,
  updated: 0,

  // TODO: Remove fields
  ailBlind: false,
  brmode: false,
  debugMode: false,
  maxu: 16,
  myLev: 0,
  mySex: 0,
  myStr: 0,
  zapped: true,
};

export const tkSlice = createSlice({
  name: 'tk',
  initialState,
  reducers: {
    setPlayer: (state: TkState, action: SetPlayerAction) => ({
      ...state,
      playerId: action.payload.playerId,
      name: action.payload.name,
      messageId: -1,
    }),
    setName: (state: TkState, action: SetPlayerAction) => ({
      ...state, 
      name: action.payload.name,
    }),
    setMessageId: (state: TkState, action: SetMessageIdAction) => ({
      ...state, 
      messageId: action.payload.messageId,
    }),
    setLocationId: (state: TkState, action: SetLocationIdAction) => ({
      ...state, 
      locationId: action.payload.locationId,
    }),
    setISetup: (state: TkState, action: SetISetupAction) => ({
      ...state, 
      iSetup: action.payload.iSetup,
    }),
    setMode: (state: TkState, action: SetModeAction) => ({
      ...state, 
      mode: action.payload.mode,
    }),
    setUpdate: (state: TkState) => ({
      ...state, 
      messageId: state.messageId,
    }),
  },
});

export const { setISetup, setLocationId, setMessageId, setMode, setName, setPlayer, setUpdate } = tkSlice.actions;

export default tkSlice.reducer;
