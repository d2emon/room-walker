import {Action} from 'redux';
import * as types from './actionTypes';
import {ActionMode, ConversationMode} from './modes';

// Interfaces
interface SetUser extends Action {
    type: types.SET_USER,
    characterId: number,
    name: string,
    channelId: number,
    title?: string,
}

interface UpdateTitle extends Action {
    type: types.UPDATE_TITLE,
}

interface SetLoggedIn extends Action {
    type: types.SET_LOGGED_IN,
}

interface SetLoggedOut extends Action {
    type: types.SET_LOGGED_OUT,
}

interface SetConversationMode extends Action {
    type: types.SET_CONVERSATION_MODE,
    conversationMode: ConversationMode,
}

// Types
export type TalkerAction = SetUser | UpdateTitle | SetLoggedIn | SetLoggedOut | SetConversationMode;

export const setUser = (characterId: number, name: string, channelId: number, title: string): SetUser => ({
    type: types.SET_USER,
    characterId,
    name,
    channelId,
    title,
});

export const updateTitle = (): UpdateTitle => ({
    type: types.UPDATE_TITLE,
});

export const setLoggedIn = (): SetLoggedIn => ({
    type: types.SET_LOGGED_IN,
});

export const setLoggedOut = (): SetLoggedOut => ({
    type: types.SET_LOGGED_OUT,
});

export const setConversationMode = (conversationMode: ConversationMode): SetConversationMode => ({
    type: types.SET_CONVERSATION_MODE,
    conversationMode,
});
