import { RoomState } from './roomsSlice';

export const getRooms = (state: RoomState) => state.rooms.rooms;
export const getRoom = (state: RoomState) => state.rooms.room;
export const getStarters = () => [5, 183];
