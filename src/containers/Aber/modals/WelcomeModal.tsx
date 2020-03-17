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

interface WelcomeModalProps {
    show: boolean,
    onClose: () => void,
}

const WelcomeModal = (props: WelcomeModalProps): React.ReactElement => {
    const {
        show,
        onClose,
    } = props;
    return <Modal
        isOpen={show}
    >
        <Card>
            <CardHeader>
                <CardTitle>Room Walker</CardTitle>
            </CardHeader>
            <Container>
                <CardText>Entering....</CardText>
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

export default WelcomeModal;
