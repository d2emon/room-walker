import * as React from 'react';
import {Action} from 'redux';
import {connect} from 'react-redux';
import {
    Button,
    Card, CardFooter,
    CardHeader,
    CardTitle,
    Container,
} from 'reactstrap';
import {Store} from '../../store/reducers';
import * as talkerActions from '../../store/aber/talker/thunks';

interface StateProps {
}

interface DispatchProps {
    beforeStart: (name: string) => talkerActions.TalkerThunkAction<Action>,
    nextTurn: (name: string) => talkerActions.TalkerThunkAction<Action>,
}

interface TalkerProps {
    name: string,
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

    componentDidMount(): void {
        this.props.beforeStart(this.props.name);
    }

    componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>, snapshot?: any): void {
        this.onNextTurn();
    }

    onNextTurn() {
        this.props.nextTurn(this.props.name);
    }

    render() {
        const {
            children,
            name,
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
                <Button
                    onClick={this.onNextTurn}
                >
                    Ok
                </Button>
            </CardFooter>
        </Card>);
    }
}

const mapStateToProps = (store: Store): StateProps => ({
});

const mapDispatchToProps: DispatchProps = {
    beforeStart: talkerActions.beforeStart,
    nextTurn: talkerActions.nextTurn,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Talker);
