import { configureStore  } from '@reduxjs/toolkit';
import loggerReducer, { LoggerStateInterface } from 'modules/logger/store/slice';
import mudErrorReducer, { ErrorStateInterface } from 'modules/error/store/slice';
import eventsReducer from './aber/events/slice';
import keysReducer from './aber/keys/slice';
import mainWindowReducer from './aber/mainWindow/slice';
import talkerReducer from './aber/talker/slice';
import mainReducer, { MainState } from './main/slice';
import mainAlarmReducer, { MainAlarmState } from './main/alarm/slice';
import roomsReducer, { RoomState } from './rooms/slice';
// import reducer from './reducers';
// import tk, { TkState } from './tk/tkSlice';
import mainMudReducer from './mudMain/slice';
import { MainStateInterface } from './mudMain/interface';
import signalReducer from './signals/slice';
import { SignalStateInterface } from './signals/interface';

export interface Store {
  rooms: RoomState,
  main: MainState,
  mainAlarm: MainAlarmState,
  // tk: TkState,

  events: any,
  keys: any,
  mainWindow: any,
  talker: any,

  logger: LoggerStateInterface,
  mudErrors: ErrorStateInterface,

  mainMud: MainStateInterface,
  signals: SignalStateInterface,
}

const store = configureStore<Store>({
  reducer: {
    rooms: roomsReducer,
    main: mainReducer,
    mainAlarm: mainAlarmReducer,
    // tk,

    events: eventsReducer,
    keys: keysReducer,
    mainWindow: mainWindowReducer,
    talker: talkerReducer,

    logger: loggerReducer,
    mudErrors: mudErrorReducer,

    mainMud: mainMudReducer,
    signals: signalReducer,
  },
});

export default store;
