import * as React from 'react';
import {Action} from 'redux';
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
import GoodByeModal from './modals/GoodByeModal';
import {Store} from '../../store/reducers';
import * as mainWindowActions from '../../store/mainWindow/actions';

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
    canExit: boolean,
    isExiting: boolean,
}

class Controls extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            canExit: true,
            isExiting: false,
        };

        this.onCloseExitModal = this.onCloseExitModal.bind(this);
        this.onError = this.onError.bind(this);
        this.onExit = this.onExit.bind(this);
    }

    static getDerivedStateFromProps(props: Props, currentState: State): State {
        const {
            inFight,
        } = props;
        return {
            ...currentState,
            canExit: !inFight,
        };
    }

    onCloseExitModal() {
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
        if (!this.state.canExit) {
            return;
        }
        this.props.onExit();
    }

    render() {
        const {
            isExiting,
        } = this.state;
        return <Navbar>
            <GoodByeModal
                show={isExiting}
                onClose={this.onCloseExitModal}
            />
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
