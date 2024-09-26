import React, { Component } from 'react';
import {
  Card,
  Col,
  Container,
  Row,
} from 'reactstrap';
// Components
import Header from 'components/Header';
// Containers
import Aber from 'containers/Aber';
// import MainStarter from '../Main/Starter';
import Starter from 'containers/Starter';
import Compass from 'containers/Compass';
import Room from 'containers/Room';
// Styles
import './index.css';

const App = () => (
  <div className="App">
    <Header />

        { /*
        <Container>
          <MainStarter />
        </Container>
          */ }

    <Container className="App-intro">
      <Card>
        <Aber />
      </Card>

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

export default App;
