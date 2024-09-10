import { configureStore } from '@reduxjs/toolkit';
import main, { MainState } from './main/mainSlice';
import rooms, { RoomState } from './rooms/roomsSlice';
import tk, { TkState } from './tk/tkSlice';

export interface Store {
  rooms: RoomState,
  main: MainState,
  tk: TkState,
}

export const store = configureStore({
  reducer: {
    main,
    rooms,
    tk,
  },
});
