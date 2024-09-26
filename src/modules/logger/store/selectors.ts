import { Store } from 'store';

export const getMessages = (state: Store) => state.logger.messages;
