import * as React from 'react';
import {connect} from "react-redux";
import {
    Alert,
    Card,
    CardHeader, CardTitle,
    Container,
} from 'reactstrap';
import Keys from "./Keys";
import {Store} from '../../store/reducers';

interface StateProps {
    name: string,
}

interface DispatchProps {
}

interface MainWindowProps {
    children: React.ReactNode,
}

type Props = StateProps & DispatchProps & MainWindowProps;

interface State {
}

class MainWindow extends React.Component<Props, State> {
    render() {
        const {
            children,
            name,
        } = this.props;
        return (<Card>
            <CardHeader>
                Hello {name}
            </CardHeader>
            <Container>
                <Keys isSet={true}>
                    <CardTitle>
                        Hello {name}
                    </CardTitle>
                    {children}
                </Keys>
            </Container>
        </Card>);
    }
}

const mapStateToProps = (store: Store): StateProps => ({
    name: store.mainWindow.name,
});

const mapDispatchToProps: DispatchProps = {
};

export default connect<StateProps, DispatchProps, MainWindowProps, Store>(
    mapStateToProps,
    mapDispatchToProps,
)(MainWindow);
