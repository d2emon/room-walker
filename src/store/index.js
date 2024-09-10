import { configureStore } from '@reduxjs/toolkit';
import main from './main/mainSlice';
import rooms from './rooms/roomsSlice';
import tk from './tk/tkSlice';

export const store = configureStore({
  reducer: {
    main,
    rooms,
    tk,
  },
});
