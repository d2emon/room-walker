import { configureStore  } from '@reduxjs/toolkit';
import errorsReducer from './aber/errors/slice';
import eventsReducer from './aber/events/slice';
import keysReducer from './aber/keys/slice';
import loggerReducer from '../modules/logger/store/slice';
import mainWindowReducer from './aber/mainWindow/slice';
import talkerReducer from './aber/talker/slice';
import mainReducer, { MainState } from './main/slice';
import mainAlarmReducer, { MainAlarmState } from './main/alarm/slice';
import roomsReducer, { RoomState } from './rooms/slice';
// import reducer from './reducers';
// import tk, { TkState } from './tk/tkSlice';
import mudErrorReducer from './error/slice';
import { ErrorStateInterface } from './error/interface';
import mainMudReducer from './mudMain/slice';
import { MainStateInterface } from './mudMain/interface';
import signalReducer from './signals/slice';
import { SignalStateInterface } from './signals/interface';

export interface Store {
  rooms: RoomState,
  main: MainState,
  mainAlarm: MainAlarmState,
  // tk: TkState,
  //
  errors: any,
  events: any,
  keys: any,
  logger: any,
  mainWindow: any,
  talker: any,

  mudErrors: ErrorStateInterface,
  mainMud: MainStateInterface,
  signals: SignalStateInterface,
}

const store = configureStore({
  reducer: {
    rooms: roomsReducer,
    main: mainReducer,
    mainAlarm: mainAlarmReducer,
    // tk,

    errors: errorsReducer,
    events: eventsReducer,
    keys: keysReducer,
    logger: loggerReducer,
    mainWindow: mainWindowReducer,
    talker: talkerReducer,

    mudError: mudErrorReducer,
    mainMud: mainMudReducer,
    signals: signalReducer,
  },
});

export default store;
