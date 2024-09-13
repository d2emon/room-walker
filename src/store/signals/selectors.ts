import { Store } from 'store';

export const getIsActive = (store: Store): boolean => store.signals.isActive && store.signals.isEnabled;
