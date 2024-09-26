import { Store } from '..';

export const getStarted = (state: Store) => !!state.main.userId;
export const getName = (state: Store) => state.main.name;
export const getAlarm = (state: Store) => state.mainAlarm.active && state.mainAlarm.timerActive;
export const getTimeout = (state: Store) => state.mainAlarm.timeout;
export const getError = (state: Store) => !!state.main.error;
export const getErrorMessage = (state: Store) => state.main.error && state.main.error.message;
