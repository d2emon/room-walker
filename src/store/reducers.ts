import rooms, {RoomState} from './rooms/reducer';
import main, {MainState} from './main/reducer';

export interface Store {
    rooms: RoomState,
    main: MainState,
}
export {
    rooms,
    main,
};
