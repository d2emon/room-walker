import React from 'react';
import { useSelector } from 'react-redux';

// import * as roomsActions from '../store/rooms/actions';
import * as roomsSelector from '../store/rooms/selectors';

import RoomDescription from '../components/RoomDescription'

const Room = () => {
  const room = useSelector(roomsSelector.getRoom) || {};

  console.log(room);
  return <RoomDescription {...room} />;
};

export default Room;
