import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    ListGroup,
    ListGroupItem,
} from 'reactstrap';

import * as roomsActions from "../store/rooms/actions";
import * as roomsSelector from "../store/rooms/reducer";

class Starter extends Component {
    constructor(props) {
        super(props);
        this.goToRoom = this.goToRoom.bind(this);
    };

    goToRoom(roomId) {
        return () => this.props.dispatch(roomsActions.getRoom(roomId));
    }

    render() {
        const {
            room,
            starters,
        } = this.props;
        return (
            <ListGroup>
                {starters.map((item, id) => (
                    <ListGroupItem
                        tag="button"
                        key={id}
                        action
                        onClick={this.goToRoom(item)}
                        active={room && room.roomId === item}
                    >
                        {item}
                    </ListGroupItem>
                ))}
            </ListGroup>
        );
    }
}

function mapStateToProps(state) {
    return {
        starters: roomsSelector.getStarters(state),
        room: roomsSelector.getRoom(state)
    };
}

export default connect(mapStateToProps)(Starter);
