import React, { Component } from 'react';
import {
    Container,
    Row,
    Col,
} from 'reactstrap';
// Components
import Header from '../../components/Header';
// Containers
import Starter from '../Starter';
import Compass from '../Compass';
import Room from '../Room';
// Styles
import './index.css';

class App extends Component {
    render() {
        return (
            <div className="App">
                <Header />
                <Container className="App-intro">
                    <Row>
                        <Col xs="2"><Starter /></Col>
                        <Col><Room /></Col>
                    </Row>
                    <Row>
                        <Col><Compass /></Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default App;
