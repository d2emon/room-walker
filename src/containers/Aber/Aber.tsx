import * as React from 'react';
import {Action} from 'redux';
import {connect} from 'react-redux';
import {
    Button,
    Card,
    Container,
    Input,
} from 'reactstrap';
import GameGo from './GameGo';
import Logger from './Logger';
import {Message} from '../../services/logger';
import {Store} from '../../store/reducers';
import * as mainWindowActions from '../../store/aber/mainWindow/thunks';
import * as loggerActions from '../../store/aber/logger/thunks';

interface StateProps {
    messages: Message[],
}

interface DispatchProps {
    onStart: (userId: string, title: string, name: string) => mainWindowActions.MainWindowThunkAction<Action>,
    fetchMessages: () => loggerActions.LoggerThunkAction<Action>,
}

interface GameGoProps {
    userId: string,
    arg0: string,
    name: string,
}

type Props = StateProps & DispatchProps & GameGoProps;

interface State {
    userId: string,
    arg0: string,
    name: string,
    started: boolean,
}

class Aber extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            userId: 'User Id',
            arg0: 'Arg0',
            name: 'Name',
            started: false,
        };
        this.onChangeUserId = this.onChangeUserId.bind(this);
        this.onChangeArg0 = this.onChangeArg0.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onReset = this.onReset.bind(this);
    }

    componentDidMount(): void {
        this.onReset();
    }

    componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>, snapshot?: any): void {
        if (!this.state.started) {
            this.onReset();
        }
    }

    onChangeUserId(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            userId: e.currentTarget.value,
            started: false,
        });
    }

    onChangeArg0(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            arg0: e.currentTarget.value,
            started: false,
        })
    }

    onChangeName(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            name: e.currentTarget.value,
            started: false,
        })
    }

    onReset() {
        const {
            userId,
            arg0,
            name,
        } = this.state;
        this.props.onStart(userId, arg0, name);
        this.props.fetchMessages();
        this.setState({
            started: true,
        });
    }

    render() {
        const {
            messages,
        } = this.props;
        const {
            userId,
            arg0,
            name,
        } = this.state;
        return (<Card>
            <Container>
                <Button onClick={this.onReset}>Reset</Button>
            </Container>
            <Container>
                <Input
                    value={userId}
                    onChange={this.onChangeUserId}
                />
                <Input
                    value={arg0}
                    onChange={this.onChangeArg0}
                />
                <Input
                    value={name}
                    onChange={this.onChangeName}
                />
                <GameGo
                    arg0={arg0}
                    name={name}
                />
                <Logger
                    messages={messages}
                />
            </Container>
        </Card>);
    }
}

const mapStateToProps = (store: Store): StateProps => ({
    messages: store.logger.messages,
});

const mapDispatchToProps: DispatchProps = {
    onStart: mainWindowActions.onStart,
    fetchMessages: loggerActions.getMessages,
};

export default connect<StateProps, DispatchProps, GameGoProps, Store>(
    mapStateToProps,
    mapDispatchToProps,
)(Aber);
