import * as React from 'react';
import {Action} from 'redux';
import {connect} from 'react-redux';
import {
    Button,
    Card,
    CardFooter,
    CardHeader,
    CardTitle,
    Container,
} from 'reactstrap';
import {Store} from '../../store/reducers';
import { getDirty } from 'store/aber/keys/slice';
import { getPrompt } from 'store/aber/talker/slice';
import * as mainWindowActions from 'store/aber/mainWindow/thunks';
import * as talkerActions from 'store/aber/talker/thunks';

interface StateProps {
    prompt: string,
    buffer: string,
    isDirty: boolean,
}

interface DispatchProps {
    beforeInput: () => mainWindowActions.MainWindowThunkAction<Action>,
    afterInput: () => mainWindowActions.MainWindowThunkAction<Action>,
    nextTurn: (name: string) => talkerActions.TalkerThunkAction<Action>,
}

interface TalkerProps {
    name: string,
    children?: React.ReactNode,
}

type Props = StateProps & DispatchProps & TalkerProps;

interface State {
}

class Talker extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {};

        this.onNextTurn = this.onNextTurn.bind(this);
    }

    componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>, snapshot?: any): void {
        this.onNextTurn();
    }

    onNextTurn() {
        this.props.beforeInput();
        this.props.afterInput();
        this.props.nextTurn(this.props.name);
    }

    render() {
        const {
            children,
            name,
            // isDirty,
            // prompt,
            // buffer,
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
            <CardFooter>
                <>
                    { /* 
                    {isDirty } { prompt } { buffer } [80]
                    */ }
                    <Button
                        onClick={this.onNextTurn}
                    >
                        Ok
                    </Button>
                </>
            </CardFooter>
        </Card>);
    }
}

const mapStateToProps = (store: Store): StateProps => ({
    prompt: getPrompt(store),
    buffer: store.keys.buffer,
    isDirty: getDirty(store),
});

const mapDispatchToProps: DispatchProps = {
    beforeInput: mainWindowActions.beforeInput,
    afterInput: mainWindowActions.afterInput,
    nextTurn: talkerActions.nextTurn,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Talker);
