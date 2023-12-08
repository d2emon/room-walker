import rooms, {RoomState} from './rooms/reducer';
import main, {MainState} from './main/reducer';
import tk, {TkState} from './tk/reducer';

import errors, {ErrorsState} from './aber/errors/reducer';
import events, {EventsState} from './aber/events/reducer';
import keys, {KeysState} from './aber/keys/reducer';
import logger, {LoggerState} from './aber/logger/reducer';
import { MainWindowState } from './aber/mainWindow/slice';
import { TalkerState } from './aber/talker/slice';

export interface Store {
    rooms: RoomState,
    main: MainState,
    tk: TkState,

    errors: ErrorsState,
    events: EventsState,
    keys: KeysState,
    logger: LoggerState,
    mainWindow: MainWindowState,
    talker: TalkerState,
}
/*
export {
    rooms,
    main,
    tk,

    errors,
    events,
    keys,
    logger,
    mainWindow,
    talker,
};
*/
