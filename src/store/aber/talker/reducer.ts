import * as types from './actionTypes';
import {TalkerAction} from './actions';
import {
    ActionMode,
    ConversationMode,
    MODE_SPECIAL,
    CONVERSATION_MODE_ACTION,
    CONVERSATION_MODE_SAY,
    CONVERSATION_MODE_TSS,
} from './modes';

export interface TalkerState {
    title?: string,
    loggedIn: boolean,
    channelId: number,
    name: string,
    actionMode: ActionMode,
    conversationMode: ConversationMode,
    characterId: number,

    // Other
    debugMode: boolean,
    isWizard: boolean,
    isVisible: boolean,
    isFullyInvisible: boolean,
    keyBuff: string,
    enemyId?: number,
    fightingCounter?: number,
}

const InitialState: TalkerState = {
    title: undefined,
    loggedIn: false,
    channelId: 0,
    name: '',
    actionMode: MODE_SPECIAL,
    conversationMode: CONVERSATION_MODE_ACTION,
    characterId: 0,

    debugMode: false,
    isWizard: false,
    isVisible: false,
    isFullyInvisible: false,
    keyBuff: '',
    enemyId: undefined,
    fightingCounter: undefined,
};

export default (state: TalkerState = InitialState, action: TalkerAction): TalkerState => {
    switch (action.type) {
        case types.SET_USER:
            return {
                ...state,
                title: action.title || state.title,
                characterId: action.characterId,
                name: action.name,
            };
        case types.UPDATE_TITLE:
            return {
                ...state,
                title: getTitle(state),
            };
        case types.SET_IN_SETUP:
            return {
                ...state,
                loggedIn: true,
            };
        case types.SET_MODE:
            return {
                ...state,
                actionMode: action.actionMode,
            };
        case types.SET_LOGGED_IN:
            return {
                ...state,
                loggedIn: true,
            };
        case types.SET_LOGGED_OUT:
            return {
                ...state,
                loggedIn: false,
            };
        default:
            return state;
    }
};

// Selectors
export const getTitle = (state: TalkerState): string | undefined => {
    if (state.isFullyInvisible) {
        return '-csh';
    } else if (state.isVisible) {
        return `   --}----- ROOM WALKER -----{--     Entered as ${state.name}`;
    } else {
        return undefined;
    }
};
export const getPrompt = (state: TalkerState): string => {
    const prompt = [];
    if (state.debugMode) {
        prompt.push('#');
    }
    if (state.isWizard) {
        prompt.push('----');
    }

    if (state.conversationMode === CONVERSATION_MODE_ACTION) {
        prompt.push('>');
    } else if (state.conversationMode === CONVERSATION_MODE_SAY) {
        prompt.push('"');
    } else if (state.conversationMode === CONVERSATION_MODE_TSS) {
        prompt.push('*');
    } else {
        prompt.push('?');
    }

    return state.isVisible
        ? prompt.join('')
        : `(${prompt.join('')})`;
    };
