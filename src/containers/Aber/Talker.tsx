import * as React from 'react';
import {
    Card,
    CardHeader,
    CardTitle,
    Container,
} from 'reactstrap';
import {connect} from "react-redux";
import {Store} from "../../store/reducers";
import * as talkerActions from "../../store/aber/talker/actions";

interface StateProps {
}

interface DispatchProps {
    resetEvents: () => talkerActions.TalkerAction,
}

interface TalkerProps {
    name: string,
}

type Props = StateProps & DispatchProps & TalkerProps;

interface State {
}

class Talker extends React.Component<Props, State> {
    nextTurn() {
        const {
            name,
        } = this.props;
        // pbfr();
        // sendmsg(name);
        // if (rd_qd) {
        //     rte(name);
        //     rd_qd = 0;
        // }
        // closeworld();
        // pbfr();
    }

    componentDidMount(): void {
        // makebfr()
        this.props.resetEvents();
        // putmeon(name)

        // openworld() || sendErrorMessage('Sorry AberMUD is currently unavailable')
        // mynum < maxu || sendErrorMessage('Sorry AberMUD is full at the moment')
        // globme = name
        // rte(name)
        // closeworld()

        this.props.resetEvents();
        // special('.g', name);
        // iSetup = true;
    }

    componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>, snapshot?: any): void {
        this.nextTurn();
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
        </Card>);
    }
}

const mapStateToProps = (store: Store): StateProps => ({
});

const mapDispatchToProps: DispatchProps = {
    resetEvents: talkerActions.resetEvents,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Talker);
