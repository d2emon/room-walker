import * as React from 'react';
import {connect} from 'react-redux';
import {
    Button,
    Card,
    CardFooter,
    CardText,
    Container,
    Modal,
    Nav,
    Navbar,
} from 'reactstrap';
import {Store} from "../../store/reducers";
import * as mainWindowActions from "../../store/mainWindow/actions";
import {Action} from "redux";

interface StateProps {
    // errorId?: number,
    // prDue: boolean,
    // keysAreSet: boolean,
}

interface DispatchProps {
    onError: () => mainWindowActions.MainWindowThunkAction<Action>,
    onExit: () => mainWindowActions.MainWindowThunkAction<Action>,
}

interface ControlsProps {
    inFight?: boolean,
}

type Props = StateProps & DispatchProps & ControlsProps;

interface State {
    isExiting: boolean,
}

class Controls extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            isExiting: false,
        };

        this.closeExitModal = this.closeExitModal.bind(this);
        this.onError = this.onError.bind(this);
        this.onExit = this.onExit.bind(this);
    }

    closeExitModal() {
        this.setState({
            isExiting: false,
        });
    }

    onError() {
        this.props.onError();
    }

    onExit() {
        this.setState({
            isExiting: true,
        });
        if (this.props.inFight) {
            return;
        }
        this.props.onExit();
    }

    showExitModal() {
        const {
            isExiting,
        } = this.state;
        return <Modal
            isOpen={isExiting}
        >
            <Card>
                <Container>
                    <CardText>^C</CardText>
                    <CardFooter>
                        <Button
                            onClick={this.closeExitModal}
                        >
                            Ok
                        </Button>
                    </CardFooter>
                </Container>
            </Card>
        </Modal>;
    }

    render() {
        return <Navbar>
            { this.showExitModal() }
            <Nav>
                <Button onClick={this.onError}>SIGHUP</Button>
                <Button onClick={this.onExit}>SIGINT</Button>
                <Button onClick={this.onExit}>SIGTERM</Button>
                <Button>SIGTSTP</Button>
                <Button>SIGQUIT</Button>
                <Button onClick={this.onError}>SIGCONT</Button>
            </Nav>
        </Navbar>;
    }
}

const mapStateToProps = (store: Store): StateProps => ({
    // errorId: store.gameGo.errorId,
    // keysAreSet: store.gameGo.keysAreSet,
    // prDue: store.gameGo.prDue,
});

const mapDispatchToProps: DispatchProps = {
    onError: mainWindowActions.onError,
    onExit: mainWindowActions.onExit,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Controls);
