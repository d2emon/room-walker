import React, { ReactElement, useMemo } from 'react';
import { useSelector } from 'react-redux';
import {
  getErrorId,
  getErrorMessage,
} from 'store/aber/errors/selectors';
import ErrorMessage from './ErrorMessage';

interface WithErrorProps {
  children?: ReactElement;
}

const WithError = (props: WithErrorProps) => {
  const {
    children,
  } = props;

  const errorId = useSelector(getErrorId);
  const errorMessage = useSelector(getErrorMessage);

  const hasError = useMemo(() => ((errorId !== undefined) || !!errorMessage), [
    errorId,
    errorMessage,
  ]);

  if (hasError) {
    return (
      <ErrorMessage
        errorId={errorId}
        message={errorMessage}
      />
    )
  }

  return children || null;
};

export default WithError;
