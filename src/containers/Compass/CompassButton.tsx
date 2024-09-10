import * as React from 'react';
import { connect } from 'react-redux';
import {
    Button,
} from 'reactstrap';
import { Store } from '../../store';
import * as roomsActions from "../../store/rooms/actions";

// interface State {}
interface OwnProps {
    exit: number,
    children?: React.ReactNode,
}
class StateProps {}
interface DispatchProps {
    getRoom: (roomId: number) => any,
}
type Props = OwnProps & StateProps & DispatchProps;

function CompassButton(props: Props) {
    const {
        children,
        exit,
        getRoom,
    } = props;
    return (
        <Button
            color="primary"
            title={`${exit}`}
            disabled={!exit}
            onClick={() => getRoom(exit)}
            block
        >
            {children}
        </Button>
    );
}

const mapStateToProps = (): StateProps => ({});
// const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>, ownProps: OwnProps): DispatchProps
const mapDispatchToProps: DispatchProps = {
    getRoom: roomsActions.getRoom
};
export default connect<StateProps, DispatchProps, OwnProps, Store>(
    mapStateToProps,
    mapDispatchToProps,
)(CompassButton);
