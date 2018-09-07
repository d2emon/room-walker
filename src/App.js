import React, { Component } from 'react';
import {
    Container,
    Row,
    Col,
} from 'reactstrap';

import Header from './components/Header';

import Starter from './containers/Starter';
import Compass from './containers/Compass';
import Room from './containers/Room';

import './App.css';

class App extends Component {
    render() {
        return (<div className="App">
            <Header />
            <Container className="App-intro">
                <Row>
                    <Col xs="2">
                        <Starter />
                    </Col>
                    <Col>
                        <Room />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Compass />
                    </Col>
                </Row>
              </Container>
        </div>);
    }
}

export default App;
