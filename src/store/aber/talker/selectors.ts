import { Store } from '../..';
import {
  CONVERSATION_MODE_ACTION,
  CONVERSATION_MODE_SAY,
  CONVERSATION_MODE_TSS,
} from './modes';

export const getName = (store: Store): string => (store.talker.name);

export const getPrompt = (state: Store): string => {
  const prompt = [];
  if (state.talker.debugMode) {
    prompt.push('#');
  }
  if (state.talker.isWizard) {
    prompt.push('----');
  }
  
  if (state.talker.conversationMode === CONVERSATION_MODE_ACTION) {
    prompt.push('>');
  } else if (state.talker.conversationMode === CONVERSATION_MODE_SAY) {
    prompt.push('"');
  } else if (state.talker.conversationMode === CONVERSATION_MODE_TSS) {
    prompt.push('*');
  } else {
    prompt.push('?');
  }
  
    return state.talker.isVisible ? prompt.join('') : `(${prompt.join('')})`;
};
