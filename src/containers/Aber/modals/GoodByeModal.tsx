import * as React from 'react';
import {
    Button,
    Card,
    CardFooter,
    CardHeader,
    CardText,
    CardTitle,
    Container,
    Modal,
} from 'reactstrap';

interface GoodByeModalProps {
    show: boolean,
    onClose: () => void,
}

const GoodByeModal = (props: GoodByeModalProps): React.ReactElement => {
    const {
        show,
        onClose,
    } = props;
    return <Modal
        isOpen={show}
    >
        <Card>
            <CardHeader>
                <CardTitle>Exiting</CardTitle>
            </CardHeader>
            <Container>
                <CardText>^C</CardText>
            </Container>
            <CardFooter>
                <Button
                    onClick={onClose}
                >
                    Ok
                </Button>
            </CardFooter>
        </Card>
    </Modal>;
};

export default GoodByeModal;
