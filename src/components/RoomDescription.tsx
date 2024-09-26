import React, { useMemo } from 'react';
import {
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    CardText,
} from 'reactstrap';

interface RoomZoneProps {
  roomId: number;
  zone?: {
    name: string,
    startRoomId: number,
  };
};
  
const RoomZone = ({
  roomId,
  zone,
}: RoomZoneProps) => {
  if (!zone) return null;
  
  return <h5>{zone.name} ({zone.startRoomId - roomId})</h5>
};
  
interface RoomTextProps {
  description?: string;
  roomId: number;
};
    
const RoomText = ({
  description,
  roomId,
}: RoomTextProps) => {
  if (description) return <pre style={{backgroundColor: '#e9ecef'}}>{description}</pre>;

  return <h5>You are on channel {roomId}</h5>;
};
    
interface RoomDescriptionProps {
  dark?: boolean;
  description?: string;
  name: string;
  roomId: number;
  zone?: {
    name: string,
    startRoomId: number,
  };
};

const RoomDescription = ({
  dark,
  description,
  name,
  roomId,
  zone,
}: RoomDescriptionProps) => {
  const style: React.CSSProperties = useMemo(
    () => {
      const result: React.CSSProperties = {
        textAlign: 'justify',
      };
      if (dark) {
        result.backgroundColor = "#171310";
        result.color = '#e9ecef';
      }
      return result;
    },
    [
      dark,
    ],
  );

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
  return (<Card
    className="mb-2"
    style={style}
  >
    <CardHeader>
      <RoomZone
        roomId={roomId}
        zone={zone}
      />
    </CardHeader>
    <CardBody>
      <CardTitle>{name} ({roomId})</CardTitle>
      <CardText tag="div">
        <RoomText
          roomId={roomId}
          description={description}
        />
      </CardText>
    </CardBody>
  </Card>);
};

export default RoomDescription;
