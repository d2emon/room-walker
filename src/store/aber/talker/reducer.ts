import * as types from './actionTypes';
import {TalkerAction} from './actions';
import {setTitle} from "../mainWindow/actions";

export const MODE_0 = 'MODE_0';
export const MODE_1 = 'MODE_1';

type Mode = typeof MODE_0 | typeof MODE_1;

export const CONVERSATION_MODE_ACTION = 'CONVERSATION_MODE_ACTION';
export const CONVERSATION_MODE_SAY = 'CONVERSATION_MODE_SAY';
export const CONVERSATION_MODE_TSS = 'CONVERSATION_MODE_TSS';

type ConversationMode = typeof CONVERSATION_MODE_ACTION
    | typeof CONVERSATION_MODE_SAY
    | typeof CONVERSATION_MODE_TSS;

export interface TalkerState {
    inSetup: boolean,
    eventId?: number,
    channelId: number,
    name: string,
    mode: Mode,
    conversationMode: ConversationMode,
    forceEvents: boolean,

    // Other
    debugMode: boolean,
    isWizard: boolean,
    isVisible: boolean,
    isFullyInvisible: boolean,
    keyBuff: string,
}

const InitialState: TalkerState = {
    inSetup: false,
    eventId: undefined,
    channelId: 0,
    name: '',
    mode: MODE_0,
    conversationMode: CONVERSATION_MODE_ACTION,
    forceEvents: false,

    debugMode: false,
    isWizard: false,
    isVisible: false,
    isFullyInvisible: false,
    keyBuff: '',
};

export default (state: TalkerState = InitialState, action: TalkerAction): TalkerState => {
    switch (action.type) {
        case types.RESET_EVENTS:
            return {
                ...state,
                eventId: undefined,
            };
        case types.SET_EVENT_ID:
            return {
                ...state,
                eventId: action.eventId,
            };
        case types.SET_NAME:
            return {
                ...state,
                name: action.name,
            };
        case types.SET_IN_SETUP:
            return {
                ...state,
                inSetup: true,
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
