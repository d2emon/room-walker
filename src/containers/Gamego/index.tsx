import React, { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { getHasStarted, getName } from 'store/mudMain/selectors';

interface GameGoWrapperPropsInterface {
  children?: ReactNode;
}

const GameGoWrapper = ({ children }: GameGoWrapperPropsInterface) => {
  return (
    <div>
      <p>Entering Game ....</p>
      {children}
    </div>
  );    
};

const Gamego = () => {
  const hasStarted = useSelector(getHasStarted);
  const name = useSelector(getName);

  if (!hasStarted) {
    return <GameGoWrapper />;
  }

  // tty = 0;

  return (
    <GameGoWrapper>
      <p>Hello {name}</p>
    </GameGoWrapper>
  );
};

export default Gamego;
