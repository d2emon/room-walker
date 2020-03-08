import mainWindow, {MainWindowState} from './mainWindow/reducer';
import logger, {LoggerState} from './logger/reducer';
import rooms, {RoomState} from './rooms/reducer';
import main, {MainState} from './main/reducer';
import tk, {TkState} from './tk/reducer';

export interface Store {
    mainWindow: MainWindowState,
    logger: LoggerState,
    rooms: RoomState,
    main: MainState,
    tk: TkState,
}
export {
    mainWindow,
    logger,
    rooms,
    main,
    tk,
};
