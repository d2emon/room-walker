import * as React from 'react';
import {connect} from 'react-redux';
import {
    Alert,
    Card,
    Col,
    Row,
} from 'reactstrap';
import MainWindow from './MainWindow';
import Values from './Values';
import Controls from './Controls';
import Talker from './Talker';
import WelcomeModal from './modals/WelcomeModal';
import {Store} from '../../store/reducers';
import * as loggerActions from '../../store/logger/actions';

interface ErrorMessageProps {
    errorId?: number,
    message?: string,
}

const ErrorMessage = (props: ErrorMessageProps) => <Alert
    color={props.errorId ? 'danger' : 'success'}
>
    { props.errorId
        ? <strong>{props.errorId}:</strong>
        : null
    }
    { props.message }
</Alert>;

interface StateProps {
    errorId?: number,
    errorMessage?: string,
    stateName: string,
    userId: string,
}

interface DispatchProps {
    logReset: (message: string) => loggerActions.LoggerAction,
}

interface GameGoProps {
    arg0: string,
    name: string,
}

type Props = StateProps & DispatchProps & GameGoProps;

interface State {
    errorId?: number,
    errorMessage?: string,
    hasStarted: boolean,
}

class GameGo extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            errorId: undefined,
            errorMessage: undefined,
            hasStarted: false,
        };

        this.closeStartModal = this.closeStartModal.bind(this);

        this.start(props);
    }

    static getDerivedStateFromProps(props: Props, currentState: State): State {
        const {
            arg0,
            name,
            errorId,
        } = props;
        const noArgs = !arg0 || !name;
        const errorMessage = props.errorMessage
            || (noArgs && 'Args!')
            || undefined;
        return {
            ...currentState,
            errorId: (errorId !== undefined)
                ? errorId
                : (errorMessage
                    ? 0
                    : undefined
                ),
            errorMessage,
        };
    }

    start(props: Props) {
        const {
            userId,
            name,
            logReset,
        } = props;
        logReset(`GAME ENTRY: ${name}[${userId}]`);
        this.setState({
            hasStarted: false,
        })
    }

    componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>, snapshot?: any): void {
        if (
            (this.props.name !== prevProps.name)
            || (this.props.userId !== prevProps.userId)
        ) {
            this.start(this.props);
        }
    }

    closeStartModal() {
        this.setState({
            hasStarted: true,
        });
    }

    render() {
        const {
            stateName,
        } = this.props;
        const {
            hasStarted,
            errorId,
            errorMessage,
        } = this.state;
        return (<Card>
            <Controls />
            <Row>
                <Col xs={4}>
                    <Values />
                </Col>
                <Col>
                    <WelcomeModal
                        show={!hasStarted}
                        onClose={this.closeStartModal}
                    />
                    {(((errorId === undefined) && !errorMessage)
                        ? (<MainWindow>
                            <Talker name={stateName} />
                        </MainWindow>)
                        : <ErrorMessage
                            errorId={errorId}
                            message={errorMessage}
                        />
                    )}
                </Col>
            </Row>
        </Card>);
    }
}

const mapStateToProps = (store: Store): StateProps => ({
    errorMessage: store.mainWindow.errorMessage,
    stateName: store.mainWindow.name,
    userId: store.mainWindow.userId,
    errorId: store.mainWindow.errorId,
});

const mapDispatchToProps: DispatchProps = {
    logReset: loggerActions.logReset,
};


export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(GameGo);
