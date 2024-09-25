import { Store } from 'store';
import { KeyFlags } from './interface';
// import { getPrDue } from '../aber2/external';

export const getSaved = (store: Store): KeyFlags => store.keys.saved;
export const getNeedReprint = (store: Store): boolean => !store.keys.isInput; // && getPrDue();
export const getReprint = (store: Store): string => `\n${store.keys.prompt}${store.keys.keyBuffer}`;

