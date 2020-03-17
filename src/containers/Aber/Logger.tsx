import * as React from 'react';
import {
    Card, CardText,
} from 'reactstrap';

export interface LoggerProps {
    messages?: string[],
}

const Logger = (props: LoggerProps): React.ReactElement => <Card>
    { props.messages && <CardText>
        { props.messages.map((message, messageId) => <p key={messageId}>
            {message}
        </p>) }
    </CardText> }
</Card>;

export default Logger;
