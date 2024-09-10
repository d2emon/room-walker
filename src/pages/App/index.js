import React, { Component } from 'react';
import {
    Container,
    Row,
    Col,
} from 'reactstrap';
// Components
import Header from '../../components/Header';
// Containers
import MainStarter from '../../containers/Main/Starter';
import Starter from '../../containers/Starter';
import Compass from '../../containers/Compass';
import Room from '../../containers/Room';
// Styles
import './index.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />

        <Container>
          <MainStarter />
        </Container>

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
