import * as React from 'react';
import {
    Card, CardText,
} from 'reactstrap';
import {Message} from '../../services/logger';

export interface LoggerProps {
    messages?: Message[],
}

const Logger = (props: LoggerProps): React.ReactElement => <Card>
    { props.messages && <CardText>
        { props.messages.map((message, messageId) => <p key={messageId}>
            {message.message}
        </p>) }
    </CardText> }
</Card>;

export default Logger;
