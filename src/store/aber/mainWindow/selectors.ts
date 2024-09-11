import { Store } from '../..';

// Selectors
export const getCanExit = (state: Store) => !state.mainWindow.inFight;
export const getCanOnTimer = (state: Store) => state.mainWindow.active && !state.mainWindow.ignore;
export const getTimerIsOn = (state: Store) => !state.mainWindow.ignore;
export const getTitle = (state: Store) => state.mainWindow.title;
export const getUserId = (state: Store) => state.mainWindow.userId;
export const getNeedCreateCharacter = (state: Store) => !state.mainWindow.isSaved;
