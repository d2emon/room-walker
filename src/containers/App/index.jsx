import {
    Container,
    Row,
    Col, Card,
} from 'reactstrap';
// Components
import Header from 'components/Header';
// Containers
import Aber from '../Aber/Aber';
import MainStarter from '../Main/Starter';
import Starter from '../Starter';
import Compass from '../Compass';
import Room from '../Room';
// Styles
import './index.css';

const App = () => (
  <div className="App">
    <Header />
    <Container className="App-intro">
      <Card>
        <Aber />
      </Card>
      <Row>
        <Col><MainStarter /></Col>
      </Row>
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
