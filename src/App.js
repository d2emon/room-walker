import React, { Component } from 'react';
import {
    Container,
    Row,
    Col,
    ListGroup,
    ListGroupItem,
    Button,
    Jumbotron
} from 'reactstrap';

import logo from './logo.svg';
import './App.css';

class Header extends Component {
    render() {
        return (<header className="App-header mb-2">
            <h1 className="App-title"><img src={logo} className="App-logo" alt="logo" /> Welcome to React</h1>
        </header>);
    }

}

class Starter extends Component {
    render() {
        const starters = [5, 185]
        return (<ListGroup>
            {starters.map(item => <ListGroupItem tag="button" action>{item}</ListGroupItem>)}
        </ListGroup>);
    }
}

class Compass extends Component {
    render() {
        return (<Container>
            <Row>
                <Col xs="3" className="p-0">&nbsp;</Col>
                <Col xs="3" className="p-0"><Button color="primary" block>North</Button></Col>
                <Col xs="3" className="p-0">&nbsp;</Col>
                <Col xs="3" className="p-0"><Button color="primary" block>Up</Button></Col>
            </Row>
            <Row>
                <Col xs="3" className="p-0"><Button color="primary" block>West</Button></Col>
                <Col xs="3" className="p-0">&nbsp;</Col>
                <Col xs="3" className="p-0"><Button color="primary" block>East</Button></Col>
                <Col xs="3" className="p-0">&nbsp;</Col>
            </Row>
            <Row>
                <Col xs="3" className="p-0">&nbsp;</Col>
                <Col xs="3" className="p-0"><Button color="primary" block>South</Button></Col>
                <Col xs="3" className="p-0">&nbsp;</Col>
                <Col xs="3" className="p-0"><Button color="primary" block>Down</Button></Col>
            </Row>
        </Container>);
    }
}

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
                        <Compass />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Jumbotron className="my-2" style={{textAlign: "justify"}}>
                            To get started, edit <code>src/App.js</code> and save to reload.
                        </Jumbotron>
                    </Col>
                </Row>
              </Container>
        </div>);
    }
}

export default App;
