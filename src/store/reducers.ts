import rooms, {RoomState} from './rooms/reducer';
import main, {MainState} from './main/reducer';
import tk, {TkState} from './tk/reducer';

import errors, {ErrorsState} from './aber/errors/reducer';
import logger, {LoggerState} from './aber/logger/reducer';
import mainWindow, {MainWindowState} from './aber/mainWindow/reducer';

export interface Store {
    rooms: RoomState,
    main: MainState,
    tk: TkState,

    errors: ErrorsState,
    logger: LoggerState,
    mainWindow: MainWindowState,
}
export {
    rooms,
    main,
    tk,

    errors,
    logger,
    mainWindow,
};
