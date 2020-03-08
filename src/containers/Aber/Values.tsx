import * as React from 'react';
import {connect} from 'react-redux';
import {
    Card,
    Col,
    Container,
    Row,
} from 'reactstrap';
import {Store} from '../../store/reducers';

interface StateProps {
    active: boolean,
    alarm: number,
    ignore: boolean,
    prDue: boolean,
}

interface DispatchProps {
}

interface SignalsProps {
}

type Props = StateProps & DispatchProps & SignalsProps;

interface State {
}

class Values extends React.Component<Props, State> {
    render() {
        const {
            active,
            alarm,
            ignore,
            prDue,
        } = this.props;
        return (<Card>
            <Container>
                <Row>
                    <Col>Active:</Col>
                    <Col>{active ? 'TRUE' : 'FALSE'}</Col>
                </Row>
                <Row>
                    <Col>Alarm:</Col>
                    <Col>{alarm}</Col>
                </Row>
                <Row>
                    <Col>Ignore:</Col>
                    <Col>{ignore ? 'TRUE' : 'FALSE'}</Col>
                </Row>
                <Row>
                    <Col>Pr Due:</Col>
                    <Col>{prDue ? 'TRUE' : 'FALSE'}</Col>
                </Row>
            </Container>
        </Card>);
    }
}

const mapStateToProps = (store: Store): StateProps => ({
    active: store.mainWindow.active,
    alarm: store.mainWindow.alarm,
    ignore: store.mainWindow.ignore,
    prDue: store.mainWindow.prDue,
});

const mapDispatchToProps: DispatchProps = {
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Values);
