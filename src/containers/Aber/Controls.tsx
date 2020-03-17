import * as React from 'react';
import {Action} from 'redux';
import {connect} from 'react-redux';
import {
    Button,
    Nav,
    Navbar,
} from 'reactstrap';
import GoodByeModal from './modals/GoodByeModal';
import {Store} from '../../store/reducers';
import * as mainWindowActions from '../../store/aber/mainWindow/thunks';
import * as mainWindowSelector from '../../store/aber/mainWindow/reducer';

interface StateProps {
    canExit: boolean,
    timerIsOn: boolean,
}

interface DispatchProps {
    onError: () => mainWindowActions.MainWindowThunkAction<Action>,
    onExit: () => mainWindowActions.MainWindowThunkAction<Action>,
    onTimer: () => mainWindowActions.MainWindowThunkAction<Action>,
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
        this.onTimer = this.onTimer.bind(this);
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

    onTimer() {
        this.props.onTimer();
    }

    render() {
        const {
            isExiting,
        } = this.state;
        const {
            canExit,
            timerIsOn,
        } = this.props;
        return <Navbar>
            <GoodByeModal
                show={isExiting}
                onClose={this.onCloseExitModal}
            />
            <Nav>
                <Button
                    onClick={this.onError}
                >
                    SIGHUP
                </Button>
                <Button
                    onClick={this.onExit}
                    disabled={!canExit}
                >
                    SIGINT
                </Button>
                <Button
                    onClick={this.onExit}
                    disabled={!canExit}
                >
                    SIGTERM
                </Button>
                <Button
                    disabled={true}
                >
                    SIGTSTP
                </Button>
                <Button
                    disabled={true}
                >
                    SIGQUIT
                </Button>
                <Button
                    onClick={this.onError}
                >
                    SIGCONT
                </Button>
                <Button
                    onClick={this.onTimer}
                    disabled={!timerIsOn}
                >
                    SIGALRT
                </Button>
                <Button
                    onClick={this.onExit}
                >
                    Exit
                </Button>
                <Button
                    onClick={this.onTimer}
                >
                    Alert
                </Button>
            </Nav>
        </Navbar>;
    }
}

const mapStateToProps = (store: Store): StateProps => ({
    canExit: mainWindowSelector.canExit(store.mainWindow),
    timerIsOn: mainWindowSelector.timerIsOn(store.mainWindow),
});

const mapDispatchToProps: DispatchProps = {
    onError: mainWindowActions.onError,
    onExit: mainWindowActions.onExit,
    onTimer: mainWindowActions.onTimer,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Controls);
