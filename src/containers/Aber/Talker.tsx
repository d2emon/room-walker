import * as React from 'react';
import {
    Card,
    CardHeader,
    CardTitle,
    Container,
} from 'reactstrap';

interface Props {
    name: string,
}

interface State {
}

class Talker extends React.Component<Props, State> {
    render() {
        const {
            children,
            name,
        } = this.props;
        return (<Card>
            <CardHeader>
                <CardTitle>
                    Talker: { name }
                </CardTitle>
            </CardHeader>
            <Container>
                {children}
            </Container>
        </Card>);
    }
}

export default Talker;
