import * as React from 'react';
import {connect} from "react-redux";
import {
    Button,
    Card,
    Container,
    Input,
} from 'reactstrap';
import GameGo from './GameGo';
import Logger from "./Logger";
import {Store} from '../../store/reducers';
import * as mainWindowActions from "../../store/mainWindow/actions";

interface StateProps {
    messages: string[],
}

interface DispatchProps {
    startGame: (userId: string, title: string, name: string) => mainWindowActions.MainWindowAction,
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
}

class Aber extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            userId: 'User Id',
            arg0: 'Arg0',
            name: 'Name',
        };
        this.onChangeUserId = this.onChangeUserId.bind(this);
        this.onChangeArg0 = this.onChangeArg0.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onReset = this.onReset.bind(this);
    }

    componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>, snapshot?: any): void {
        this.onReset();
    }

    onChangeUserId(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            userId: e.currentTarget.value,
        });
    }

    onChangeArg0(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            arg0: e.currentTarget.value,
        })
    }

    onChangeName(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            name: e.currentTarget.value,
        })
    }

    onReset() {
        const {
            userId,
            arg0,
            name,
        } = this.state;
        this.props.startGame(userId, arg0, name);
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
    startGame: mainWindowActions.startGame,
};

export default connect<StateProps, DispatchProps, GameGoProps, Store>(
    mapStateToProps,
    mapDispatchToProps,
)(Aber);
