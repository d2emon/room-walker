import React from 'react';
import { useSelector } from 'react-redux';
import {
    Card,
    CardHeader,
    Container,
} from 'reactstrap';
import { getName } from 'store/aber/talker/selectors';
import Keys from './Keys';
import Talker from './Talker';

const MainWindow = () => {
  const name = useSelector(getName);

  return (
    <Card>
      <CardHeader>
        Hello, {name}
      </CardHeader>

      <Container className="my-2">
        { /* keysetup(); */ }
        <Keys isSet={true}>
          { /* talker(globme); */ }
          <Talker name={name} />
        </Keys>
      </Container>
    </Card>
  );
}

export default MainWindow;
