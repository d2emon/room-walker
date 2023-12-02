import { Store } from 'store/reducers';

 export const getName = (store: Store): string => (store.talker.name);
  