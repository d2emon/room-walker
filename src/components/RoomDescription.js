import React, { Component } from 'react';
import {
    Jumbotron
} from 'reactstrap';

class RoomDescription extends Component {
    zone() {
        if (!this.props.zone) return false;

        return <h5>{this.props.zone.name} ({this.props.roomId - this.props.zone.startRoomId})</h5>
    }

    description() {
        if (this.props.description) return <pre>{this.props.description}</pre>;
        return <h5>You are on channel {this.props.roomId}</h5>;
    }

    render() {
        return (<Jumbotron className="my-2" style={{textAlign: "justify"}}>
            <h1>{this.props.name} ({this.props.roomId})</h1>
            {this.zone()}
            {this.description()}
        </Jumbotron>);
    }
}

export default RoomDescription;
