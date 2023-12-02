import * as React from 'react';
import {connect} from 'react-redux';
import {
    Container,
    Row,
    Col,
    Button,
} from 'reactstrap';
import {Store} from '../../store/reducers';
import * as actions from "../../store/main/actions";
import * as selector from '../../store/main/slice';
import StartArgs from './StartArgs';

// interface State {}
interface OwnProps {}
interface StateProps {
    started: boolean,
    name?: string,
    alarm: boolean,
    timeout: number | null,
    error: boolean,
    errorMessage: string | null,
}
interface DispatchProps {
    start: (userId: number, name: string) => any,
    wait: () => any,
    onError: () => any,
    onQuit: () => any,
}
type Props = OwnProps & StateProps & DispatchProps;

interface State {
    starting: boolean,
    userId: number,
}

class Starter extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            starting: false,
            userId: 1,
        };

        this.handleStart = this.handleStart.bind(this);
        this.handleWait = this.handleWait.bind(this);
        this.handleError = this.handleError.bind(this);
        this.handleQuit = this.handleQuit.bind(this);
    }

    componentDidUpdate(): void {
        console.log(this.props.error, this.state.starting);
        if (this.props.error && this.state.starting) {
            this.setState({starting: false});
        }
    }

    handleStart(name: string) {
        const {start} = this.props;
        const {userId} = this.state;
        this.setState({starting: true});
        start(userId, name);
    }

    handleWait() {
        const {wait} = this.props;
        wait();
    }

    handleError() {
        const {onError} = this.props;
        onError();
    }

    handleQuit() {
        const {onQuit} = this.props;
        onQuit();
    }

    render()  {
        const {
            started,
            name,
            alarm,
            timeout,
            error,
            errorMessage,
        } = this.props;
        const {
            starting,
        } = this.state;
        return (
            <Container>
                {!starting && <Row>
                    <StartArgs
                        onSubmit={this.handleStart}
                    />
                </Row>}
                {starting && <Row>
                    <Col xs="8">
                        <p>Entering Game ....</p>
                        {started && <p>Hello {name}</p>}
                    </Col>
                    {started && <Col xs="4">
                        <Container>
                            <Row>
                                <Col>
                                    <Button
                                        disabled={!alarm}
                                        onClick={this.handleWait}
                                    >
                                        Wait ({timeout})
                                    </Button>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Button
                                        onClick={this.handleError}
                                    >
                                        Error
                                    </Button>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Button
                                        onClick={this.handleQuit}
                                    >
                                        Quit
                                    </Button>
                                </Col>
                            </Row>
                        </Container>
                    </Col>}
                </Row>}
                {error && errorMessage && <Row>
                    <Col xs="12">
                        <hr />
                        {errorMessage}
                        <hr />
                    </Col>
                </Row>}
            </Container>
        );
    }
}

const mapStateToProps = (states: Store): StateProps => ({
    started: selector.getStarted(states),
    name: states.main.name,
    alarm: states.main.alarm.active && states.main.timerActive,
    timeout: states.main.alarm.timeout,
    error: !!states.main.error,
    errorMessage: states.main.error && states.main.error.message,
});

const mapDispatchToProps: DispatchProps = {
    start: actions.start,
    wait: actions.wait,
    onError: actions.onError,
    onQuit: actions.onQuit,
};

export default connect<StateProps, DispatchProps, OwnProps, Store>(
    mapStateToProps,
    mapDispatchToProps,
)(Starter);
