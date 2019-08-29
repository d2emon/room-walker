import * as React from 'react';
import {
    Button,
    Col,
    Container,
    Input,
    Row,
} from 'reactstrap';

interface Props {
    disabled?: boolean,
    name?: string,
    onSubmit?: (name: string) => any,
}
interface State {
    name: string,
}

class StartArgs extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            name: props.name || '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({name: event.target.value});
    }

    handleSubmit() {
        const {onSubmit} = this.props;
        const {name} = this.state;
        if (onSubmit) onSubmit(name);
    }

    render() {
        const {
            disabled = false,
        } = this.props;
        const {name} = this.state;
        return (
            <Container>
                <Row>
                    <Col xs="8">
                        <Input
                            placeholder="Name"
                            value={name}
                            disabled={disabled}
                            onChange={this.handleChange}
                        />
                    </Col>
                    <Col xs="4">
                        <Button
                            disabled={disabled || !name}
                            onClick={this.handleSubmit}
                        >
                            Start
                        </Button>
                    </Col>
                </Row>

            </Container>
        );
    }
}

export default StartArgs;
