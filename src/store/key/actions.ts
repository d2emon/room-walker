import { Dispatch } from '@reduxjs/toolkit';
import { KeyAction, setBuffer, setPrompt } from './slice';
import { bprintf, pbfr, setPrDue, setPrQcr } from '../aber2/external';
import { activate, deactivate } from 'store/signals/slice';

export const beforeKeyInput = (prompt: string) => async (dispatch: Dispatch<KeyAction>) => {
  dispatch(activate());
  dispatch(setPrompt(prompt));

  await bprintf(prompt);
  await pbfr();

  setPrDue(false);
}

export const keyInput = (keyInput: string) => async (dispatch: Dispatch<KeyAction>) => {
  dispatch(setBuffer(keyInput));
  dispatch(deactivate());
}

export const showReprint = () => async (
  dispatch: Dispatch<KeyAction>,
) => {
  setPrQcr(true);
  await pbfr();
}

export const afterReprint = () => async (
  dispatch: Dispatch<KeyAction>,
) => {
  setPrDue(false);
}
  