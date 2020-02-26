import rooms, {RoomState} from './rooms/reducer';
import main, {MainState} from './main/reducer';
import tk, {TkState} from './tk/reducer';

export interface Store {
    rooms: RoomState,
    main: MainState,
    tk: TkState,
}
export {
    rooms,
    main,
    tk,
};
