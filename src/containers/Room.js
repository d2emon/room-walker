import React, { Component } from 'react';
import { connect } from 'react-redux';

// import * as roomsActions from '../store/rooms/actions';
import * as roomsSelector from '../store/rooms/slice';

import RoomDescription from '../components/RoomDescription'

class Room extends Component {
    render() {
        const room = this.props.room || {};
        return <RoomDescription {...room} />;
    }
}

function mapStateToProps(state) {
    return {
        room: roomsSelector.getRoom(state)
    };
}

export default connect(mapStateToProps)(Room);
