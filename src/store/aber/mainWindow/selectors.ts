import { Store } from '../..';

// Selectors
export const getCanExit = (state: Store) => !state.mainWindow.inFight;
export const getTitle = (state: Store) => state.mainWindow.title;
export const getUserId = (state: Store) => state.mainWindow.userId;
export const getNeedCreateCharacter = (state: Store) => !state.mainWindow.isSaved;
