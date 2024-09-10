import { MainState } from './mainSlice';

export const getStarted = (state: MainState) => !!state.userId;
