import * as React from 'react';
import {
    Card,
} from 'reactstrap';

export interface LoggerProps {
    messages: string[],
}

export interface LoggerState {
}

class Logger extends React.Component<LoggerProps, LoggerState> {
    render(): React.ReactElement {
        const {
            messages,
        } = this.props;
        return <Card>
            { messages.map((message, messageId) => <p key={messageId}>
                {message}
            </p>) }
        </Card>;
    }
}

export default Logger;
