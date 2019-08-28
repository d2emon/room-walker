import rooms, {RoomState} from './rooms/reducer';

export interface Store {
    rooms: RoomState;
}
export {
    rooms,
};
