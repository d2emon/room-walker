import React, { ReactElement, useMemo } from 'react';
import { useSelector } from 'react-redux';
import {
  getErrorCode,
  getErrorMessage,
} from 'store/error/selectors';
import ErrorMessage from './ErrorMessage';

interface WithErrorProps {
  children?: ReactElement;
}

const WithError = (props: WithErrorProps) => {
  const {
    children,
  } = props;

  const errorId = useSelector(getErrorCode);
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
