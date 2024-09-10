import { configureStore  } from '@reduxjs/toolkit';
import errorsReducer from './aber/errors/slice';
import eventsReducer from './aber/events/slice';
import keysReducer from './aber/keys/slice';
import loggerReducer from './aber/logger/slice';
import mainWindowReducer from './aber/mainWindow/slice';
import talkerReducer from './aber/talker/slice';
import mainReducer, { MainState } from './main/slice';
import roomsReducer, { RoomState } from './rooms/slice';
// import reducer from './reducers';
import tk, { TkState } from './tk/tkSlice';

export interface Store {
  rooms: RoomState,
  main: MainState,
  tk: TkState,
}

const store = configureStore({
  reducer: {
    rooms: roomsReducer,
    main: mainReducer,
    // tk,

    errors: errorsReducer,
    events: eventsReducer,
    keys: keysReducer,
    logger: loggerReducer,
    mainWindow: mainWindowReducer,
    talker: talkerReducer,
  },
});

export default store;
