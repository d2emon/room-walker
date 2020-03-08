import * as React from 'react';
import {connect} from "react-redux";
import {
    Alert,
    Card,
    CardHeader,
    Container,
} from 'reactstrap';
import Keys from "./Keys";
import {Store} from '../../store/reducers';

interface StateProps {
    name: string,
    userId: string,
}

interface DispatchProps {
}

interface MainWindowProps {
    windowId: number,
    children: React.ReactNode,
}

type Props = StateProps & DispatchProps & MainWindowProps;

interface State {
}

class MainWindow extends React.Component<Props, State> {
    render() {
        const {
            children,
            windowId,
            name,
            userId,
        } = this.props;
        return (<Card>
            <CardHeader>
                TTY: {windowId}
            </CardHeader>
            {(windowId === 4) && <Container>
                initbbc();
                initscr();
                topscr();
            </Container>}
            <Alert>Hello {name}</Alert>
            <Container>
                <Keys isSet={true}>
                    {children}
                </Keys>
            </Container>
        </Card>);
    }
}

const mapStateToProps = (store: Store): StateProps => ({
    name: store.mainWindow.name,
    userId: store.mainWindow.userId,
});

const mapDispatchToProps: DispatchProps = {
};

export default connect<StateProps, DispatchProps, MainWindowProps, Store>(
    mapStateToProps,
    mapDispatchToProps,
)(MainWindow);
