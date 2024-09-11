import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
  Container,
} from 'reactstrap';
import { Store } from 'store';
import { getDirty } from 'store/aber/keys/slice';
import * as mainWindowActions from 'store/aber/mainWindow/thunks';
import { getPrompt } from 'store/aber/talker/selectors';
import { nextTurn } from 'store/aber/talker/thunks';

interface TalkerProps {
  name: string,
  children?: React.ReactNode,
}

const NewTalker = (props: TalkerProps) => {
  const {
    children,
    name,
  } = props;

  const dispatch = useDispatch<any>();

  const buffer = useSelector((store: Store) => (store.keys.buffer));
  const isDirty = useSelector(getDirty);
  const prompt = useSelector(getPrompt);

  const handleNextTurn = useCallback(() => {
    dispatch(mainWindowActions.beforeInput());
    dispatch(mainWindowActions.afterInput());
    dispatch(nextTurn);
  }, [
    dispatch,
  ]);

  return (
    <Card className="my-2">
      <CardHeader>
        <CardTitle>
          Talker: { name }
        </CardTitle>
      </CardHeader>

      <Container>
        {children}
      </Container>

      <CardFooter>
        <>
          {isDirty && (
            <div>
              <strong>{ prompt }</strong>
              {buffer}
            </div>
          )}

          <Button
            onClick={handleNextTurn}
          >
            Ok
          </Button>
        </>
      </CardFooter>
    </Card>    
  );
}

export default NewTalker;
