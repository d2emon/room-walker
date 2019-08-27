import React, { Component } from 'react';
import {
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    CardText,
} from 'reactstrap';

class RoomDescription extends Component {
    zone() {
        if (!this.props.zone) return false;

        return <h5>{this.props.zone.name} ({this.props.zone.startRoomId - this.props.roomId})</h5>
    }

    description() {
        if (this.props.description) return <pre style={{backgroundColor: '#e9ecef'}}>{this.props.description}</pre>;
        return <h5>You are on channel {this.props.roomId}</h5>;
    }

    render() {
        console.log(this.props);
        let style = {
            textAlign: 'justify'
        };
        if (this.props.dark) {
            style.backgroundColor = "#171310";
            style.color = '#e9ecef';
        }

        /*
        return (<Jumbotron className="my-2" style={style}>
            <h1>{this.props.name} ({this.props.roomId})</h1>
            {this.zone()}
            {this.description()}
            <Card>
                <CardHeader>{this.zone()}</CardHeader>
                <CardBody>
                    <CardTitle>{this.props.name} ({this.props.roomId})</CardTitle>
                    <CardText>{this.description()}</CardText>
                </CardBody>
            </Card>
        </Jumbotron>);
        */
        return (<Card className="mb-2" style={style}>
            <CardHeader>{this.zone()}</CardHeader>
            <CardBody>
                <CardTitle>{this.props.name} ({this.props.roomId})</CardTitle>
                <CardText tag="div">{this.description()}</CardText>
            </CardBody>
        </Card>);
    }
}

export default RoomDescription;
