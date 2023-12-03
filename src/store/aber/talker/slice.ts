import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  ConversationMode,
  CONVERSATION_MODE_ACTION,
} from './modes';

export interface TalkerState {
  title?: string,
  loggedIn: boolean,
  channelId: number,
  name: string,
  conversationMode: ConversationMode,
  characterId: number,

  // Server
  // actionMode: ActionMode,
  // Other
  debugMode: boolean,
  isWizard: boolean,
  isVisible: boolean,
  isFullyInvisible: boolean,
  keyBuff: string,
  enemyId?: number,
  fightingCounter?: number,
  zapped: boolean,
};

const initialState: TalkerState = {
  title: undefined,
  loggedIn: false,
  channelId: 0,
  name: '',
  conversationMode: CONVERSATION_MODE_ACTION,
  characterId: 0,

  // Server
  // actionMode: MODE_SPECIAL,
  // Other
  debugMode: false,
  isWizard: false,
  isVisible: false,
  isFullyInvisible: false,
  keyBuff: '',
  enemyId: undefined,
  fightingCounter: undefined,
  zapped: false,
};

interface SetUserPayload {
  characterId: number;
  name: string;
  channelId: number;
  title?: string;
}
type SetUserAction = PayloadAction<SetUserPayload>;
type UpdateTitleAction = PayloadAction<undefined>;
type SetLoggedInAction = PayloadAction<undefined>;
type SetLoggedOutAction = PayloadAction<undefined>;
type SetConversationModeAction = PayloadAction<ConversationMode>;
  
export type MainWindowAction = SetUserPayload | UpdateTitleAction | SetLoggedInAction | SetLoggedOutAction | SetConversationModeAction;

const getTitle = (state: TalkerState): string | undefined => {
  if (state.isFullyInvisible) {
    return '-csh';
  } else if (state.isVisible) {
    return `   --}----- ROOM WALKER -----{--     Entered as ${state.name}`;
  } else {
    return undefined;
  }
};
    
export const talkerSlice = createSlice({
  name: 'talker',
  initialState,
  reducers: {
    setUser: (state: TalkerState, action: SetUserAction) => {
      state.title = action.payload.title || state.title;
      state.channelId = action.payload.channelId;
      state.characterId = action.payload.characterId;
      state.name = action.payload.name;
    },
    updateTitle: (state: TalkerState) => {
      state.title = getTitle(state);
    },
    setLoggedIn: (state: TalkerState) => {
      state.loggedIn = true;
    },
    setLoggedOut: (state: TalkerState) => {
      state.loggedIn = false;
    },
    setConversationMode: (state: TalkerState, action: SetConversationModeAction) => {
      state.conversationMode = action.payload;
    },
  },
});

export const {
  setConversationMode,
  setLoggedIn,
  setLoggedOut,
  setUser,
  updateTitle,
} = talkerSlice.actions;

export default talkerSlice.reducer;
