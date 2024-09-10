import { RoomState } from './rooms/roomsSlice';
import { MainState } from './main/mainSlice';
import { TkState } from './tk/tkSlice';

export interface Store {
    rooms: RoomState,
    main: MainState,
    tk: TkState,
}
