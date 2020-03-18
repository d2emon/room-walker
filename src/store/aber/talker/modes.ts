export const MODE_SPECIAL = 'MODE_SPECIAL';
export const MODE_ACTION = 'MODE_ACTION';

export type ActionMode = typeof MODE_SPECIAL | typeof MODE_ACTION;

export const CONVERSATION_MODE_ACTION = 'CONVERSATION_MODE_ACTION';
export const CONVERSATION_MODE_SAY = 'CONVERSATION_MODE_SAY';
export const CONVERSATION_MODE_TSS = 'CONVERSATION_MODE_TSS';

export type ConversationMode = typeof CONVERSATION_MODE_ACTION
    | typeof CONVERSATION_MODE_SAY
    | typeof CONVERSATION_MODE_TSS;
