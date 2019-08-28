import * as React from 'react';
import { connect } from 'react-redux';
import {
    Button,
} from 'reactstrap';
import * as roomsActions from "../../store/rooms/actions";

export interface CompassButtonProps {
    exit: number,
    children?: React.ReactNode,
    // Dispatch
    getRoom: (roomId: number) => any,
}

function CompassButton(props: CompassButtonProps) {
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

const mapStateToProps = () => ({});
const mapDispatchToProps = {
    getRoom: roomsActions.getRoom
};
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(CompassButton);
