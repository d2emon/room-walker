import { Store } from 'store';

export const getArgsCount = (store: Store): number => {
  const hasArg0 = !!store.mainMud.arg0 ? 1 : 0;
  const hasArg1 = !!store.mainMud.name ? 1 : 0;
  return hasArg0 + hasArg1;
};
export const getName = (store: Store): string => (store.mainMud.name === 'Phantom')
  ? `The ${store.mainMud.name}`
  : store.mainMud.name;
export const getHasStarted = (store: Store): boolean => store.mainMud.hasStarted;
