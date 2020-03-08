import * as React from 'react';
import {
    Card, CardHeader,
    Container,
} from 'reactstrap';

interface Props {
    isSet: boolean,
    children: React.ReactNode,
}

interface State {
}

class Keys extends React.Component<Props, State> {
    render() {
        const {
            children,
            isSet
        } = this.props;
        return (<Card>
            <CardHeader>
                Keys: { isSet ? 'On' : 'Off' }
            </CardHeader>
            <Container>
                {children}
            </Container>
        </Card>);
    }
}

export default Keys;
