import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
    ListGroup,
    ListGroupItem,
} from 'reactstrap';

import * as roomsActions from "../store/rooms/actions";
import * as roomsSelector from "../store/rooms/reducer";
// import * as roomsSelector from "../store/rooms/reducer";

class Starter extends Component {
    goToRoom = (roomId) => () => {
        this.props.dispatch(roomsActions.getRoom(roomId));
    };

    render() {
        return (<ListGroup>
            {this.props.starters.map((item, id) => <ListGroupItem
                tag="button"
                key={id}
                action
                onClick={this.goToRoom(item).bind(this)}
                active={this.props.room && this.props.room.roomId === item}
            >
                {item}
            </ListGroupItem>)}
        </ListGroup>);
    }
}

function mapStateToProps(state) {
    return {
        starters: [5, 185], // roomsSelector.getRoom(state)
        room: roomsSelector.getRoom(state)
    };
}

export default connect(mapStateToProps)(Starter);
