import { Dispatch } from '@reduxjs/toolkit';
import { KeyAction, setBuffer, setPrompt } from './slice';
import { bprintf, pbfr, setNeedReprint } from '../aber2/external';
import { activate, deactivate } from 'store/signals/slice';

export const beforeKeyInput = (prompt: string) => async (dispatch: Dispatch<KeyAction>) => {
  dispatch(activate());
  dispatch(setPrompt(prompt));

  await bprintf(prompt);
  await pbfr();

  setNeedReprint(false);
}

export const keyInput = (keyInput: string) => async (dispatch: Dispatch<KeyAction>) => {
  dispatch(setBuffer(keyInput));
  dispatch(deactivate());
}

export const showReprint = () => async (
  dispatch: Dispatch<KeyAction>,
) => {
  await pbfr(true);
}

export const afterReprint = () => async (
  dispatch: Dispatch<KeyAction>,
) => {
  setNeedReprint(false);
}
  